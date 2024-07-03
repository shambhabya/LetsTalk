import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="h-3 w-3 bg-current rounded-full animate-bounce mr-1"></div>
      <div className="h-3 w-3 bg-current rounded-full animate-bounce200 mr-1"></div>
      <div className="h-3 w-3 bg-current rounded-full animate-bounce400"></div>
    </div>
  );
};

export default Loading;
