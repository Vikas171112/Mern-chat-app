import React from "react";
import Avatar from "../Avatar/Avatar";
import { useChatStore } from "../../Store/chatStore";

function Nav() {
      const{selectedUser}= useChatStore();
      
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white shadow-sm">
     
      <div className="flex items-center gap-3">
        <Avatar size="md" /> 
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">{selectedUser?.name}</h2>
          <span className="text-sm text-gray-500">{selectedUser?.lastSeen}</span>
        </div>
      </div>

      
      <div className="flex items-center gap-4 text-gray-600">
        <button className="hover:text-gray-800">
          <i className="ri-search-line text-xl"></i>
        </button>
        <button className="hover:text-gray-800">
          <i className="ri-more-2-fill text-xl"></i>
        </button>
      </div>
    </div>
  );
}

export default Nav;
