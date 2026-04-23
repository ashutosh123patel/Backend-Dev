const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const multer = require('multer');
const crypto = require('crypto');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/medibook_security');

const Patient = mongoose.model('Patient', new mongoose.Schema({
  name: String,
  dob: String,
  email: String,
  phone: String,
  medicalHistory: String
}));

const Record = mongoose.model('Record', new mongoose.Schema({
  patientId: String,
  data: String
}));

const Audit = mongoose.model('Audit', new mongoose.Schema({
  userId: String,
  action: String,
  timestamp: Date
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"]
    }
  }
}));

app.use(session({
  secret: 'health-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/medibook_security'
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 15
  }
}));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10
});

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from('12345678901234567890123456789012'), Buffer.from('1234567890123456'));
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from('12345678901234567890123456789012'), Buffer.from('1234567890123456'));
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}

function sanitize(input) {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
}

function validatePatient(data) {
  if (!validator.isEmail(data.email)) return false;
  if (!validator.isMobilePhone(data.phone + '', 'any')) return false;
  if (!validator.isDate(data.dob)) return false;
  return true;
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

function logAction(userId, action) {
  new Audit({ userId, action, timestamp: new Date() }).save();
}

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});

app.post('/register', async (req, res) => {
  const data = req.body;

  if (!validatePatient(data)) return res.status(400).json({ message: "Invalid input" });

  data.medicalHistory = sanitize(data.medicalHistory);

  const patient = new Patient(data);
  await patient.save();

  res.json({ message: "Registered" });
});

app.post('/records', auth('doctor'), async (req, res) => {
  const { patientId, data } = req.body;

  const encrypted = encrypt(data);

  const record = new Record({ patientId, data: encrypted });
  await record.save();

  logAction(req.session.user.id, 'create_record');

  res.json({ message: "Record saved" });
});

app.get('/records/:id', auth(), async (req, res) => {
  const record = await Record.findOne({ patientId: String(req.params.id) });

  if (!record) return res.status(404).json({ message: "Not found" });

  logAction(req.session.user.id, 'view_record');

  res.json({ data: decrypt(record.data) });
});

app.get('/search', limiter, async (req, res) => {
  const q = String(req.query.q || '').replace(/[$.]/g, '');

  const patients = await Patient.find({
    name: { $regex: q, $options: 'i' }
  });

  res.json(patients);
});

app.post('/upload', auth(), upload.single('file'), (req, res) => {
  logAction(req.session.user.id, 'upload_file');
  res.json({ message: "Uploaded" });
});

app.listen(3000);