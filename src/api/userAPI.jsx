import axios from "axios";
import {
  USER_INVITE_SEND_EMAIL_URI,
  USER_REGISTER_URI,
  USER_SEND_EMAIL_URI,
  USER_URI,
  USER_VERIFY_CHECK_EMAIL_URI,
  USER_VERIFY_EMAIL_URI,
} from "./_URI";

export const postUser = async (data) => {
  try {
    const response = await axios.post(`${USER_URI}`, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 이메일 발송
export const sendUserEmail = async (data) => {
  try {
    const response = await axios.post(`${USER_SEND_EMAIL_URI}`, data);
    console.log("이메일 전송 성공:", response.data);
    return response.data;
  } catch (err) {
    console.error("이메일 전송 실패:", err);
  }
};

// 인증 요청
export const verifyUserEmail = async (token) => {
  try {
    const response = await axios.get(`${USER_VERIFY_EMAIL_URI}?token=${token}`);
    console.log("Email verification response:", response.data);
    return response;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};

// 인증 확인
export const verifyUserCheckEmail = async (token) => {
  try {
    const response = await axios.get(
      `${USER_VERIFY_CHECK_EMAIL_URI}?token=${token}`
    );
    console.log("Email verification response:", response.data);
    return response;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};

// 멤버 초대
export const verifyUserInviteEmail = async (email, companyName) => {
  try {
    const response = await axios.post(USER_INVITE_SEND_EMAIL_URI, {
      email,
      companyName,
    });

    console.log("Email verification response:", response.data);

    return response;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};

// 멤버 추가
/**
 * 사용자 추가 API
 * @param {Object} userData - 사용자 정보 객체
 * @returns {Promise} - API 호출 결과
 */
export const addUser = async (userData) => {
  try {
    const response = await axios.post(USER_REGISTER_URI, userData);

    if (response.data.success) {
      console.log("User added successfully:", response.data);
      return response.data;
    } else {
      throw new Error(
        response.data.message || "사용자 정보 저장에 실패했습니다."
      );
    }
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};
