import "./App.css";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";

function App() {
  return (
    <div className=" h-screen flex justify-center items-center bg-black">
      <div className="w-4/5 h-[90vh] bg-[rgba(87,126,197,0.75)]   rounded-[12px] border border-[rgba(255,255,255,0.125)] flex">
        <List />
        <Chat />
        <Detail />
      </div>
    </div>
  );
}

export default App;
