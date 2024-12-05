import { create } from "zustand";
import {
  checkInAPI,
  checkOutAPI,
  updateStatusAPI,
} from "./../api/attendanceAPI";

const useAttendanceStore = create((set) => ({
  status: "AVAILABLE",
  checkInTime: null,
  checkOutTime: null,
  isLoading: false,
  error: null,

  // 출근 처리
  checkIn: async (userId) => {
    try {
      if (!userId) throw new Error("User ID가 필요합니다."); // 유효성 검사
      set({ isLoading: true, error: null });
      const data = await checkInAPI(userId);
      set({
        status: "CHECKED_IN",
        checkInTime: data.checkInTime,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "출근 처리 중 오류 발생";
      console.error("출근 처리 실패:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  // 퇴근 처리
  checkOut: async (userId) => {
    try {
      if (!userId) throw new Error("User ID가 필요합니다."); // 유효성 검사
      set({ isLoading: true, error: null });
      const data = await checkOutAPI(userId);
      set({
        status: "CHECKED_OUT",
        checkOutTime: data.checkOutTime,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "퇴근 처리 중 오류 발생";
      console.error("퇴근 처리 실패:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  // 상태 업데이트
  updateStatus: async (userId, newStatus) => {
    try {
      if (!userId || !newStatus)
        throw new Error("User ID와 상태 값이 필요합니다."); // 유효성 검사
      set({ isLoading: true, error: null });
      await updateStatusAPI(userId, newStatus);
      set({ status: newStatus, error: null });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "상태 업데이트 중 오류 발생";
      console.error("상태 업데이트 실패:", errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  // 상태 초기화
  resetAttendance: () =>
    set({
      status: "AVAILABLE",
      checkInTime: null,
      checkOutTime: null,
      isLoading: false,
      error: null,
    }),

  // 현재 상태 및 시간 정보 반환
  getAttendanceInfo: () => {
    const { status, checkInTime, checkOutTime } = useAttendanceStore.getState();
    return { status, checkInTime, checkOutTime };
  },
}));

export default useAttendanceStore;
