import React, { useState } from "react";

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of Section 1",
  },
  {
    tab: "Section 2",
    content: "I'm the content of Section 2",
  },
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || Array.isArray(allTabs)) {
    return;
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

function App() {
  // 개신기하네
  // useTabs로 부른 state 상태 반환들을 그대로 가지고 가네 
  // 그래서 changeItem(index)하면 currentItem가 바뀜 ㅋㅋ 개신기함 ㅋㅋ 
  const { currentItem, changeItem } = useTabs(0, content); //최초 인덱스: 0
  return (
    <div>
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
}

export default App;
