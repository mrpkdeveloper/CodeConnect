const socket = io();
const videogrid = document.getElementById("video-grid");
const myvideo = document.createElement("video");
myvideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3000",
});

// let myvideostream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    // myvideostream = stream;
    addvediostream(myvideo, stream);

    socket.on("user-connected", (userid) => {
      connectToNewUser(userid, stream);
    });
  });

const addvediostream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videogrid.append(video);
};

//on-recieve

peer.on("open", (id) => {
  //emit-send
  socket.emit("join-room", roomid, id);
});

const connectToNewUser = (userid, stream) => {
  console.log("new user " + userid);
  const call = peer.call(userid, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addvediostream(video, userVideoStream);
  });
};
