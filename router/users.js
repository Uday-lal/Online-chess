const express = require("express");
const Users = require("../Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/api/users/create", async function (req, res) {
  const obj = req.body;
  const hashedPassword = bcrypt.hashSync(obj.password, 10);
  const users = new Users(obj);
  users.password = hashedPassword;
  try {
    const user = await users.save();
    const payload = {
      sub: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (err) {
    return res.status(409).json({ message: err.message, success: false });
  }
});

router.post("/api/users/login", async function (req, res) {
  const obj = req.body;
  const email = obj.email;
  const password = obj.password;
  const users = Users;
  const userData = await users.findOne({ email: email });

  if (userData) {
    bcrypt.compare(password, userData.password, function (err, same) {
      if (err)
        return res.status(500).json({ message: err.message, success: false });
      if (same) {
        const date = new Date();
        const payload = {
          sub: userData.id,
          name: userData.name,
        };
        const token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "2h",
        });
        return res.status(200).json({
          message: "User login successfully",
          success: true,
          token: token,
        });
      }
      return res
        .status(401)
        .json({ message: "password is incorrect", success: false });
    });
  } else {
    return res.status(404).json({ message: "User not found", success: false });
  }
});

router.get("/api/user", async (req, res) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({
      success: true,
      message: "Token is valid",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
  return res.status(401).json({
    message: "Token not found",
    success: false,
  });
});

module.exports = router;
