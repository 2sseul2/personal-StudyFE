import React, { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

//callback: API 요청을 사작하는 함수
// deps: useEffect에서 사용: default:[]의 의미: 처음 컴포넌트 렌더링 시에만 API 호출 희망
function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if(skip) return;
    fetchData();
    //eslint-disable-next-line
  }, deps);

  // 요청 관련 상태와 함수를 반환
  return [state, fetchData];
}

export default useAsync;
