import axios from "axios";
import {
  CALENDAR_DELETE_URI,
  CALENDAR_INSERT_URI,
  CALENDAR_SELECT_URI,
  CALENDAR_UPDATE_URI,
  SCHEDULE_INSERT_URI,
  SCHEDULE_SELECTDEPART_URI,
} from "./_URI";
import axiosInstance from "../utils/axiosInstance";

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

export const updateCalendar = async (no, newName) => {
  try {
    const response = await axios.put(
      `${CALENDAR_UPDATE_URI}/${no}/${newName}`,
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteCalendar = async (no) => {
  try {
    const response = await axios.delete(`${CALENDAR_DELETE_URI}/${no}`, {
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

// 일정 추가
export const insertSchedule = async (schedule) => {
  console.log("55555555555" + JSON.stringify(schedule));
  try {
    // JSON 데이터로 전송
    const response = await axios.post(SCHEDULE_INSERT_URI, schedule, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    console.log("schedule Created Successfully:", response.data);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error submitting schedule:", error);
    console.error(
      "Error submitting schedule:",
      error.response?.data || error.message
    );
  }
};

// 부서원 조회
export const getUser = async (department) => {
  console.log("11111111111111" + department);
  try {
    const response = await axiosInstance.get(
      `${SCHEDULE_SELECTDEPART_URI}/${department}`,
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      }
    );
    console.log("444444444" + response.data);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};
