import React from "react";
import Avatar from "../Avatar/Avatar";
import Nav from "./Nav";
import ChatInput from "../ChatInput/ChatInput";
import MessageArea from "../MessageArea/MessageArea";

function ChatWindow() {
  return (
    <div className="w-full min-h-screen ">
      <Nav />
      <MessageArea />
      <ChatInput />
    </div>
  );
}

export default ChatWindow;
