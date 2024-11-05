const express = require("express");
const redisClient = require("../Middleware/redisClient");

const router = express.Router();

router.get("/v1/room/info", async (req, res) => {
  const roomId = req.query.roomId;
  const uuid = req.query.uuid;

  const roomExist = await redisClient.sIsMember("rooms", roomId);
  const joinRoom = await redisClient.hGet(uuid, "roomId");

  if (!roomExist && joinRoom != roomId)
    return res.status(404).json({ message: "Invalid room" });

  const yourName = await redisClient.hGet(uuid, "name");
  const yourSide = await redisClient.hGet(uuid, "side");

  const opp = await redisClient.hGet(uuid, "opp");
  const oppName = await redisClient.hGet(opp, "name");
  const oppSide = await redisClient.hGet(opp, "side");

  return res.status(200).json({
    name: yourName,
    side: yourSide,

    opp: {
      name: oppName,
      side: oppSide,
    },
  });
});

module.exports = router;
