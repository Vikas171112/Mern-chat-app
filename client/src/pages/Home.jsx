import React from "react";
import NavBar from "../components/NavBar/NavBar";
import ChatList from "../components/ChatList/ChatList";
import ChatWindow from "../components/ChatWindow/ChatWindow";

function Home() {
  return (
   <div className="flex">  
    <ChatList/>
    <ChatWindow/>
   </div>
  );
}

export default Home;
