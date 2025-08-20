import { create } from "zustand";

export const useChatStore = create((set) => ({
  chatList: [],
  messages: {},
  selectedUser: null,

  setSelectedUser: (user) => set({ selectedUser: user }),
  setChatList: (chatList) => {
    console.log("💾 Zustand updating chatList =>", chatList);
    set({ chatList });
  },
}));
