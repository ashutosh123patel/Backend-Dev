const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const Queue = require('bull');

const app = express();

app.use(express.json());

const redis = new Redis(process.env.REDIS_URL);
const orderQueue = new Queue('orders', process.env.REDIS_URL);

mongoose.connect(process.env.DB_URI, {
  maxPoolSize: 100
});

let requestCount = 0;

app.use((req, res, next) => {
  requestCount++;
  next();
});

app.get('/product/:id', async (req, res) => {
  const key = `product:${req.params.id}`;

  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));

  const product = { id: req.params.id, name: "Product", price: 100 };

  await redis.set(key, JSON.stringify(product), 'EX', 60);

  res.json(product);
});

app.post('/checkout', async (req, res) => {
  const { userId, items } = req.body;

  const paymentGatewayUp = Math.random() > 0.2;

  if (!paymentGatewayUp) {
    await orderQueue.add({ userId, items });
    return res.json({ message: "Queued for processing" });
  }

  res.json({ message: "Order processed" });
});

app.get('/metrics', (req, res) => {
  res.json({ requests: requestCount });
});

app.listen(process.env.PORT || 3000);