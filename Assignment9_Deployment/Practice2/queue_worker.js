const Queue = require('bull');

const orderQueue = new Queue('orders', process.env.REDIS_URL);

orderQueue.process(async (job) => {
  const { userId, items } = job.data;
  return true;
});