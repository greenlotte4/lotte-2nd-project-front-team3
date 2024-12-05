import { create } from "zustand";
import { decodeToken } from "./../utils/decodeToken";
import { refreshAccessToken } from "../api/userAPI";

// Auth 상태 관리용 Zustand Store
const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token) => {
    if (!token || typeof token !== "string") {
      console.error("유효하지 않은 Access Token입니다:", token);
      return;
    }

    const user = decodeToken(token);
    if (user) {
      set({ accessToken: token, user });
    } else {
      console.error("Access Token 디코딩 실패:", token);
    }
  },
  clearAccessToken: () => set({ accessToken: null, user: null }),

  // 새로고침 시 Access Token 갱신
  initializeAuth: async () => {
    try {
      console.log("Initializing Auth...");
      const newAccessToken = await refreshAccessToken();
      console.log("토큰 갱신? " + newAccessToken);
      if (newAccessToken) {
        console.log("New Access Token:", newAccessToken);
        const user = decodeToken(newAccessToken);
        set({ accessToken: newAccessToken, user });
        console.log("User Updated:", user);
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
    }
  },
}));

export default useAuthStore;
