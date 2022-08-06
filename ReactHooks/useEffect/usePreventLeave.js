//아직 저장하지 않았어

export const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = ""; // 얘는 뭐하는 애지?
  };
  //before unload: window가 닫히기 전에 function 실행
  const enablePrevent = () => {
    window.addEventListener("beforeunload", listener);
  };
  const disablePrevent = () => {
    window.removeEventListener("beforeunload", listener);
  };
  return { enablePrevent, disablePrevent };
};

function App() {
  // { } 안의 변수 이름을 return 받는 변수와 동일하게 설정해야 함.

  const { enablePrevent, disablePrevent } = usePreventLeave();
  console.log(usePreventLeave);

  return (
    <div>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
}

export default App;
