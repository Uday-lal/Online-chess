const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const http = require("http");
require("dotenv").config();

require("./Models/db");
const initalizeBoard = require("./helpers/initializeBoard");

/* 
{
  boardState: [List],
  uuidBlack: String,
  uuidWhite: String,
  turn: ['black', 'white'],
  scoreWhite: [*List of captured peices by black],
  scoreBlack: [*List of captured peices by white],
}


Eventflow:
  MoveEvent -> Run Validation -> Update The State -> Broadcast the state

*/

const usersRouter = require("./router/users");
const roomRouter = require("./router/room");
const redisClient = require("./Middleware/redisClient");
const initializeSockets = require("./socket/index");

const port = 8000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  initializeSockets(server);

  expressApp.use(express.json());
  expressApp.use(cookieParser());
  // expressApp.use(authMiddleWare);

  expressApp.use(usersRouter);
  expressApp.use(roomRouter);

  expressApp.get("/play/:roomId", async (req, res) => {
    const { roomId } = req.params;
    const roomExist = await redisClient.sIsMember("rooms", roomId);
    if (roomId && roomExist) {
      return handle(req, res);
    }
    return res.status(404).send("Bhai!! room id invalid nhi hai");
  });

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
