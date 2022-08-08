import { useRef } from "react";

export const useFullscreen = (callback) => {
  const element = useRef();
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullScreen();
      if (callback && typeof callback === "function") {
        callback(true);
      }
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if (callback && typeof callback === "function") {
      callback(true);
    }
  };
  return { element, triggerFull, exitFull };
};

// 실행

// const onFullS = (isFull) => {
//   console.log(isFull ? "We are full" : "we are small");
// };
// const { element, triggerFull, exitFull } = useFullscreen(onFullS);
// return (
//   // 스크롤 하기 위함: 1000vh
//   <div style={{ height: "1000vh" }}>
//     <div ref={element}>
//       <img src="https://file.newswire.co.kr/data/datafile2/thumb_480/2010/05/2039103817_20100527105820_1069435867.jpg" />
//       <button onClick={exitFull}> Exit Screen</button>
//     </div>

//     <button onClick={triggerFull}>Make FullScreen</button>
//   </div>
// );
