import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  type: null,
  props: {},
  openModal: (type, props = {}) =>
    set({ isOpen: true, type, props: { ...props } }),
  closeModal: () => set({ isOpen: false, type: null, props: {} }),
  updateProps: (updatedProps) =>
    set((state) => ({
      props: { ...state.props, ...updatedProps }, // 새로운 객체 생성
    })),
}));

export default useModalStore;
