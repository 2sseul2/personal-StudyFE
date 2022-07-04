// backend 구동 JS
import http from "http";
import SocketIO from "socket.io";
import express from "express";

// Express를 사용한 일반적인 Node.js 설정 
// 우리들의 app 생성
const app = express();

// pug 페이지 렌더를 위한 pug 설정
app.set("view engine", "pug");
  // 템플릿이 어디있는지
app.set("views", __dirname + "/views");

// 유저는 서버 내 모든 폴더를 /public을 통해 볼 수 있음
app.use("/public", express.static(__dirname + "/public"));

// route handler
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

//http + ws 합치는 과정, 같은 서버에서 http, webSocket 둘 다 작동

// httpServer에서 webSocket을 만들수 있음
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

// connection 
wsServer.on("connection", (socket) => {
  //join room: 방에 입장한다는 이벤트 발생
  socket.on("join_room", (roomName) => {
    // 방에 입장
    socket.join(roomName);
    // 방안의 모두에게 welcome 이벤트 발생 -> 프론트에서 처리
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

// 서버 실행 시 handleListen 메소드 실행
// express는 http를 다룸
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

