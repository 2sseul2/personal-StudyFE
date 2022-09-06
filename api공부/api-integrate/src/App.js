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
