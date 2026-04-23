const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const speakeasy = require('speakeasy');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/quickbank_security');

const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  balance: Number,
  failedAttempts: Number,
  lockUntil: Date,
  resetToken: String,
  resetExpires: Date,
  mfaSecret: String
}));

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  userId: String,
  amount: Number,
  toAccount: String,
  description: String,
  timestamp: Date
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"]
    }
  }
}));

app.use(session({
  secret: 'bank-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/quickbank_security'
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 10
  }
}));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

const transferLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3
});

function sanitize(input) {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
}

function safeQuery(input) {
  return String(input).replace(/[$.]/g, '');
}

function auth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });

  if (password.length < 8) return res.status(400).json({ message: "Weak password" });

  const hashed = await bcrypt.hash(password, 10);

  const secret = speakeasy.generateSecret().base32;

  const user = new User({
    email,
    password: hashed,
    balance: 1000,
    failedAttempts: 0,
    mfaSecret: secret
  });

  await user.save();

  res.json({ message: "Registered", mfaSecret: secret });
});

app.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  if (user.lockUntil && Date.now() < user.lockUntil) {
    return res.status(423).json({ message: "Account locked" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    user.failedAttempts += 1;
    if (user.failedAttempts >= 5) {
      user.lockUntil = Date.now() + 30 * 60 * 1000;
    }
    await user.save();
    return res.status(401).json({ message: "Invalid credentials" });
  }

  user.failedAttempts = 0;
  user.lockUntil = null;
  await user.save();

  req.session.user = { id: user._id };

  res.json({ message: "Login successful" });
});

app.post('/transfer', auth, transferLimiter, async (req, res) => {
  const { amount, toAccount, description, token } = req.body;

  const user = await User.findById(req.session.user.id);

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const cleanAccount = safeQuery(toAccount);
  const cleanDesc = sanitize(description);

  if (amount <= 0 || amount > user.balance) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (amount > 1000) {
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token
    });
    if (!verified) return res.status(401).json({ message: "MFA required" });
  }

  user.balance -= amount;
  await user.save();

  const tx = new Transaction({
    userId: user._id,
    amount,
    toAccount: cleanAccount,
    description: cleanDesc,
    timestamp: new Date()
  });

  await tx.save();

  res.json({ message: "Transfer successful" });
});

app.get('/transactions', auth, async (req, res) => {
  const txs = await Transaction.find({ userId: req.session.user.id });
  res.json(txs);
});

app.post('/reset-request', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "If account exists, reset sent" });

  const token = crypto.randomBytes(32).toString('hex');

  user.resetToken = token;
  user.resetExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  res.json({ message: "Reset token generated" });
});

app.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = null;
  user.resetExpires = null;

  await user.save();

  res.json({ message: "Password updated" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000);