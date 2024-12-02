import axios from "axios";
import axiosInstance from "./../utils/axiosInstance";
import {
  USER_ADMIN_CREATE_URI,
  USER_INVITE_SEND_EMAIL_URI,
  USER_LOGIN_URI,
  USER_REFRESH_URI,
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

// 유저 로그인
export const loginUser = async (uid, password) => {
  try {
    console.log("로그인 요청");
    const response = await axios.post(
      USER_LOGIN_URI,
      {
        uid,
        password,
      },
      { withCredentials: true }
    ); // 쿠키 허용
    console.log("로그인 응답: ", response.data);

    // accessToken 반환
    return response.data; // { accessToken: "..." }
  } catch (error) {
    console.error("로그인 요청 중 오류:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "로그인 요청에 실패했습니다."
    );
  }
};

// 리프레시 토큰
export const refreshAccessToken = async () => {
  try {
    console.log("리프레시 요청 들어오나?");
    const response = await axios.post(USER_REFRESH_URI, null, {
      withCredentials: true, // 리프레시 토큰은 HTTP-Only Secure Cookie에 저장
    });

    const newAccessToken = response.data.newAccessToken;
    localStorage.setItem("authToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw new Error("토큰 갱신에 실패했습니다.");
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
export const addUser = async (userData) => {
  console.log("유저 insert 요청 전송");
  try {
    const response = await axios.post(USER_ADMIN_CREATE_URI, userData);

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
