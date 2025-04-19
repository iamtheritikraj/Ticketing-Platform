const redis = require('redis');
// Create Redis client
const redisClient = redis.createClient({
    url: 'redis://localhost:6379',
  });
  
  // Connect to Redis server
  redisClient.connect();

module.exports = redisClient;