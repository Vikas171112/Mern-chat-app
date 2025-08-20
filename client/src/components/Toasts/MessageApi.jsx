import React from "react";

function MessageApi({ message }) {
  return (
    <div
      className={`border-l-4 p-4 rounded-md shadow-md mb-4 px-2 `}
      role="alert"
    >
      <p className="font-medium ">
        Error<span className="font-normal text-orange-400">{message}</span>
      </p>
    </div>
  );
}

export default MessageApi;
