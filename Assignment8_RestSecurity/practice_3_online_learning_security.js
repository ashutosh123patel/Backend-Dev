const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const sanitizeHtml = require('sanitize-html');
const speakeasy = require('speakeasy');
const validator = require('validator');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/edulearn_security');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  mfaSecret: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  title: String,
  description: String,
  instructorId: String
}));

const Quiz = mongoose.model('Quiz', new mongoose.Schema({
  question: String,
  answer: String,
  submitted: Boolean
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://s3.amazonaws.com"],
      mediaSrc: ["'self'", "https://s3.amazonaws.com"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["https://js.stripe.com"]
    }
  }
}));

app.use(session({
  secret: 'secure-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/edulearn_security'
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

const quizLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

function sanitizeContent(content) {
  return sanitizeHtml(content, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'ul', 'li', 'a'],
    allowedAttributes: {
      a: ['href']
    }
  });
}

function auth(role) {
  return (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
    if (role && req.session.user.role !== role && req.session.user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('pdf') && !file.mimetype.includes('mp4')) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});

app.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });

  if (password.length < 8) return res.status(400).json({ message: "Weak password" });

  const hashed = await bcrypt.hash(password, 10);

  const secret = speakeasy.generateSecret().base32;

  const user = new User({ username, email, password: hashed, role, mfaSecret: secret });
  await user.save();

  res.json({ message: "Registered", mfaSecret: secret });
});

app.post('/login', loginLimiter, async (req, res) => {
  const { email, password, token } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  if (user.role === 'instructor') {
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token
    });
    if (!verified) return res.status(401).json({ message: "Invalid MFA" });
  }

  req.session.user = { id: user._id, role: user.role };

  res.json({ message: "Login successful" });
});

app.post('/courses', auth('instructor'), async (req, res) => {
  const { title, description } = req.body;

  const clean = sanitizeContent(description);

  const course = new Course({ title, description: clean, instructorId: req.session.user.id });
  await course.save();

  res.json({ message: "Course created" });
});

app.post('/quiz', auth('student'), quizLimiter, async (req, res) => {
  const { question, answer } = req.body;

  const quiz = new Quiz({ question, answer, submitted: true });
  await quiz.save();

  res.json({ message: "Submitted" });
});

app.post('/upload', auth(), upload.single('file'), (req, res) => {
  res.json({ message: "File uploaded" });
});

app.listen(3000);