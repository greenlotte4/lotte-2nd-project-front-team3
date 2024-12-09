import axiosInstance from "./../utils/axiosInstance";
import {
  USER_CHANGE_STATUS_URI,
  USER_CHECK_IN_URI,
  USER_CHECK_OUT_URI,
  USER_CHECK_STATUS_URI,
} from "./_URI";

// 현재 출근 상태 가져오기
export const getAttendanceStatusAPI = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${USER_CHECK_STATUS_URI}/${userId}`
    );
    return response.data; // 서버에서 반환하는 출근 상태 데이터
  } catch (error) {
    console.error("현재 출근 상태 가져오기 실패:", error);
    throw error;
  }
};

// 출근 처리
export const checkInAPI = async (userId) => {
  try {
    const response = await axiosInstance.post(`${USER_CHECK_IN_URI}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`출근 처리 실패 (UserID: ${userId}):`, error);
    throw new Error(error.response?.data?.message || "출근 처리 중 오류 발생");
  }
};

// 퇴근 처리
export const checkOutAPI = async (userId) => {
  try {
    const response = await axiosInstance.post(
      `${USER_CHECK_OUT_URI}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`퇴근 처리 실패 (UserID: ${userId}):`, error);
    throw new Error(error.response?.data?.message || "퇴근 처리 중 오류 발생");
  }
};

// 상태 업데이트
export const updateStatusAPI = async (userId, newStatus) => {
  try {
    const response = await axiosInstance.put(
      `${USER_CHANGE_STATUS_URI}/${userId}`,
      null,
      {
        params: { status: newStatus },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `상태 업데이트 실패 (UserID: ${userId}, Status: ${newStatus}):`,
      error
    );
    throw new Error(
      error.response?.data?.message || "상태 업데이트 중 오류 발생"
    );
  }
};
