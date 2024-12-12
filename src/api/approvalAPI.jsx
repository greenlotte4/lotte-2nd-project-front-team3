import axiosInstance from "@/utils/axiosInstance";
import {
  APPROVAL_DETAIL_SELECT,
  APPROVAL_MY_SELECT,
  APPROVAL_TRIP_CREATE,
} from "./_URI";

// 본인 결제 서류 조회
export const fetchApprovalRequests = async (userId, page, filters) => {
  const { type, status, search } = filters;

  try {
    const response = await axiosInstance.get(
      `${APPROVAL_MY_SELECT}/${userId}?page=${page}&type=${type}&status=${status}&search=${search}`
    );

    return response.data; // Axios는 데이터를 response.data에 저장
  } catch (error) {
    console.error("결재 데이터 가져오기 실패:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

// 출장 신청
export const createBusinessTrip = async (requestData) => {
  try {
    const response = await axiosInstance.post(
      APPROVAL_TRIP_CREATE,
      requestData,
      {
        headers: {
          "Content-Type": "application/json", // JSON 타입 명시
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in createBusinessTrip:", error);

    if (error.response) {
      const errorMessage = error.response.data?.message || "서버 요청 실패";
      throw new Error(errorMessage);
    }

    throw new Error("네트워크 에러 또는 서버와의 연결 실패");
  }
};

//

export const fetchApprovalDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`${APPROVAL_DETAIL_SELECT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("결재 상세 정보 가져오기 실패:", error);
    throw error;
  }
};
