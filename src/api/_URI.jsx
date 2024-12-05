const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const API_SERVER_HOST = import.meta.env.VITE_API_SERVER_HOST;

// user
export const USER_URI = `${SERVER_HOST}/user`;
export const USER_LOGIN_URI = `${API_SERVER_HOST}/user/login`; // 유저 로그인
export const USER_LOGOUT_URI = `${API_SERVER_HOST}/user/logout`; // 유저 로그아웃
export const USER_REFRESH_URI = `${API_SERVER_HOST}/user/refresh`; // 리프레시 토큰 검증
export const USER_ADMIN_CREATE_URI = `${API_SERVER_HOST}/user/create`; // 초기 관리자 유저 INSERT

// email
export const USER_SEND_EMAIL_URI = `${API_SERVER_HOST}/email/send`; // 이메일 발송
export const USER_VERIFY_EMAIL_URI = `${API_SERVER_HOST}/email/verify`; // 인증 처리
export const USER_VERIFY_CHECK_EMAIL_URI = `${API_SERVER_HOST}/email/check-verification`; // 인증 요청
export const USER_INVITE_SEND_EMAIL_URI = `${API_SERVER_HOST}/email/invite`; // 이메일 발송

// company
export const COMPANY_INSERT_URI = `${API_SERVER_HOST}/company/insert`; // 회사 insert

// project
export const PROJECT_ADD_URI = `${API_SERVER_HOST}/project/add`; // 프로젝트 추가

//drive
export const DRIVE_FOLDER_INSERT_URI = `${API_SERVER_HOST}/drive/folder/insert`; // 드라이브..테스트용..
export const MY_DRIVE_FOLDERS_URI = `${API_SERVER_HOST}/drive/folder/mydriveView`; // 드라이브..테스트용..

// page
export const PAGE_FETCH_URI = `${API_SERVER_HOST}/page`; // 페이지 조회
export const PAGE_SAVE_URI = `${API_SERVER_HOST}/page/save`; // 페이지 저장
export const PAGE_IMAGE_UPLOAD_URI = `${API_SERVER_HOST}/page/upload`; // 이미지 업로드
export const PAGE_DELETE_URI = `${API_SERVER_HOST}/page`; // 페이지 삭제

// chatting
export const CHANNEL_CREATE_URI = `${API_SERVER_HOST}/chatting/channel`; // 채널 생성/추가
export const CHANNEL_LIST_URI = `${API_SERVER_HOST}/chatting/channel`; // 채널 생성/추가

export const DM_SEND_MESSAGE_URI = `${API_SERVER_HOST}/chatting/dm`; // 디엠 메시지 보내기
export const DM_GET_MESSAGES_URI = (dmId) => `${API_SERVER_HOST}/chatting/dm/${dmId}/messages`; // 디엠 메시지 조회
