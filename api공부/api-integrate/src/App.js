import ButtonPushGet from "./DefaultAPI/ButtonPushGet";
import DefaultGet from "./DefaultAPI/DefaultGet";
import ParameterReducerGetUsers from "./usingHook/ParameterReducerGetUsers";
import ReducerGet from "./DefaultAPI/ReducerGet";
import { UsersProvider } from "./usingContext/UsersContext";
import Users from "./usingContext/Users";

function App() {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
}

export default App;
