function getSocketsInRoom(roomName, io) {
  const room = io.sockets.adapter.rooms.get(roomName);
  // console.log(io.sockets.adapter.rooms);
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

module.exports = {
  getSocketsInRoom,
};
