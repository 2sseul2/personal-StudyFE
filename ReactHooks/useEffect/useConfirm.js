// 진짜 그럴 것인지 확인/취소 창을 띄우는 것

export const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm && typeof onConfirm !== "function") {
    return;
  }
  if (!onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

//실행
// const deleteWorld = () => console.log("Deleting the world...");
// const abort = () => console.log("Aborted");
// const confirmDelete = useConfirm("Aure you sure", deleteWorld, abort);
// return (
//   <div>
//     <button onClick={confirmDelete}>Delete the world</button>
//   </div>
// );
