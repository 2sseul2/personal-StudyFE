import React, { useEffect, useState } from "react";

import axios from "axios";

function ButtonPushGet() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  //fetchUsers 정의
  const fetchUsers = async () => {
    try {
      // 요청이 시작할 때 error와 users를 초기화
      setError(null);
      setUsers(null);
      //loading == true
      setLoading(true);

      //response가 끝날 때까지 기다린다
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      // data는 response.data에 있다
      setUsers(response.data);
    } catch (e) {
      // error 발생시 error 세팅
      setError(e);
      console.log("error 발생: ", error);
    }
    //모든 작업이 끝나면 loading==false
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default ButtonPushGet;
