// 다양한 컴포넌트에서 필요하게 될 특정 데이터를 위한 Context 사용
import React, { createContext, useContext, useReducer } from "react";
import createAsyncDispatcher from "./createAsyncDispatcher";
import * as api from "./api"; //getUsers, getUser

// UsersContext에서 사용할 기본 상태
const initialState = {
  users: {
    loading: false,
    data: null,
    error: null,
  },
  user: {
    loading: false,
    data: null,
    error: null,
  },
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null,
};

// 성공했을 때의 상태 만들어주는 함수
const success = (data) => ({
  loading: false,
  data,
  error: null,
});

// 실패했을 때의 상태 만들어주는 함수
const error = (error) => ({
  loading: false,
  data: null,
  error: error,
});

// 상기의 객체 & 유틸 함수들을 사용한 리듀서 작성
function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: loadingState,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: success(action.data), //success에 return 이 없는데도 가져오나보네
      };
    case "GET_USERS_ERROR":
      return {
        ...state,
        users: error(action.error),
      };
    case "GET_USER":
      return {
        ...state,
        user: loadingState,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: success(action.data),
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        user: error(action.error),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// State용 Context 및 Dispatch용 Context 만들기
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

// 위 2개의 context를 Provider로 감싸주는 컴포넌트
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

// State 조회를 쉽게해주는 커스텀훅
export function useUsersState() {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error("Cannot find UsersProvider");
  }
  return state;
}

// dispatch 사용을 쉽게해주는 커스텀훅
export function useUsersDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UserProvider");
  }
  return dispatch;
}

//createAsyncDispatcher는 actionHandler를 반환하므로
//getUsers는 actionHandler를 가지고 있다.
//actionHandler는 dispatch, ...rest를 파라미터로 받으므로
//Users에서 getUsers(dispatch)로 호출했다.

// promiseFn과 type을 createAsyncDispatcher의 파라미터로 받은 상태였기에 알아서 저장하고 있다.
export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);

function UsersContext() {
  return <div>UsersContext</div>;
}

export default UsersContext;
