import axios from "axios";
import {
  CALENDAR_DELETE_URI,
  CALENDAR_INSERT_URI,
  CALENDAR_SELECT_URI,
  CALENDAR_UPDATE_URI,
  SCHEDULE_DELETE_URI,
  SCHEDULE_DETAIL_URI,
  SCHEDULE_INSERT_URI,
  SCHEDULE_SELECT_URI,
  SCHEDULE_SELECTDEPART_URI,
  SCHEDULE_UPDATE_URI,
  SCHEDULE_UPDATEDETAIL_URI,
} from "./_URI";
import axiosInstance from "../utils/axiosInstance";

// 캘린더 insert
export const insertCalendar = async (calendar) => {
  try {
    // JSON 데이터로 전송
    const response = await axiosInstance.post(CALENDAR_INSERT_URI, calendar, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error submitting calendar:", error);
    throw error; // 에러를 상위 호출로 전달
  }
};

// 캘린더 select
export const getCalendar = async (uid) => {
  try {
    const response = await axiosInstance.get(`${CALENDAR_SELECT_URI}/${uid}`, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 캘린더 update
export const updateCalendar = async (no, newName) => {
  try {
    const response = await axiosInstance.put(
      `${CALENDAR_UPDATE_URI}/${no}/${newName}`,
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 캘린더 delete
export const deleteCalendar = async (no) => {
  try {
    const response = await axiosInstance.delete(
      `${CALENDAR_DELETE_URI}/${no}`,
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 일정 insert
export const insertSchedule = async (schedule) => {
  console.log("55555555555" + JSON.stringify(schedule));
  try {
    // JSON 데이터로 전송
    const response = await axiosInstance.post(SCHEDULE_INSERT_URI, schedule, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error submitting schedule:", error);
    console.error(
      "Error submitting schedule:",
      error.response?.data || error.message
    );
  }
};

// 부서원 select
export const getUser = async (department) => {
  try {
    const response = await axiosInstance.get(
      `${SCHEDULE_SELECTDEPART_URI}/${department}`,
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

// 스케줄 select
export const getSchedule = async (uid) => {
  try {
    const response = await axiosInstance.get(`${SCHEDULE_SELECT_URI}/${uid}`, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 스케줄 select
export const getScheduleDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`${SCHEDULE_DETAIL_URI}/${id}`, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 일정 update
export const updateScheduleDrag = async (no, start, end) => {
  try {
    const response = await axiosInstance.put(
      `${SCHEDULE_UPDATE_URI}/${no}/${start}/${end}`,
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 일정 상세update
export const updateSchedule = async (formData) => {
  try {
    const response = await axios.put(SCHEDULE_UPDATEDETAIL_URI, formData, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 일정 delete
export const deleteSchedule = async (no) => {
  try {
    const response = await axiosInstance.delete(
      `${SCHEDULE_DELETE_URI}/${no}`,
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 전송
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
