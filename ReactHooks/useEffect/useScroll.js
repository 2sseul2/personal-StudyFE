// 스크롤 해서 무언갈 지나쳤을 때 색상을 바꾸거나 무엇을 하는 것
import { useEffect, useState } from "react";

export const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  const onScroll = () => {
    console.log("y: ", window.scrollY, "x: ", window.scrollX);
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
};

// 실행
// const { y } = useScroll();
// return (
//   // 스크롤 하기 위함: 1000vh
//   <div style={{ height: "1000vh" }}>
//     <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
//       hello
//     </h1>
//   </div>
// );
