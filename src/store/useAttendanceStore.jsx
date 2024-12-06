import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  checkInAPI,
  checkOutAPI,
  updateStatusAPI,
} from "./../api/attendanceAPI";

const useAttendanceStore = create(
  persist(
    (set, get) => ({
      status: "AVAILABLE",
      checkInTime: null,
      checkOutTime: null,
      isLoading: false,
      error: null,

      // 출근 처리
      checkIn: async (userId) => {
        try {
          if (!userId) throw new Error("User ID가 필요합니다.");
          set({ isLoading: true, error: null });
          const data = await checkInAPI(userId);
          console.log("dataa" + data);
          if (!data) {
            throw new Error("API 응답이 유효하지 않습니다.");
          }

          set({
            status: "CHECKED_IN",
            checkInTime: data,
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
          if (!userId) throw new Error("User ID가 필요합니다.");
          set({ isLoading: true, error: null });
          const data = await checkOutAPI(userId);
          if (!data) {
            throw new Error("API 응답이 유효하지 않습니다.");
          }

          set({
            status: "CHECKED_OUT",
            checkOutTime: data,
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
          if (!userId || !newStatus) {
            throw new Error("User ID와 상태 값이 필요합니다.");
          }
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
        const { status, checkInTime, checkOutTime } = get();
        return { status, checkInTime, checkOutTime };
      },
    }),
    {
      name: "attendance-store",
      partialize: (state) => ({
        status: state.status,
        checkInTime: state.checkInTime,
        checkOutTime: state.checkOutTime,
      }),
    }
  )
);

export default useAttendanceStore;
