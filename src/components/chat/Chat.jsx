import { useEffect, useRef, useState } from "react";
import {
  child,
  database,
  get,
  onValue,
  push,
  ref,
  set,
  update,
} from "../../lib/firebase";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = Math.abs(now - date);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString(); // Show full date if more than a week ago
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

const Chat = ({ currentUserId, otherUserId }) => {
  const [messages, setMessages] = useState([]);
  const [lastSeen, setLastSeen] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [mainUser, setMainUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  const chatId = [currentUserId, otherUserId].sort().join("_");

  useEffect(() => {
    get(child(ref(database), `users/${currentUserId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMainUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    get(child(ref(database), `users/${otherUserId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("other", snapshot.val());
          setOtherUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    onValue(ref(database, `chats/${chatId}/messages`), (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data
        ? Object.entries(data).map(([key, value]) => ({ ...value, id: key }))
        : [];
      setMessages(messagesArray);
      update(ref(database, `chats/${chatId}/`), { lastSeen: "read" });
    });

    onValue(ref(database, `chats/${chatId}/`), (snapshot) => {
      const data = snapshot.val();
      data.lastSeen && setLastSeen(data.lastSeen);
      console.log(data, lastSeen);
    });
  }, [currentUserId, otherUserId]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const chatId = [currentUserId, otherUserId].sort().join("_");

      const message = {
        sender: currentUserId,
        content: newMessage,
        timestamp: Date.now(),
        status: "sent",
      };

      // set(ref(database, `chats/${chatId}/messages`), message);
      push(ref(database, `chats/${chatId}/messages`), message).then(() => {
        set(ref(database, `chats/${chatId}/lastSeen`), "sent");
      });

      setNewMessage("");
    }
  };

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <div className="   border-r border-[#dddddd35] flex h-full flex-col">
      {/* top */}

      <div className="top p-4 flex justify-center items-center border-b border-[#dddddd35]">
        <div className="user flex items-center gap-5">
          <span className=" text-2xl font-bold text-white">
            Chat with {otherUser && otherUser.username}
          </span>
        </div>
      </div>

      {/* center */}
      <div className="center p-5 flex-1 overflow-scroll flex flex-col gap-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message max-w-[70%] flex gap-5 ${
              message.sender === currentUserId ? "self-end" : "self-start"
            }`}
          >
            <div>
              {message.sender === currentUserId ? (
                <span>{mainUser && mainUser.username}</span>
              ) : (
                <span>{otherUser && otherUser.username}</span>
              )}{" "}
              de
            </div>
            <div className="texts flex-1 flex flex-col gap-2">
              <p className="p-3 bg-white rounded-lg">{message.content}</p>
              <span>{formatTimestamp(message.timestamp)}</span>
            </div>
          </div>
        ))}
        {messages.length > 0 &&
          messages[messages.length - 1].sender === currentUserId && (
            <span className=" flex justify-end">
              {lastSeen === "sent" && <span>✓</span>}
              {lastSeen === "delivered" && (
                <span className="text-blue-400">✓✓</span>
              )}
              {lastSeen === "read" && <span className="text-blue-400">✓✓</span>}
            </span>
          )}
        <div ref={endRef}></div>
      </div>

      {/* bottom*/}
      <div className="bottom flex justify-between border-t border-[#dddddd35] items-center">
        {/* <div className="icons"></div> */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 text-black p-5 rounded-lg text-base m-4"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        {/* <div className="emoji"></div> */}
        <button
          className="sendButton text-white bg-blue-600 py-2 px-5 cursor-pointer rounded-lg m-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
