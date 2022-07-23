import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';
// 회색 배경 컴포넌트를 만듦.
const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`;

// 프로젝트 모든 곳에서, Todo 관련 context들을 사용할 수 있도록
// TodoProvider로 감싸줌. 
function App() {
  return(
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
  
  
}

export default App;
