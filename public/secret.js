const API_KEY = "9acdf58bb3msh9fcea96d8a284b7p185cdbjsna8179ddcc1aa";
const CONFIG = {
  iceServers: [
    { urls: ["stun:bn-turn1.xirsys.com"] },
    {
      username:
        "CWAMDU_IwwRmty8iMrAactysEXO6eP4M85T3Xq01pSnH8FvidtyXGHp0nEg2L32WAAAAAF94vXxtcnBrZGV2ZWxvcGVy",
      credential: "109ad15c-05a3-11eb-8f6a-0242ac140004",
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
};
