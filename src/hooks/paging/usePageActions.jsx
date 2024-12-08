import { useState } from "react";
import {
  PAGE_SOFT_DELETE_URI,
  PAGE_RESTORE_URI,
  PAGE_HARD_DELETE_URI,
  PAGE_LIST_UID_URI,
  PAGE_LIST_MODIFIED_URI,
} from "../../api/_URI";
import axiosInstance from "@utils/axiosInstance";

export const usePageActions = () => {
  // 페이지 삭제
  const handleDeletePage = async (
    pageId,
    {
      personalPageList,
      setPersonalPageList,
      latestPages,
      setLatestPages,
      deletedPages,
      setDeletedPages,
    }
  ) => {
    if (!pageId) return;

    if (window.confirm("정말로 이 페이지를 삭제하시겠습니까?")) {
      try {
        const response = await axiosInstance.delete(
          PAGE_SOFT_DELETE_URI.replace(":id", pageId)
        );

        if (response.status === 200) {
          alert("페이지가 삭제되었습니다.");

          const deletedPage =
            personalPageList.find((page) => page._id === pageId) ||
            latestPages.find((page) => page._id === pageId);

          setPersonalPageList((prev) =>
            prev.filter((page) => page._id !== pageId)
          );
          setLatestPages((prev) => prev.filter((page) => page._id !== pageId));

          if (deletedPage) {
            setDeletedPages((prev) => [deletedPage, ...prev]);
          }
        } else {
          alert("페이지 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting page:", error);
        alert("페이지 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 페이지 복구
  const handleRestorePage = async (
    pageId,
    { setDeletedPages, setPersonalPageList, setLatestPages }
  ) => {
    if (!pageId) return;

    if (window.confirm("페이지를 복구하시겠습니까?")) {
      try {
        const response = await axiosInstance.put(
          PAGE_RESTORE_URI.replace(":id", pageId)
        );

        if (response.status === 200) {
          alert("페이지가 복구되었습니다.");

          setDeletedPages((prev) => prev.filter((page) => page._id !== pageId));

          const [personalResponse, latestResponse] = await Promise.all([
            axiosInstance.get(PAGE_LIST_UID_URI),
            axiosInstance.get(PAGE_LIST_MODIFIED_URI),
          ]);

          setPersonalPageList(personalResponse.data);
          setLatestPages(latestResponse.data);
        } else {
          alert("페이지 복구에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error restoring page:", error);
        alert("페이지 복구 중 오류가 발생했습니다.");
      }
    }
  };

  return {
    handleDeletePage,
    handleRestorePage,
  };
};
