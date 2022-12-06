var redis = require("redis");

const createRedisInstance = () => {
  let client = redis.createClient({
    url: "redis://redis-......:166..",
    password: ".......",
  });
  client.connect();
  return client;
};

module.exports = { createRedisInstance };
