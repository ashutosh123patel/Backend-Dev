const express = require('express');
const mongoose = require('mongoose');

const app = express();

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI);

let requestCount = 0;

app.use((req, res, next) => {
  requestCount++;
  next();
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: ENV,
    timestamp: new Date()
  });
});

app.get('/metrics', (req, res) => {
  res.json({
    totalRequests: requestCount
  });
});

app.listen(PORT);