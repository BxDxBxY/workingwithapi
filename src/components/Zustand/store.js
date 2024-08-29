import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      access_token: null,
      setAccessToken: (token) => set({ access_token: token }),
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo: userInfo }),
      isAuthenticated: false,
      setAuthenticated: (status) => set({ isAuthenticated: status }),
    }),
    {
      name: "userAuthStore", 
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuthStore;
