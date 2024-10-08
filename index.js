const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");

require("dotenv").config();

require("./Models/db");

const usersRouter = require("./router/users");

const port = 8000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const usersObj = {};
const activeRooms = [];

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

    socket.on("findMatch", (joiningMsg) => {
      // Its a junction where user awaits for there rooms to get perpare
      const leftedRoom = findRoomWithOneUser();
      const joiningMsgData = JSON.parse(joiningMsg);
      console.log(leftedRoom);
      if (leftedRoom) {
        socket.join(leftedRoom);
        const prevJoinedUser = getSocketsInRoom(leftedRoom);
        const prevJoinedUserID = prevJoinedUser[0];
        const prevJoinedUserData = usersObj[prevJoinedUserID];
        const message = JSON.stringify({
          matchStatus: "startMatch",
          players: [
            {
              token: prevJoinedUserData.token,
              userName: prevJoinedUserData.userName,
              side: "white",
            },
            {
              token: joiningMsgData.token,
              userName: joiningMsgData.userName,
              side: "black",
            },
          ],
        });
        io.to(leftedRoom).emit("findMatchStatus", message);
      } else {
        usersObj[socket.id] = joiningMsgData;
        const roomId = generateRandomString(10);
        activeRooms.push(roomId);
        socket.join(roomId);
        const message = JSON.stringify({
          token: joiningMsgData["token"],
          userName: joiningMsgData["userName"],
          matchStatus: "wait",
        });
        io.to(roomId).emit("findMatchStatus", message);
      }
    });

    function sendMatchConfirmation(socketId, message) {
      // ...
    }

    function findRoomWithOneUser() {
      const rooms = io.sockets.adapter.rooms;

      for (let [roomName, room] of rooms) {
        if (room.size === 1 && activeRooms.includes(roomName)) {
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
    });
  });

  expressApp.use(express.json());
  expressApp.use(cookieParser());
  // expressApp.use(authMiddleWare);

  expressApp.use(usersRouter);

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
