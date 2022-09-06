export default function createAsyncDispatcher(type, promiseFn) {
  //성공, 실패에 대한 Action Type String
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  async function actionHandler(dispatch, ...rest) {
    dispatch({ type }); // 요청 시작(=loadingState)
    try {
      //promiseFn는 api.getUser 함수
      const data = await promiseFn(...rest);
      dispatch({
        type: SUCCESS,
        data,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e,
      });
    }
  }
  return actionHandler;
}
