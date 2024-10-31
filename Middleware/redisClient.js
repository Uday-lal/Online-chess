const redis = require("redis");
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

function log(type) {
  return function () {
    console.log(type);
  };
}

async function redisConnect() {
  await client.connect();
}

client.on("connect", log("connect"));

redisConnect();

module.exports = client;
