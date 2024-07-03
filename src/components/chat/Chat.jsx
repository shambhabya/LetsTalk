import { useEffect, useRef, useState } from "react";
import { database, onValue, push, ref, set } from "../../lib/firebase";

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
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const chatId = [currentUserId, otherUserId].sort().join("_");

    onValue(ref(database, `chats/${chatId}/messages`), (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data
        ? Object.entries(data).map(([key, value]) => ({ ...value, id: key }))
        : [];
      console.log(messagesArray);
      setMessages(messagesArray);

      // if (currentUserId !== messagesArray[messagesArray.length - 1]?.sender) {
      //   messagesArray.forEach((message) => {
      //     if (message.status === "sent") {
      //       database
      //         .ref(`chats/${chatId}/messages/${message.id}`)
      //         .update({ status: "delivered" });
      //     } else if (message.status === "delivered") {
      //       database
      //         .ref(`chats/${chatId}/messages/${message.id}`)
      //         .update({ status: "read" });
      //     }
      //   });
      // }
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
      push(ref(database, `chats/${chatId}/messages`), message);
      setNewMessage("");
    }
  };

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);
  return (
    <div className=" flex-[2]  border-r border-[#dddddd35] flex h-full flex-col">
      {/* top */}

      <div className="top p-4 flex justify-center items-center border-b border-[#dddddd35]">
        <div className="user flex items-center gap-5">
          <img
            src="/public/avatar.png"
            alt="avatar"
            className=" w-14 h-14 rounded-md"
          />
          <div className="texts">
            <span className=" text-base font-bold">Jane Doe</span>
            <p className=" text-sm font-light text-slate-500">
              Loren Ipsum dolor, sit amet.
            </p>
          </div>
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
            <div className="texts flex-1 flex flex-col gap-2">
              <p className="p-3 bg-white rounded-lg">{message.content}</p>
              <span>{formatTimestamp(message.timestamp)}</span>
            </div>
          </div>
        ))}

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
