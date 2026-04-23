const axios = require('axios');

const URL = 'http://localhost:3000/product/1';

async function testLoad() {
  const requests = [];

  for (let i = 0; i < 1000; i++) {
    requests.push(axios.get(URL));
  }

  await Promise.all(requests);
}

testLoad();