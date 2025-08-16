import React from "react";
import { useChatStore } from "../../Store/chatStore";

function MessageArea() {
 const{selectedUser,messages}=useChatStore();
 const userMessages=messages[selectedUser?.id]||[];

  return (
    <div className="h-[75%] bg-blue-50 overflow-y-auto p-3 space-y-2">
      {userMessages.map((msg) => (
        <div
          key={msg.id}
          className={`chat ${msg.sender === "me" ? "chat-end" : "chat-start"}`}
        >
          <div
            className={`chat-bubble ${
              msg.sender === "me"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-900"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageArea;
