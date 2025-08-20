import React from "react";
import ChatOptions from "../ChatOptions/ChatOptions";

import NavBar from "../NavBar/NavBar";
import { useFetchFriendList } from "../../hooks/ApiHooks/useFetchFriendListApi";
import { useChatStore } from "../../Store/chatStore";

function ChatList() {
  const { chatList, setSelectedUser } = useChatStore();
  const { isLoading, isError } = useFetchFriendList();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load friends</p>;
  console.log(chatList);

  return (
    <div className="h-screen w-[40%]">
      <NavBar />
      <ChatOptions />
      <ul className="list bg-base-100 rounded-box shadow-md p-2">
        {chatList.map((friend, index) => (
          <li
            key={friend._id}
            className="list-row flex items-center gap-3 p-2 hover:bg-base-200 rounded-md"
            onClick={() => setSelectedUser(friend)}
          >
            <img
              className="size-10 rounded-full"
              src={`https://img.daisyui.com/images/profile/demo/${
                (index % 5) + 1
              }@94.webp`}
              alt={friend.name}
            />
            <div className="font-medium">{friend.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
