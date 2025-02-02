/*
Broadcasting and validating moves by the players
*/
const { getSocketsInRoom } = require("./helpers");
const redisClient = require("../Middleware/redisClient");

function matchUUID(uuid, side, gameState) {
  let targetUUID;
  if (side === "black") {
    targetUUID = gameState.uuidBlack;
  } else {
    targetUUID = gameState.uuidWhite;
  }

  return uuid === targetUUID;
}

module.exports = async (socket, io) => {
  socket.on("move", async (msg) => {
    const messageJson = JSON.parse(msg);
    const roomId = messageJson.roomId;
    const uuid = messageJson.uuid;
    const peice = messageJson.peice;
    const posx = messageJson.posx;
    const posy = messageJson.posy;

    const gameState = JSON.parse(await redisClient.get(roomId));
    const userData = JSON.parse(await redisClient.get(uuid));

    if (gameState && userData) {
      const userSide = userData.side;

      // Matching UUID
      const matchResult = matchUUID(uuid, userSide, gameState);
      if (!matchResult) {
        console.error("UUID not match");
        return null;
      }
      
    } else {
      console.error("Unauthorized request");
      return null;
    }
  });
};
