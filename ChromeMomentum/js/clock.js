const clock = document.querySelector("h2#clock");

function getClock() {
  // 날짜 객체 생성
  const date = new Date();

  // 날짜 얻기: date.getXs()
  // 1자리라면 0을 채워줌
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);
