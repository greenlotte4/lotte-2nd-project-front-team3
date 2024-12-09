import { NOTIFICATION_MY_SELECT_URI, NOTIFICATION_SEND_URI } from "./_URI";
import axiosInstance from "./../utils/axiosInstance";

export const sendNotification = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${NOTIFICATION_SEND_URI}`,
      payload
    );
    return response.data; // 성공적인 응답 데이터 반환
  } catch (error) {
    console.error("알림 전송 실패:", error.response || error);
    throw new Error("알림 전송에 실패했습니다. 서버 상태를 확인하세요.");
  }
};

// 본인 알림 조회
export const fetchNotifications = async (targetId) => {
  if (!targetId) {
    throw new Error("Target ID is required for fetching notifications.");
  }
  try {
    const response = await axiosInstance.get(
      `${NOTIFICATION_MY_SELECT_URI}?targetId=${targetId}`
    );
    return response.data; // 서버에서 받은 데이터를 그대로 반환
  } catch (error) {
    console.error("❌ Failed to fetch notifications:", error.response || error);
    throw new Error(
      "Failed to fetch notifications. Please check the server status."
    );
  }
};
