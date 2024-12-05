import {
    CHANNEL_CREATE_URI,
    CHANNEL_LIST_URI,
    DM_GET_MESSAGES_URI,
} from './_URI'
import axios from "axios";

export const createChannel = async (channelData) => {
    try {
        console.log("channel create 요청 전송");
        // 요청 전송
        const response = await axios.post(CHANNEL_CREATE_URI, channelData);

        return response.data
    } catch (error) {
        console.error("Error adding company:", error.message || error);
        throw error;
    }
}


// 채널 목록을 조회하는 함수
export const getAllChannels = async () => {
    try {
        console.log("채널 목록 요청 전송");
        // GET 요청을 통해 채널 목록 가져오기
        const response = await axios.get(CHANNEL_LIST_URI);

        return response.data; // 응답 데이터 (채널 목록) 반환
    } catch (error) {
        console.error("채널 목록 조회 실패:", error.message || error);
        throw error;
    }
};


// 디엠 메시지 조회 API 함수
export const getDmMessages = async (dmId) => {
    try {
        const response = await axios.get(DM_GET_MESSAGES_URI(dmId));
        return response; // 서버에서 반환된 데이터를 반환
    } catch (error) {
        console.error('디엠 메시지 조회 실패:', error);
        throw error; // 에러 발생 시 다시 던져서 처리
    }
};
