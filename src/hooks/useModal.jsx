import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    isModalOpen,
    toggleModal,
  };
}
