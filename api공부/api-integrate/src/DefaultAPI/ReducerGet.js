import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import useAsync from "../usingHook/useAsync";

// useAsync 에서는 Promise의 결과를 바로 data에 담는다.
// 따라서 요청을 한 이후 response.data를 추출하여 반환하는 함수를 정의한다.
async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function ReducerGet() {
  const [state, refetch] = useAsync(getUsers, [], true);

  //data:users 의미: state.data를 users 키워드로 받는다
  const { loading, data: users, error } = state;

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default ReducerGet;
