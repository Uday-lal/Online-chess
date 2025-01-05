const { Server } = require("socket.io");

function initializeSockets(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    require("./findMatch")(socket, io);

    socket.on("disconnect", () => {
      console.log("user disconnected");
      delete usersObj[socket.id];
    });
  });
}

module.exports = initializeSockets;
