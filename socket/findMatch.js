const redisClient = require("../Middleware/redisClient");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const initalizeBoard = require("../chessFunc/initializeBoard");
const { getSocketsInRoom } = require("./helpers");

async function findRoomWithOneUser(io) {
  const rooms = io.sockets.adapter.rooms;

  for (let [roomName, room] of rooms) {
    const roomExist = await redisClient.sIsMember("rooms", roomName);
    if (room.size === 1 && roomExist) {
      return roomName;
    }
  }

  return null;
}

function generateRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

const usersObj = {};

module.exports = (socket, io) => {
  socket.on("findMatch", async (joiningMsg) => {
    const activeRoom = await findRoomWithOneUser(io);
    const joiningMsgData = JSON.parse(joiningMsg);
    if (activeRoom) {
      socket.join(activeRoom);
      const prevJoinedUser = getSocketsInRoom(activeRoom, io);
      const prevJoinedUserID = prevJoinedUser[0];
      const prevJoinedUserData = usersObj[prevJoinedUserID];
      const tokenWhite = generateRandomString(40);
      const tokenBlack = generateRandomString(40);
      const initalBoard = initalizeBoard();
      const gameState = {
        board: initalBoard,
        uuidWhite: tokenWhite,
        uuidBlack: tokenBlack,
        turn: "white",
        scoreWhite: [],
        scoreBlack: [],
      };

      await redisClient.hSet(activeRoom, gameState);

      await redisClient.hSet(tokenWhite, {
        name: prevJoinedUserData.name,
        opp: tokenBlack,
        roomId: activeRoom,
        side: "white",
      });

      await redisClient.hSet(tokenBlack, {
        name: joiningMsgData.name,
        opp: tokenWhite,
        roomId: activeRoom,
        side: "black",
      });

      await redisClient.expire(tokenWhite, 7200);
      await redisClient.expire(tokenBlack, 7200);

      const message = JSON.stringify({
        matchStatus: "startMatch",
        roomId: activeRoom,
        players: [
          {
            token: prevJoinedUserData.token,
            name: prevJoinedUserData.name,
            uuid: tokenWhite,
            side: "white",
          },
          {
            token: joiningMsgData.token,
            name: joiningMsgData.name,
            uuid: tokenBlack,
            side: "black",
          },
        ],
      });
      io.to(activeRoom).emit("findMatchStatus", message);
    } else {
      usersObj[socket.id] = joiningMsgData;
      const roomId = generateRandomString(10);
      // activeRooms.push(roomId);
      await redisClient.sAdd("rooms", roomId);
      await redisClient.expire("rooms", 7200);
      socket.join(roomId);
      const message = JSON.stringify({
        token: joiningMsgData["token"],
        name: joiningMsgData["name"],
        matchStatus: "wait",
        uuid: null,
      });
      io.to(roomId).emit("findMatchStatus", message);
    }
  });

  // join match
  socket.on("joinRoom", async (msg) => {
    const { token } = JSON.parse(msg);
    let tokenDecode;
    try {
      tokenDecode = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      console.error(`Error - Invalid Token = ${token}`);
      return 1;
    }
    const roomId = tokenDecode.roomId;
    const room = io.sockets.adapter.rooms.get(roomId);

    if (room && room.has(socket.id)) {
      console.log("User AlreadyJoined");
    } else {
      socket.join(roomId);
    }

    let message = JSON.stringify({
      allOnline: false,
      startMatch: false,
    });
    let roomUsers = getSocketsInRoom(roomId, io);

    if (roomUsers.length == 2) {
      message = JSON.stringify({
        allOnline: true,
        startMatch: true,
      });
    }
    console.log(roomUsers);
    console.log(`Players In Room ${roomId} -> ${roomUsers.length}`);
    console.log(`Message -> ${message}`);
    io.to(roomId).emit("matchStatus", message);
  });
};
