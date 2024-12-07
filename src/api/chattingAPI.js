import {
  CHANNEL_URI,
  CHANNEL_LIST_URI,
  DM_GET_MESSAGES_URI,
  CHANNEL_GET_URI,
  CHANNEL_GET_MESSAGES_URI,
  CHANNEL_SEND_MESSAGE_URI,
  CHANNEL_LEAVE_URI,
} from "./_URI";
import axios from "axios";

export const createChannel = async (channelData) => {
  try {
    console.log("[JS] channel create 요청 전송");
    // 요청 전송
    const response = await axios.post(CHANNEL_URI, channelData);

    return response.data;
  } catch (error) {
    console.error("[JS] Error adding company:", error.message || error);
    throw error;
  }
};

export const getChannel = async (channelId) => {
  try {
    const response = await axios.get(CHANNEL_GET_URI(channelId));
    return response.data;
  } catch (error) {
    console.error("채널 상세조회 오류:", error);
    throw error;
  }
};

export const getChannelMessages = async (channelId) => {
  try {
    const response = await axios.get(CHANNEL_GET_MESSAGES_URI(channelId));
    return response.data;
  } catch (error) {
    console.error("채널 메시지 조회 오류:", error);
    throw error;
  }
};

export const sendChannelMessage = async ({ channelId, content, senderId }) => {
  try {
    await axios.post(CHANNEL_SEND_MESSAGE_URI(channelId), {
      content,
      senderId,
    });
  } catch (error) {
    console.error("채널 메시지 전송 오류:", error);
    throw error;
  }
};

export const leaveChannel = async ({ channelId, userId }) => {
  try {
    await axios.put(CHANNEL_LEAVE_URI(channelId, userId));
  } catch (error) {
    console.error("채널 나가기 오류:", error);
    throw error;
  }
};

export const getAllChannels = async () => {
  try {
    const response = await axios.get(CHANNEL_LIST_URI);
    return response.data; // 채널 목록 데이터를 반환
  } catch (error) {
    console.error("채널 목록 조회 오류:", error);
    throw error; // 에러 발생 시 다시 던져서 호출한 곳에서 처리
  }
};

export const getDmMessages = async (dmId) => {
  try {
    const response = await axios.get(DM_GET_MESSAGES_URI(dmId));
    return response; // 데이터 반환
  } catch (error) {
    console.error("디엠 메시지 조회 실패:", error);
    throw error; // 에러 발생 시 처리
  }
};
