// store/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("auth-user")) || null,
  token: localStorage.getItem("auth-token") || null,
  isAuthenticated: !!localStorage.getItem("auth-token"),

  setAuth: (user, token) => {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("auth-user", JSON.stringify(user)); // 👈 user bhi save karo
    set({ user, token, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user"); // 👈 user bhi remove karo
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
