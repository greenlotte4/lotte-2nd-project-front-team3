import axios from "axios";
import useAuthStore from "../store/AuthStore";
import axiosInstance from "./../utils/axiosInstance";
import {
  USER_ADMIN_CREATE_URI,
  USER_CHECK_DUPLICATE_ID_URI,
  USER_DETAILS_URI,
  USER_GET_ALL_URI,
  USER_INVITE_SEND_EMAIL_URI,
  USER_INVITE_URI,
  USER_INVITE_VERIFY_URI,
  USER_LIST_URI,
  USER_LOGIN_URI,
  USER_LOGOUT_URI,
  USER_REFRESH_URI,
  USER_REGISTER_URI,
  USER_SEND_EMAIL_URI,
  USER_VERIFY_CHECK_EMAIL_URI,
  USER_VERIFY_EMAIL_URI,
} from "./_URI";

// 유저 회원가입
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(USER_REGISTER_URI, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 자동 처리
      },
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
    );
  }
};

// 유저 로그인
export const loginUser = async (uid, password) => {
  try {
    console.log("로그인 요청");
    const response = await axios.post(
      USER_LOGIN_URI,
      { uid, password },
      { withCredentials: true } // 쿠키 허용
    );
    const accessToken = response.data.data;
    console.log("로그인 응답: ", accessToken);

    // Zustand 상태 저장소에 accessToken 저장
    useAuthStore.getState().setAccessToken(accessToken);

    return accessToken; // { accessToken: "..." }
  } catch (error) {
    console.error("로그인 요청 중 오류:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "로그인 요청에 실패했습니다."
    );
  }
};

// 유저 UID로 유저 조회
export const getUserByUid = async (uid) => {
  try {
    const response = await axios.get(`${USER_DETAILS_URI}/${uid}`);
    return response.data; // 서버에서 받은 유저 데이터 반환
  } catch (error) {
    console.error(
      `유저 조회 실패 (UID: ${uid}):`,
      error.response || error.message
    );
    throw new Error(
      error.response?.data?.message ||
      "유저 정보를 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 유저 리스트 조회 (회사별)
export const selectMembers = async (company, page = 1, size = 20) => {
  try {
    const response = await axios.get(USER_LIST_URI, {
      params: { company, page, size },
    });
    return response.data;
  } catch (error) {
    console.error("멤버 리스트 가져오기 실패:", error);
    throw error;
  }
};

// 리프레시 토큰 검증
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(USER_REFRESH_URI, null, {
      withCredentials: true, // HTTP-Only 쿠키로 갱신
    });
    console.log("api? 토큰 " + response.data.data);
    return response.data.data; // 새로운 Access Token 반환
  } catch (error) {
    console.error("리프레시 토큰 갱신 실패:", error);
    throw new Error("리프레시 토큰 갱신에 실패했습니다.");
  }
};

// 토큰 초기화
export const clearAuthToken = () => {
  useAuthStore.getState().clearAccessToken();
};

// 유저 로그아웃
export const logoutUser = async () => {
  try {
    // 서버에 로그아웃 요청 (쿠키 삭제)
    await axios.post(USER_LOGOUT_URI, null, { withCredentials: true });

    // Zustand에서 Access Token 삭제
    useAuthStore.getState().clearAccessToken();
  } catch (error) {
    console.error("로그아웃 요청 실패:", error.response || error.message);
    throw new Error("로그아웃 요청에 실패했습니다.");
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

// 초대 인증 확인 (회원)
export const verifyInviteToken = async (token) => {
  try {
    console.log("토큰" + token);
    const response = await axios.get(
      `${USER_INVITE_VERIFY_URI}?token=${token}`
    );
    return response.data.data; // 사용자 정보 반환
  } catch (error) {
    console.error("토큰 검증 실패:", error.response?.data || error.message);
    throw new Error("유효하지 않은 초대 토큰입니다.");
  }
};

// 아이디 중복 확인
export const checkDuplicateId = async (uid) => {
  try {
    console.log("전달된 UID:", uid);
    // POST 요청을 통해 uid를 JSON 객체로 전달
    const response = await axios.post(
      USER_CHECK_DUPLICATE_ID_URI,
      { uid }, // JSON 객체로 전달
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("아이디 중복 확인 응답:", response.data);
    return response.data; // 필요한 데이터만 반환
  } catch (error) {
    console.error("아이디 중복 확인 실패:", error);
    throw error; // 에러를 호출한 쪽으로 전달
  }
};

// 이메일 인증 확인 (관리자)
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

// 관리자 이메일 인증
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

// 초기 관리자 멤버 추가
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

// 회원 초대 API 호출 함수
export const inviteUser = async (userData) => {
  try {
    console.log("초대 요청 전송");
    console.log("롤" + userData.role);
    const response = await axiosInstance.post(USER_INVITE_URI, userData);

    if (response.data.success) {
      console.log("초대 성공:", response.data);
      return response.data;
    } else {
      throw new Error(
        response.data.message || "초대 요청 처리에 실패했습니다."
      );
    }
  } catch (error) {
    console.error("초대 요청 실패:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "초대 요청 중 문제가 발생했습니다."
    );
  }
};


export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get(USER_GET_ALL_URI);
    return response.data;
  } catch (error) {
    console.error("유저 가져오기 요청 실패:", error)
    throw error;
  }
};
