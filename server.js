const { Socket } = require("dgram");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.render("room");
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomid: req.params.room });
});

//io.on => send info from server to client
io.on("connection", (socket) => {
  socket.on("join-room", (roomid) => {
    socket.join(roomid);
    socket.to(roomid).broadcast.emit("user-connected");
    // console.log("join the room");
  });
});

server.listen(3000, () => console.log("http://localhost:3000"));
