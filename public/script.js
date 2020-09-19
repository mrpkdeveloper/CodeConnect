const socket = io();
const videogrid = document.getElementById("video-grid");
const myvideo = document.createElement("video");
myvideo.muted = true;

// let myvideostream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    // myvideostream = stream;
    addvediostream(myvideo, stream);
  });

const addvediostream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videogrid.append(video);
};

socket.emit("join-room", roomid);
//.on send info from client to server
socket.on("user-connected", () => {
  connectToNewUser();
});

const connectToNewUser = () => {
  console.log("new user");
};
