import React, { useState } from "react";
import ChatList from "./chatList/ChatList";

const Chat = () => {
  const [text, setText] = useState("");
  console.log(text);
  return (
    <div className=" flex-[2] border-l border-r border-[#dddddd35] flex h-full flex-col">
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
        <div className="icons flex gap-4">Icons phone</div>
      </div>
      {/* center */}
      <div className="center p-5 flex-1 "></div>

      {/* bottom*/}
      <div className="bottom flex justify-between border-t border-[#dddddd35] items-center">
        {/* <div className="icons"></div> */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 text-black p-5 rounded-lg text-base m-4"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {/* <div className="emoji"></div> */}
        <button className="sendButton text-white bg-blue-600 py-2 px-5 cursor-pointer rounded-lg m-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
