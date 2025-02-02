const express = require("express");
const redisClient = require("../Middleware/redisClient");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/v1/room/info", async (req, res) => {
  const roomId = req.query.roomId;
  const uuid = req.query.uuid;

  if (roomId && uuid) {
    const roomExist = await redisClient.sIsMember("rooms", roomId);
    const userData = JSON.parse(await redisClient.get(uuid));
    // const joinRoom = await redisClient.hGet(uuid, "roomId");
    const joinRoom = userData.roomId;

    if (!roomExist && joinRoom != roomId)
      return res.status(404).json({ message: "Invalid room" });

    // const yourName = await redisClient.hGet(uuid, "name");
    const userName = userData.name;
    // const yourSide = await redisClient.hGet(uuid, "side");
    const userSide = userData.side;

    // const opp = await redisClient.hGet(uuid, "opp");
    const opp = userData.opp;
    const oppData = JSON.parse(await redisClient.get(opp));

    // const oppName = await redisClient.hGet(opp, "name");
    const oppName = oppData.name;
    // const oppSide = await redisClient.hGet(opp, "side");
    const oppSide = oppData.side;
    const tokenPayload = {
      uuid: uuid,
      name: userName,
      side: userSide,
      roomId: roomId,
    };
    const joinRoomToken = jwt.sign(tokenPayload, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    return res.status(200).json({
      name: userName,
      side: userSide,
      joinToken: joinRoomToken,
      opp: {
        name: oppName,
        side: oppSide,
      },
    });
  }
  return res.status(404).json({ message: "Invalid room" });
});

module.exports = router;
