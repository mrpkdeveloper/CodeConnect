const socket = io("/");
const videoGrid = document.getElementById("video-grid");
// const myPeer = new Peer(undefined, {
//   path: "/peerjs",
//   host: "/",
//   port: "3030", //443 for production
// });

// if(!ice){
//   ice = new $xirsys.ice('/webrtc');
//   ice.on(ice.onICEList, function (evt){
//       console.log('onICE ',evt);
//       if(evt.type == ice.onICEList){
//           create(ice.iceServers);
//       }
//   });
// }

const myPeer = new Peer(
  { key: "lwjd5qra8257b9", debug: 3, config: ice.iceServers }
  // {
  //   path: "/peerjs",
  //   host: "/",
  //   port: "443", //443 for production
  // }
);

const myroomid = ROOM_ID;
let myVideoStream;
const myVideodiv = document.createElement("div");
const myVideo = document.createElement("video");
myVideo.id = "myvideo";
myVideo.muted = true;
const peers = {};
var myid = 0;
let editor = document.querySelector("#textarea");

//receiving open when successfully connected to peer server
myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
  console.log("my id is : " + id);
  myVideodiv.id = `videodiv-${id}`;
  myid = id;
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

    //if i receive a call  i have to answer it
    myPeer.on("call", (call) => {
      call.answer(stream);
      // console.log(call.peer);

      //when i get the other user stream i will add that stream to my window
      const videodiv = document.createElement("div");
      videodiv.id = `videodiv-${call.peer}`;
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(videodiv, video, userVideoStream);
      });
    });

    //receiving
    socket.on("user-connected", (userId) => {
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
    editor.addEventListener("keyup", (evt) => {
      const text = editor.value;
      socket.send(text);
    });
    socket.on("message", (data) => {
      editor.value = data;
    });
  });

//receiving
socket.on("user-disconnected", (userId) => {
  if (peers[userId]) peers[userId].close();
});

function connectToNewUser(userId, stream) {
  console.log(`connected to user id : ${userId}`);

  //now i will call the userid and send my stream to him
  const call = myPeer.call(userId, stream);

  //when i get the other user stream i will add that stream to my window
  const videodiv = document.createElement("div");
  videodiv.id = `videodiv-${userId}`;
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
  myVideodiv.appendChild(div);
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
