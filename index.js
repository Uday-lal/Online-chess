const express = require("express");
const next = require("next");

const port = 3050;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.post("/api/login", (req, res) => {
    return res.json({ user: "Uday lal" });
  });
  server.post("/api/create_account", (req, res) => {
    const { username, email, password } = req.body;
    return res.json({ user: "Uday lal" });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
