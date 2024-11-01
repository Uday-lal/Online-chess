const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

require("dotenv").config();

require("./Models/db");

const usersRouter = require("./router/users");
const redisClient = require("./Middleware/redisClient");

const port = 8000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const usersObj = {};

function generateRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("findMatch", async (joiningMsg) => {
      // Its a junction where user awaits for there rooms to get perpare
      const activeRoom = await findRoomWithOneUser();
      const joiningMsgData = JSON.parse(joiningMsg);
      console.log(activeRoom);
      if (activeRoom) {
        socket.join(activeRoom);
        const prevJoinedUser = getSocketsInRoom(activeRoom);
        const prevJoinedUserID = prevJoinedUser[0];
        const prevJoinedUserData = usersObj[prevJoinedUserID];
        const tokenWhite = jwt.sign(
          {
            name: prevJoinedUserData.userName,
            side: "white",
          },
          process.env.JWT_KEY,
          { expiresIn: "2h" }
        );
        const tokenBlack = jwt.sign(
          {
            name: joiningMsgData.userName,
            side: "black",
          },
          process.env.JWT_KEY,
          { expiresIn: "2h" }
        );

        await redisClient.hSet(tokenWhite, {
          name: prevJoinedUserData.userName,
          opp: tokenBlack,
          roomId: activeRoom,
          side: "white",
        });

        await redisClient.hSet(tokenBlack, {
          name: joiningMsgData.userName,
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
              userName: prevJoinedUserData.userName,
              uuid: tokenWhite,
              side: "white",
            },
            {
              token: joiningMsgData.token,
              userName: joiningMsgData.userName,
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
          userName: joiningMsgData["userName"],
          matchStatus: "wait",
          uuid: null,
        });
        io.to(roomId).emit("findMatchStatus", message);
      }
    });

    function sendMatchConfirmation(socketId, message) {
      // ...
    }

    async function findRoomWithOneUser() {
      const rooms = io.sockets.adapter.rooms;

      for (let [roomName, room] of rooms) {
        const roomExist = await redisClient.sIsMember("rooms", roomName);
        if (room.size === 1 && roomExist) {
          return roomName;
        }
      }

      return null;
    }

    function getSocketsInRoom(roomName) {
      const room = io.sockets.adapter.rooms.get(roomName);
      if (room) {
        const sockets = [];
        room.forEach((socketId) => {
          const socket = io.sockets.sockets.get(socketId);
          if (socket) {
            sockets.push(socket.id);
          }
        });
        return sockets;
      } else {
        console.log(`Room ${roomName} does not exist or is empty`);
        return [];
      }
    }

    socket.on("message", (msg) => {
      console.log("Message from client:", msg);
      socket.emit("message", `Server received: ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      delete usersObj[socket.id];
    });
  });

  expressApp.use(express.json());
  expressApp.use(cookieParser());
  // expressApp.use(authMiddleWare);

  expressApp.use(usersRouter);

  expressApp.get("/play/:roomId", async (req, res) => {
    const { roomId } = req.params;
    const roomExist = await redisClient.sIsMember("rooms", roomId);
    if (roomId && roomExist) {
      return handle(req, res);
    }
    return res.status(404).send("Bhai!! room id invalid hai");
  });

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
