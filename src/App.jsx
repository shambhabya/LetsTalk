import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useAuth } from "./context/AuthContext";

function App() {
  const currentUser = useAuth();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    currentUser ? setCurrentUserId(currentUser.uid) : setCurrentUserId(null);
    console.log("current user-", currentUser);
  }, [currentUser]);
  return (
    <div className=" h-screen flex flex-col gap-8 items-center bg-[black] p-6">
      <div className="text-white text-4xl font-extrabold ">MyChat App</div>
      <div className="w-4/5 h-[80vh] bg-[rgba(108,130,217,0.75)] backdrop-blur-2xl saturate-100    rounded-[12px] border border-[rgba(255,255,255,0.125)] flex">
        {currentUser ? (
          <>
            <List
              currentUserId={currentUserId}
              onSelectUser={setSelectedUserId}
            />
            <div className="flex-[2]">
              {selectedUserId && (
                <Chat
                  currentUserId={currentUserId}
                  otherUserId={selectedUserId}
                />
              )}
            </div>
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </div>
  );
}

export default App;

// url('../public/bg.jpg')
