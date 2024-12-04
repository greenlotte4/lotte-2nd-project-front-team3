import axios from "axios";
import { CALENDAR_INSERT_URI, CALENDAR_SELECT_URI } from "./_URI";

export const insertCalendar = async (calendar) => {
  try {
    // JSON 데이터로 전송
    const response = await axios.post(CALENDAR_INSERT_URI, calendar, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    console.log("calendar Created Successfully:", response.data);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error submitting calendar:", error);
    throw error; // 에러를 상위 호출로 전달
  }
};

// 캘린더 조회
export const getCalendar = async (uid) => {
  console.log("43434343434" + uid);
  try {
    const response = await axios.get(`${CALENDAR_SELECT_URI}/${uid}`, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
