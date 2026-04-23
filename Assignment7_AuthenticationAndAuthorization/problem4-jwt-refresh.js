const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';

const users = [
  { id: 1, username: 'john', password: 'pass123' }
];

const refreshTokens = new Set();

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, ACCESS_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  const token = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
  refreshTokens.add(token);
  return token;
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken });
});

app.post('/token/refresh', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  if (!refreshTokens.has(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
});

app.post('/logout', (req, res) => {
  const { token } = req.body;

  if (token) {
    refreshTokens.delete(token);
  }

  res.json({ message: "Logged out" });
});

app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    res.json({ message: "Protected data", user });
  });
});

app.listen(3000);