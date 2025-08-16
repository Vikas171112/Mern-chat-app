import { create } from "zustand";

export const useChatStore = create((set) => ({
  chatList: [
    { id: 1, name: "Vikas Jha", lastSeen: "2 min ago" },
    { id: 2, name: "Rahul Kumar", lastSeen: "10 min ago" },
    { id: 3, name: "Sneha Sharma", lastSeen: "online" },
  ],

  messages: {
    1: [
      { id: 1, text: "Hey, how are you?", sender: "me" },
      { id: 2, text: "I’m good, you?", sender: "vikas" },
    ],
    2: [
      { id: 1, text: "Hello Rahul!", sender: "me" },
      { id: 2, text: "Hi bro, kya haal?", sender: "rahul" },
    ],
    3: [
      { id: 1, text: "Hi Sneha!", sender: "me" },
      { id: 2, text: "Hey, long time!", sender: "sneha" },
    ],
  },

  selectedUser: null,

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
