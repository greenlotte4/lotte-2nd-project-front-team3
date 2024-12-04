import { CHANNEL_URI } from './_URI'
import axios from "axios";

export const createChannel = async (channelData) => {
    try {
        console.log("channel create 요청 전송");
        // 요청 전송
        const response = await axios.post(CHANNEL_URI, channelData);

        return response.data
    } catch (error) {
        console.error("Error adding company:", error.message || error);
        throw error;
    }
}