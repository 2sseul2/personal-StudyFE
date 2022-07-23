// 상태를 관리하는 TodoProvider를 만들 것
import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '투두리스트 1',
    done: true,
  },
  {
    id: 2,
    text: '투두리스트 2',
    done: true,
  },
  {
    id: 3,
    text: '투두리스트 3',
    done: false,
  },
  {
    id: 4,
    text: '투두리스트 4',
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    // state: todo 목록 렌더링
    // dispatch: 특정 액션..
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  // nextId: 새 항목 추가할 때 사용할 고유ID
  const nextId = useRef(5);
  return (
    //value 값을 설정하여 context 값을 설정한다.
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 목적: useReducer의 state, dispatch를 Context를 통하여 다른 컴포넌트에서 사용할 수 있도록 함.

// 다른 컴포넌트에서 state나 dispatch를 사용하고 싶을 경우를 위해
// 커스텀 Hook을 제시

// useContext: 만든 context의 조회를 위함
export function useTodoState() {
  const context = useContext(TodoStateContext);

  // 에러처리: 이 Hook들을 사용하려면 그 컴포넌트가 TodoProvider로 감싸져 있어야함.
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
}
