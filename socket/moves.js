/*
Broadcasting and validating moves by the players
*/
const { getSocketsInRoom } = require("./helpers");
const redisClient = require("../Middleware/redisClient");
const 


function matchUUID(uuid, side, gameState) {
  let targetUUID;
  if (side === "black") {
    targetUUID = gameState.uuidBlack;
  } else {
    targetUUID = gameState.uuidWhite;
  }

  return uuid === targetUUID;
}

function getOppUUID(side, gameState) {
  let targetUUID;
  if (side === "black") {
    targetUUID = gameState.uuidWhite;
  } else {
    targetUUID = gameState.uuidBlack;
  }
  return targetUUID;
}

module.exports = async (socket, io) => {
  socket.on("move", async (msg) => {
    const messageJson = JSON.parse(msg);
    const roomId = messageJson.roomId;
    const uuid = messageJson.uuid;
    const peice = messageJson.peice;
    const posx = messageJson.posx;
    const posy = messageJson.posy;
    const currX = messageJson.currX;
    const currY = messageJson.currY;

    const gameState = JSON.parse(await redisClient.get(roomId));
    const userData = JSON.parse(await redisClient.get(uuid));

    if (gameState && userData) {
      const userSide = userData.side;

      // Matching UUID
      const matchResult = matchUUID(uuid, userSide, gameState);
      if (!matchResult) {
        console.error("UUID not match");
        return 1;
      }

      const oppUUID = getOppUUID(userData.side, gameState);
      const oppUserData = JSON.parse(await redisClient.get(oppUUID));
      const socketId = oppUserData.socketId;
      // const room = io.sockets.adapter.rooms.get(roomId);
      console.log(io.sockets.adapter.rooms);

      console.log(socketId);
      console.log(roomId);

      io.to(socketId).emit(
        "oppMove",
        JSON.stringify({ message: "a move is done" })
      );
    } else {
      console.error("Unauthorized request");
      return 1;
    }
  });
};
