// frontend 구동 JS

// io(): frontend가 backend socket과 자동으로 연결되도록 해주는 socketIO 기본 제공 함수: socket.io를 실행하고 있는 서버를 알아서 찾음
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;
let myDataChannel;

async function getCameras() {
  try {
    //사용자가 접근 가능한 출력장치의 리스트 가져오기
    const devices = await navigator.mediaDevices.enumerateDevices();
    //videoInput만 출력하기
    const cameras = devices.filter((device) => device.kind === "videoinput");
    // 첫 번째 리스트 원소를 선택함
    const currentCamera = myStream.getVideoTracks()[0];
    //카메라 list를 html의 option으로 넣어주기
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

//유저의 허용 설정을 하면 promise를 반환하기 때문에 async를 설정
async function getMedia(deviceId) {
  // constraint를 변수로 담아간다.
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  }; 
  
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  // getUserMedia를 통해 허용을 받았을 때 deviceId의 유무를 통해 contraint 설정
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
    // video에 stream 연결
    myFace.srcObject = myStream;

    // 카메라 목록에 paint해주는 작업, 처음에 1번만
    if (!deviceId) {
      //위의 getCameras 호출을 위한 async & await
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}
//ok
function handleMuteClick() {
  //실제 오디오를 mute/unmute하는 코드
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  //버튼 text를 바꾸는 코드
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
//ok
function handleCameraClick() {
  //실제 비디오를 on/off하는 코드
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// Welcome Form (join a room)

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

async function initCall() {
  // 해당하는 div 숨기고 보이기.
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  await initCall();
  // emit(발생할 이벤트명, 전송할 object, [백에서 호출할 func])
  // 클라이언트의 해당 이벤트리스너에서 처리
  // 우리의 backend가 이 event를 받고 있음.
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code

socket.on("welcome", async () => {
  myDataChannel = myPeerConnection.createDataChannel("chat");
  myDataChannel.addEventListener("message", (event) => console.log(event.data));
  console.log("made data channel");
  // B에 대한  offer 생성
  const offer = await myPeerConnection.createOffer();
  // B에 대한 offer를 A에 등록
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer");
  // A에 대한 offer를 B에 전송
  socket.emit(" ", offer, roomName);
});

socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDataChannel = event.channel;
    myDataChannel.addEventListener("message", (event) =>
      console.log(event.data)
    );
  });
  console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
  console.log("sent the answer");
});

socket.on("answer", (answer) => {
  console.log("received the answer");
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  console.log("received candidate");
  myPeerConnection.addIceCandidate(ice);
});

// RTC Code


// 실제 사용자간 연결을 만드는 메소드
function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);
  // Peer to Peer 연결
  myStream
    // 카메라 및 마이크의 datastrea을 받아서
    .getTracks()
    // 그것들을 myPeerConnection 연결 안에 추가함.
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
  console.log("sent candidate");
  socket.emit("ice", data.candidate, roomName);
}

function handleAddStream(data) {
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}
