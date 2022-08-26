import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";

// useAsync 에서는 Promise의 결과를 바로 data에 담는다.
// 따라서 요청을 한 이후 response.data를 추출하여 반환하는 함수를 정의한다.
async function getUsers(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function ParameterReducerGetUser({ id }) {
  //[id]: id가 바뀔 때마다 재호출
  const [state] = useAsync(() => getUsers(id), [id]);

  //data:users 의미: state.data를 users 키워드로 받는다
  const { loading, data: users, error } = state;

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return null;
  return (
    <div>
      <h2> {users.username}</h2>
      <p>
        <b> Email:</b> {users.email}
      </p>
    </div>
  );
}

export default ParameterReducerGetUser;
