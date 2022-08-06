import { useState } from "react";

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    //console.log(event.target);
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

// function App() {
//   //value.length <= 10;
//   const maxLen = (value) => value.includes("@");
//   const name = useInput("Mr. ");
//   console.log(name); // 객체를 반환한다.
//   return (
//     <div>
//       <h1>Hello</h1>
//       {/* value={(name.value)} onChange={name.onChange} 대신 {...name} 이라고 써도 됨 */}
//       <input placeholder="Name" {...name} />
//     </div>
//   );
// }
 
