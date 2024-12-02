import axios from "axios";

const API_SERVER_HOST = import.meta.env.VITE_API_SERVER_HOST;
import { getAccessToken } from "./auth";
import { refreshAccessToken } from "./../api/userAPI";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_SERVER_HOST,
  timeout: 5000, // 요청 타임아웃 설정
  withCredentials: true, // 쿠키 포함 요청
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // 로컬/세션 스토리지에서 토큰 가져오기
    if (token) {
      console.log("Access Token 포함:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 재시도를 방지
      try {
        console.log("401 Unauthorized 발생. 리프레시 토큰 사용.");
        const newAccessToken = await refreshAccessToken();
        console.log("새로운 Access Token:", newAccessToken);

        // 갱신된 토큰으로 헤더 업데이트
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // 요청 재시도
      } catch (refreshError) {
        console.error("리프레시 토큰 갱신 실패:", refreshError);
        // 새 토큰 갱신 실패 시 로그아웃 처리 또는 사용자 통지
        throw refreshError;
      }
    }

    console.error("응답 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
