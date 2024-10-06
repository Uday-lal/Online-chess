const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

require("./Models/db");

const usersRouter = require("./router/users");

const port = 8000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const roomsObj = {};

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("find_match", (message) => {
      // Its a junction where user awaits for there rooms to get perpare
      const messageJson = JSON.parse(message);
      const playerName = messageJson.name;
      const socketId = socket.id;
    });

    function sendMatchConfirmation(socketId, message) {
      // ...
    }

    function findRoomWithOneUser() {
      const rooms = io.sockets.adapter.rooms;

      // Iterate through each room
      for (let [roomName, room] of rooms) {
        // Check if the room has exactly one socket (one user)
        if (room.size === 1) {
          return roomName; // Return the room name if only one user is connected
        }
      }

      return null; // Return null if no such room is found
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

  expressApp.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
