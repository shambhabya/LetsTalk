import React from "react";

const ChatList = () => {
  return (
    <div className="flex flex-col items-center ">
      ChatList
      <div>
        <div className="flex gap-2">
          <img src="/public/search.png" alt="search" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="item flex gap-2 p-2">
        <img src="/public/avatar.png" alt="avatar" height={30} width={50} />
        <div className="texts ">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item flex gap-2 p-2">
        <img src="/public/avatar.png" alt="avatar" height={30} width={50} />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item flex gap-2 p-2">
        <img src="/public/avatar.png" alt="avatar" height={30} width={50} />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item flex gap-2 p-2">
        <img src="/public/avatar.png" alt="avatar" height={30} width={50} />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
