import { useState, useEffect } from "react";

export const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    // title: html head에 있는 부분
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);

  return setTitle;
};

// 실행
// const titleUpdater = useTitle("Loading...");
// setTimeout(() => titleUpdater("Home"), 5000); // 5초 후에 실행