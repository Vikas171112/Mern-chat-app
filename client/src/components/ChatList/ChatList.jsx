import React from "react";
import ChatOptions from "../ChatOptions/ChatOptions";
import { useChatStore } from "../../Store/chatStore";
import NavBar from "../NavBar/NavBar";

function ChatList() {
   const{chatList, setSelectedUser}= useChatStore();
  return (
    <div className="h-screen w-[40%]">
        <NavBar/>
        <ChatOptions/>
      <ul className="list bg-base-100 rounded-box shadow-md p-2">
        {chatList.map((friend, index) => (
          <li key={index} className="list-row flex items-center gap-3 p-2 hover:bg-base-200 rounded-md" onClick={()=>setSelectedUser(friend)}>
            <div>
              <img
                className="size-10 rounded-full"
                src={`https://img.daisyui.com/images/profile/demo/${(index % 5) + 1}@94.webp`}
                alt={friend}
              />
            </div>
            <div>
              <div className="font-medium">{friend.name}</div>
            
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
