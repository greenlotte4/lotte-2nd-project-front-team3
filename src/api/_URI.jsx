const SERVER_HOST = "http://localhost:8080";
const API_SERVER_HOST = "http://localhost:8080/api";

// user
export const USER_URI = `${SERVER_HOST}/user`;
export const USER_LOGIN_URI = `${SERVER_HOST}/user/login`;

// email
export const USER_SEND_EMAIL_URI = `${API_SERVER_HOST}/email/send`; // 이메일 발송
export const USER_VERIFY_EMAIL_URI = `${API_SERVER_HOST}/email/verify`; // 인증 요청
export const USER_VERIFY_CHECK_EMAIL_URI = `${API_SERVER_HOST}/email/check-verification`; // 인증 요청
