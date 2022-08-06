import { useEffect, useRef } from "react";

export const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    //react 16.8v 부터는 조건문 등을 훅 이전에 사용할 수 없으므로 해당 조건을 가장 선순위에 둔다. 
    if (typeof onClick !== "function") {
      return;
    }
    //mount 되었을 때 event 부여
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    //unmount 되면 event 제거: useEffect의 return 사용
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); // []: mount 될 때 단 한 번만 실행하라
  return typeof onClick !== "function" ? undefined : element;
};

// 실행
// const sayHello = () => console.log("say hello");
// const title = useClick(sayHello);
// return (
//   <div>
//     <h1 ref={title}>Hi</h1>
//   </div>
// );
