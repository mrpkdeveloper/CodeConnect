const API_KEY = "9acdf58bb3msh9fcea96d8a284b7p185cdbjsna8179ddcc1aa";
const CONFIG = {
  iceServers: [
    { urls: ["stun:bn-turn1.xirsys.com"] },
    {
      username:
        "OqZByxJ5ZrKFXYdws9gizGoLdQyhYg5kQh4mMTFKi2TVFY-5kFogetZAu6Ho1369AAAAAGGT_OltcnBrZGV2ZWxvcGVy",
      credential: "be98eaf8-470d-11ec-ac21-0242ac140004",
      urls: [
        "turn:bn-turn1.xirsys.com:80?transport=udp",
        "turn:bn-turn1.xirsys.com:3478?transport=udp",
        "turn:bn-turn1.xirsys.com:80?transport=tcp",
        "turn:bn-turn1.xirsys.com:3478?transport=tcp",
        "turns:bn-turn1.xirsys.com:443?transport=tcp",
        "turns:bn-turn1.xirsys.com:5349?transport=tcp",
      ],
    },
  ],
},
