import axiosInstance from "../utils/axiosInstance";
import { PAGE_FETCH_URI } from "./_URI";

// 페이지 협업자 목록 조회
export const getPageCollaborators = async (pageId) => {
  try {
    console.log("Calling API with pageId:", pageId);
    const response = await axiosInstance.get(
      `${PAGE_FETCH_URI}/${pageId}/collaborators`
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch page collaborators:", error);
    throw error;
  }
};

// 페이지 협업자 추가
export const addPageCollaborators = async (pageId, collaborators) => {
  try {
    const response = await axiosInstance.post(
      `${PAGE_FETCH_URI}/${pageId}/collaborators`,
      {
        collaborators: collaborators.map((user) => ({
          // 새로운 협업자는 id가 0
          pageId: pageId,
          user_id: user.id,
          uidImage: null,
          invitedAt: null,
          isOwner: false,
          type: 0,
        })),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add collaborators:", error);
    throw error;
  }
};

// 페이지 협업자 제거
export const removePageCollaborator = async (pageId, userId) => {
  try {
    const response = await axiosInstance.delete(
      `${PAGE_FETCH_URI}/${pageId}/collaborators/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to remove collaborator:", error);
    throw error;
  }
};

export const getSharedPages = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${PAGE_FETCH_URI}/shared/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("공유된 페이지 조회 실패:", error);
    throw error;
  }
};
