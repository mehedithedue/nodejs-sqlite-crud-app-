const { createRedisInstance } = require("../utility/redis");

GameServices = {};

GameServices.handleUpdateScore = async (username, result) => {
  if (result == "incorrect") return;

  const client = createRedisInstance();

  existingLeaders = await client.lRange("leaders", 0, -1);

  await client.rPush("leaders", username);
};

GameServices.handleGetLeaderBoard = async () => {
  const client = createRedisInstance();

  let leaders = [];

  let exists = await client.exists("leaders");

  if (exists !== 0) {
    leaders = await client.lRange("leaders", 0, -1);
  }

  return leaders.reverse().slice(0, 10);
};

module.exports = GameServices;
