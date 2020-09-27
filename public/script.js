const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myPeer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443", //443 for production
});
let myVideoStream;
const myVideodiv = document.createElement("div");
myVideodiv.id = "myvideodiv";
const myVideo = document.createElement("video");
myVideo.id = "myvideo";
myVideo.muted = true;
const peers = {};
//receiving open when successfully connected to peer server
myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

//taking camera and audio permisions
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideodiv, myVideo, stream);

    //on receiving call answer it
    myPeer.on("call", (call) => {
      call.answer(stream);
      const videodiv = document.createElement("div");
      const video = document.createElement("video");

      call.on("stream", (userVideoStream) => {
        addVideoStream(videodiv, video, userVideoStream);
      });
    });

    //receiving
    socket.on("user-connected", (userId) => {
      console.log("user connected.,..........");
      //set timeout so that it can get stream otherwise it will request without actually having stream
      setTimeout(function () {
        connectToNewUser(userId, stream);
      }, 4000);
    });

    // // input value
    // let text = $("input");
    // // when press enter send message
    // $("html").keydown(function (e) {
    //   if (e.which == 13 && text.val().length !== 0) {
    //     socket.emit("message", text.val());
    //     text.val("");
    //   }
    // });
    // socket.on("createMessage", (message) => {
    //   $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
    //   scrollToBottom();
    // });
  });

//receiving
socket.on("user-disconnected", (userId) => {
  if (peers[userId]) peers[userId].close();
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const videodiv = document.createElement("div");
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(videodiv, video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(videodiv, video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(videodiv);
  videodiv.append(video);
}

// const scrollToBottom = () => {
//   var d = $(".main__chat_window");
//   d.scrollTop(d.prop("scrollHeight"));
// };

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
};

const playStop = () => {
  console.log("object");
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo();
  } else {
    setStopVideo();
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
};

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `;
  let div = document.querySelector("#muteText");
  div.remove();
  document.querySelector(".main__mute_button").innerHTML = html;
};

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `;
  let div = document.createElement("div");
  div.setAttribute("class", "mutetext");
  div.id = "muteText";
  div.innerHTML = "Muted";
  document.querySelector("#myvideodiv").appendChild(div);
  document.querySelector("#muteText").style.color = "black";

  document.querySelector(".main__mute_button").innerHTML = html;
};

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `;
  document.querySelector(".main__video_button").innerHTML = html;
};

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `;
  document.querySelector(".main__video_button").innerHTML = html;
};
