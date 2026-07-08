const redis = require('redis');

// Create Redis Client
const client = redis.createClient();

// Connect Redis
client.connect();

// Events
client.on('connect', () => {
  console.log('Redis Connected');
});

client.on('error', (err) => {
  console.log('Redis Error', err);
});

// Export Client
module.exports = client;
