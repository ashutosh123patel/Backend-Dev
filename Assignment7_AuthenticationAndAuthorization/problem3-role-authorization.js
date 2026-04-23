const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());

app.use(session({
  secret: 'auth-secret',
  resave: false,
  saveUninitialized: false
}));

const users = [
  { id: 1, username: 'user1', role: 'user' },
  { id: 2, username: 'mod1', role: 'moderator' },
  { id: 3, username: 'admin1', role: 'admin' }
];

const posts = [];

const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    const userRole = req.session.user.role;
    if (userRole === 'admin') return next();
    if (role === 'moderator' && userRole === 'moderator') return next();
    if (role === 'user' && userRole === 'user') return next();
    return res.status(403).json({ message: "Forbidden" });
  };
};

const isOwnerOrModerator = (req, res, next) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const user = req.session.user;

  if (post.userId === user.id || user.role === 'moderator' || user.role === 'admin') {
    req.post = post;
    return next();
  }

  return res.status(403).json({ message: "Forbidden" });
};

app.post('/login', (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  req.session.user = user;
  res.json({ message: "Logged in", user });
});

app.post('/posts', isAuthenticated, (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content required" });
  }

  const newPost = {
    id: posts.length + 1,
    content,
    userId: req.session.user.id
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content required" });
  }

  req.post.content = content;

  res.json({ message: "Post updated", post: req.post });
});

app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === postId);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(index, 1);

  res.json({ message: "Post deleted" });
});

app.listen(3000);