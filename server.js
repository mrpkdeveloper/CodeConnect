const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peersever = ExpressPeerServer(server, {
  debug: true,
});
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/peerjs", peersever);

app.get("/", (req, res) => {
  // res.render("room");
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomid: req.params.room });
});

io.on("connection", (socket) => {
  //this below roomid server will receive from the client
  socket.on("join-room", (roomid, userid) => {
    socket.join(roomid);
    //msg send to those client who have same roomid that new user is connected
    socket.to(roomid).broadcast.emit("user-connected", userid);
  });
});

server.listen(port, () => console.log(`http://localhost:${port}`));
