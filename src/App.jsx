import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useAuth } from "./context/AuthContext";

function App() {
  const currentUser = useAuth();
  const [currentUserId, setCurrentUserId] = useState("user1");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    currentUser ? setCurrentUserId(currentUser.uid) : setCurrentUserId(null);

    console.log("crr-", currentUserId);
  }, [currentUser]);
  return (
    <div className=" h-screen flex justify-center items-center bg-black">
      <div className="w-4/5 h-[90vh] bg-[rgba(87,126,197,0.75)]   rounded-[12px] border border-[rgba(255,255,255,0.125)] flex">
        {currentUser ? (
          <>
            <List
              currentUserId={currentUserId}
              onSelectUser={setSelectedUserId}
            />
            {selectedUserId && (
              <Chat
                currentUserId={currentUserId}
                otherUserId={selectedUserId}
              />
            )}
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
