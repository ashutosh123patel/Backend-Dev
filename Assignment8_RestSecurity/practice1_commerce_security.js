const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/security_demo');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  role: String
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number
}));

const Review = mongoose.model('Review', new mongoose.Schema({
  productId: String,
  content: String
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://cdn.example.com"],
      scriptSrc: ["'self'", "https://www.youtube.com"],
      frameSrc: ["https://www.youtube.com"],
      objectSrc: ["'none'"]
    }
  }
}));

app.use(session({
  secret: 'secure-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/security_demo'
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30
  }
}));

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5
});

app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: String(username) });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  req.session.user = { id: user._id, role: user.role };

  res.json({ message: "Login successful" });
});

app.get('/products', async (req, res) => {
  const search = String(req.query.search || '');
  const safeSearch = search.replace(/[$.]/g, '');

  const products = await Product.find({
    name: { $regex: safeSearch, $options: 'i' },
    price: { $gte: 0 }
  });

  res.json(products);
});

app.post('/reviews', async (req, res) => {
  const { productId, content } = req.body;

  const sanitized = String(content)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const review = new Review({ productId, content: sanitized });

  await review.save();

  res.json({ message: "Review added" });
});

app.listen(3000);