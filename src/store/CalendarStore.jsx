import { create } from "zustand";

export const useCalendarStore = create((set) => ({
  selectedIds: [],
  toggleCheckbox: (calendarId) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(calendarId)
        ? state.selectedIds.filter((id) => id !== calendarId) // 체크 해제
        : [...state.selectedIds, calendarId], // 체크
    })),
}));
