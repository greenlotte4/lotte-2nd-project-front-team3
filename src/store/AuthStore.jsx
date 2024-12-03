import { create } from "zustand";
import { decodeToken } from "./../utils/decodeToken";

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
}));

export default useAuthStore;
