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

export const getPageDetails = async (pageId) => {
  try {
    const response = await axiosInstance.get(`/api/pages/${pageId}`);
    return response.data; // 페이지 세부정보 반환
  } catch (error) {
    console.error("페이지 세부정보 가져오기 실패:", error);
    throw new Error("페이지 세부정보를 가져오는 데 실패했습니다.");
  }
};

// 템플릿 목록 가져오기
export const getTemplates = async () => {
  try {
    const response = await axiosInstance.get(PAGE_LIST_TEMPLATE_URI);
    return response.data; // 템플릿 목록 반환
  } catch (error) {
    console.error("템플릿 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 템플릿으로부터 페이지 생성
export const createPageFromTemplate = async (templateId, userId) => {
  try {
    const response = await axiosInstance.post(
      "/api/pages/create-from-template",
      {
        templateId,
        userId,
      }
    );
    return response.data; // 생성된 페이지 반환
  } catch (error) {
    console.error("템플릿으로부터 페이지 생성 중 오류 발생:", error);
    throw error;
  }
};
