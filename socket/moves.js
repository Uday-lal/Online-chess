/*
Broadcasting and validating moves by the players
*/
const { getSocketsInRoom } = require("./helpers");
const redisClient = require("../Middleware/redisClient");

module.exports = async (socket, io) => {
  socket.on("move", async (msg) => {
    const messageJson = JSON.parse(msg);
    const roomId = messageJson.roomId;
    const uuid = messageJson.uuid;
    const peice = messageJson.peice;
    const posx = messageJson.posx;
    const posy = messageJson.posy;

    const gameState = await redisClient.hGet(roomId);

    if (gameState) {
      // TODO: Run Validation and boardcast the message
    } else {
      console.error("Unauthorized request");
    }
  });
};
