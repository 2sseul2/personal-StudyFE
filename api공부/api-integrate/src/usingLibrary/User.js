import { axios } from "axios";
import React from "react";
import { useAsync } from "react-async";

// useAsync에서 호출될 함수의 파라미터는 {}처리를 해주어야함. 
async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  // useAsync 파라미터 
  // promiseFn: 호출할 함수 이름,
  // watch: watch에 넣어준 값이 바뀔 때마다 promiseFn 함수 재호출
  const {
    data: user,
    error,
    isLoading,
  } = useAsync({ promiseFn: getUser, id, watch: id });

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}
export default User;
