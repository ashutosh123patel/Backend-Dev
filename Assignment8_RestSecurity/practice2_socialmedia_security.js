const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/social_security');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  bio: String,
  profileUrl: String
}));

const Post = mongoose.model('Post', new mongoose.Schema({
  content: String,
  userId: String
}));

const Message = mongoose.model('Message', new mongoose.Schema({
  from: String,
  to: String,
  content: String
}));

app.use(helmet());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true
}));

app.use(session({
  secret: 'social-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/social_security'
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30
  }
}));

function sanitizeInput(data) {
  const clean = {};
  for (let key in data) {
    if (typeof data[key] === 'string') {
      clean[key] = validator.escape(data[key]);
    } else {
      clean[key] = data[key];
    }
  }
  return clean;
}

function sanitizePostContent(content) {
  return sanitizeHtml(content, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href']
    }
  });
}

const validateRequest = (req, res, next) => {
  req.body = sanitizeInput(req.body);
  next();
};

app.use(validateRequest);

app.post('/register', async (req, res) => {
  const { username, email, bio, profileUrl } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (profileUrl && !validator.isURL(profileUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  const user = new User({ username, email, bio, profileUrl });
  await user.save();

  res.json({ message: "User registered" });
});

app.post('/posts', async (req, res) => {
  const { content, userId } = req.body;

  const cleanContent = sanitizePostContent(content);

  const post = new Post({ content: cleanContent, userId });
  await post.save();

  res.json({ message: "Post created" });
});

app.post('/messages', async (req, res) => {
  const { from, to, content } = req.body;

  const cleanContent = validator.escape(content);

  const message = new Message({ from, to, content: cleanContent });
  await message.save();

  res.json({ message: "Message sent" });
});

app.post('/comments', async (req, res) => {
  const { content } = req.body;

  const clean = validator.escape(content);

  res.json({ message: "Comment added", content: clean });
});

app.listen(3000);