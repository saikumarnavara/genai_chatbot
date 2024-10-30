import "./App.css";
import ChatContainer from "./components/chatcontainer/ChatContainer";
import PersistentDrawerLeft from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      <PersistentDrawerLeft />
      <ChatContainer />
    </>
  );
}

export default App;
