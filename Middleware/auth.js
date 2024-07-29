const jwt = require("jsonwebtoken");
const Users = require("../Models/users.model");

async function authMiddleWare(req, res, next) {
  const path = req.originalUrl;
  console.log(path);
  if (!path.includes("login") && !path.includes("create_account")) {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
          return next();
        }
        const userId = decoded.sub;
        const users = Users;
        const userData = await users.findOne({ _id: userId });
        if (userData) {
          req.user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
          };
        }
        return next();
      });
    } else {
      return res.redirect("/login");
    }
  } else {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
          return next();
        }
        const userId = decoded.sub;
        const users = Users;
        const userData = await users.findOne({ _id: userId });
        if (userData) {
          return res.redirect("/play");
        }
        return next();
      });
    } else {
      return next();
    }
  }
}

module.exports = authMiddleWare;
