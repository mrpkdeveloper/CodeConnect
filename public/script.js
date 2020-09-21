const socket = io("/");
const videogrid = document.getElementById("videogrid");
const myvideo = document.createElement("video");
myvideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
});

let myvideostream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myvideostream = stream;
    addvideostream(myvideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addvideostream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userid) => {
      connectToNewUser(userid, stream);
    });
  });

const addvideostream = (video, stream) => {
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
    addvideostream(video, userVideoStream);
  });
};
