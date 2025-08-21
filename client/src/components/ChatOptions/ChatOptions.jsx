import React from "react";
import AddFriendModal from "../Modals/AddFriendModal";

function ChatOptions() {
  return (
    <div>
      <div className="flex w-full">
        {/* Add Friend Button */}
        <div
          className="card bg-base-300 rounded-box grid h-10 grow place-items-center cursor-pointer hover:bg-base-200"
          onClick={() =>
            document.getElementById("add_friend_modal").showModal()
          }
        >
          Add Friend
        </div>

        <div className="divider divider-horizontal">OR</div>

        {/* Create Group Button */}
        <div className="card bg-base-300 rounded-box grid h-10 grow place-items-center cursor-pointer hover:bg-base-200">
          Create Group
        </div>
      </div>

      {/* Modal include */}
      <AddFriendModal />
    </div>
  );
}

export default ChatOptions;
