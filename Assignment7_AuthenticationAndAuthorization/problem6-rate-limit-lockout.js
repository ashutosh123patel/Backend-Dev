const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const users = [
  { email: 'john@example.com', password: bcrypt.hashSync('SecurePass123!', 10) }
];

const loginAttempts = new Map();

function checkLoginAttempts(email) {
  const record = loginAttempts.get(email);

  if (!record) return null;

  if (record.lockUntil && Date.now() < record.lockUntil) {
    return { locked: true, remainingTime: record.lockUntil - Date.now() };
  }

  if (record.firstAttempt && Date.now() - record.firstAttempt > 60 * 60 * 1000) {
    loginAttempts.delete(email);
    return null;
  }

  return record;
}

function recordFailedAttempt(email) {
  let record = loginAttempts.get(email);

  if (!record) {
    record = { count: 0, firstAttempt: Date.now(), lockUntil: null };
  }

  record.count += 1;

  if (record.count >= 5) {
    record.lockUntil = Date.now() + 30 * 60 * 1000;
  }

  loginAttempts.set(email, record);
}

function clearAttempts(email) {
  loginAttempts.delete(email);
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const attempt = checkLoginAttempts(email);

  if (attempt && attempt.locked) {
    return res.status(423).json({ message: "Account locked. Try later." });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    recordFailedAttempt(email);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    recordFailedAttempt(email);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  clearAttempts(email);

  res.json({ message: "Login successful" });
});

app.listen(3000);