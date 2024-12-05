const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const API_SERVER_HOST = import.meta.env.VITE_API_SERVER_HOST;

// department
export const DEPARTMENT_INSERT_URI = `${API_SERVER_HOST}/department/insert`; // 부서 생성
export const DEPARTMENT_SELECT_URI = `${API_SERVER_HOST}/department/byCompany`; // 회사별 부서 조회

// user
export const USER_URI = `${SERVER_HOST}/user`;
export const USER_REGISTER_URI = `${API_SERVER_HOST}/user/register`; // 유저 회원가입
export const USER_LOGIN_URI = `${API_SERVER_HOST}/user/login`; // 유저 로그인
export const USER_LOGOUT_URI = `${API_SERVER_HOST}/user/logout`; // 유저 로그아웃
export const USER_LIST_URI = `${API_SERVER_HOST}/user/list`; // 유저 로그아웃
export const USER_REFRESH_URI = `${API_SERVER_HOST}/user/refresh`; // 리프레시 토큰 검증
export const USER_ADMIN_CREATE_URI = `${API_SERVER_HOST}/user/create`; // 초기 관리자 유저 INSERT
export const USER_INVITE_URI = `${API_SERVER_HOST}/user/invite`; // 회원 초대
export const USER_INVITE_VERIFY_URI = `${API_SERVER_HOST}/user/verify`; // 회원 초대 토큰 검증
export const USER_CHECK_DUPLICATE_ID_URI = `${API_SERVER_HOST}/user/checkduplicateId`; // 아이디 중복확인

// attendance
export const USER_CHECK_IN_URI = `${API_SERVER_HOST}/attendance/check-in`; // 출근 처리
export const USER_CHECK_OUT_URI = `${API_SERVER_HOST}/attendance/check-out`; // 퇴근 처리
export const USER_CHANGE_STATUS_URI = `${API_SERVER_HOST}/attendance/update-status`; // 상태업데이트 처리

// email
export const USER_SEND_EMAIL_URI = `${API_SERVER_HOST}/email/send`; // 이메일 발송
export const USER_VERIFY_EMAIL_URI = `${API_SERVER_HOST}/email/verify`; // 인증 처리
export const USER_VERIFY_CHECK_EMAIL_URI = `${API_SERVER_HOST}/email/check-verification`; // 인증 요청
export const USER_INVITE_SEND_EMAIL_URI = `${API_SERVER_HOST}/email/invite`; // 이메일 발송

// company
export const COMPANY_INSERT_URI = `${API_SERVER_HOST}/company/insert`; // 회사 insert 

// project
export const PROJECT_ADD_URI = `${API_SERVER_HOST}/project/add`; // 프로젝트 추가
export const PROJECT_LIST_URI = `${API_SERVER_HOST}/project/list`; // 프로젝트 조회
export const PROJECT_DETAIL_URI = `${API_SERVER_HOST}/project/view`; // 프로젝트 상세
export const PROJECT_STATE_INSERT_URI = `${API_SERVER_HOST}/project/state/insert`; // 프로젝트 상태 추가
export const PROJECT_STATE_SELECT_URI = `${API_SERVER_HOST}/project/state/select`; // 프로젝트 상태 조회
export const PROJECT_TASK_INSERT_URI = `${API_SERVER_HOST}/project/task/insert`; // 프로젝트 작업 추가
export const PROJECT_TASK_SELECT_URI = `${API_SERVER_HOST}/project/task/select`; // 프로젝트 작업 조회
export const PROJECT_TASK_UPDATE_URI = `${API_SERVER_HOST}/project/task/update`; // 프로젝트 작업 추가
export const PROJECT_TASK_DELETE_URI = `${API_SERVER_HOST}/project/task/delete`; // 프로젝트 작업 삭제

// drive
export const DRIVE_FOLDER_INSERT_URI = `${API_SERVER_HOST}/drive/folder/insert`; // 드라이브 폴더 넣기
export const DRIVE_FILES_INSERT_URI = `${API_SERVER_HOST}/drive/files/insert`; // 드라이브 파일 넣기(폴더없이)
export const MY_DRIVE_URI = `${API_SERVER_HOST}/drive/folder/myDriveView`; // 마이드라이브 전체보기
export const MY_DRIVE_SELECT_URI = `${API_SERVER_HOST}/drive/folder/myDriveSelectView`; //마이드라이브 선택보기


// page
export const PAGE_FETCH_URI = `${API_SERVER_HOST}/page`; // 페이지 조회
export const PAGE_SAVE_URI = `${API_SERVER_HOST}/page/save`; // 페이지 저장
export const PAGE_IMAGE_UPLOAD_URI = `${API_SERVER_HOST}/page/upload`; // 이미지 업로드
export const PAGE_DELETE_URI = `${API_SERVER_HOST}/page`; // 페이지 삭제

// chatting
// src/api/_URI.jsx
export const CHANNEL_URI = `${API_SERVER_HOST}/chatting/channel`;  // 채널 관련 URI
export const CHANNEL_CREATE_URI = `${API_SERVER_HOST}/chatting/channel`; // 채널 생성/추가
export const CHANNEL_LIST_URI = `${API_SERVER_HOST}/chatting/channel`; // 채널 생성/추가

export const DM_SEND_MESSAGE_URI = `${API_SERVER_HOST}/chatting/dm`; // 디엠 메시지 보내기
export const DM_GET_MESSAGES_URI = (dmId) => `${API_SERVER_HOST}/chatting/dm/${dmId}/messages`; // 디엠 메시지 조회

// 추가할 페이지 관련 URI
export const PAGE_LIST_UID_URI = `${API_SERVER_HOST}/page/list/uid`; // 개인 페이지 목록
export const PAGE_LIST_MODIFIED_URI = `${API_SERVER_HOST}/page/list/modified`; // 최근 수정된 페이지 목록
export const PAGE_LIST_DELETED_URI = `${API_SERVER_HOST}/page/list/deleted`; // 삭제된 페이지 목록
export const PAGE_RESTORE_URI = `${API_SERVER_HOST}/page/:id/restore`; // 페이지 복구
export const PAGE_SOFT_DELETE_URI = `${API_SERVER_HOST}/page/:id/soft`; // 소프트 삭제
export const PAGE_HARD_DELETE_URI = `${API_SERVER_HOST}/page/:id/hard`; // 하드 삭제

// calendar
export const CALENDAR_INSERT_URI = `${API_SERVER_HOST}/calendar/insert`; // 새 캘린더 추가하기
export const CALENDAR_SELECT_URI = `${API_SERVER_HOST}/calendar/select`; // 캘린더 조회하기
export const CALENDAR_UPDATE_URI = `${API_SERVER_HOST}/calendar/update`; // 캘린더 수정하기
export const CALENDAR_DELETE_URI = `${API_SERVER_HOST}/calendar/delete`; // 캘린더 삭제하기
export const SCHEDULE_INSERT_URI = `${API_SERVER_HOST}/schedule/insert`; // 새 일정 추가하기
export const SCHEDULE_SELECT_URI = `${API_SERVER_HOST}/schedule/select`; // 일정 조회하기
export const SCHEDULE_UPDATE_URI = `${API_SERVER_HOST}/schedule/update`; // 일정 수정하기
export const SCHEDULE_DELETE_URI = `${API_SERVER_HOST}/schedule/delete`; // 일정 삭제하기
export const SCHEDULE_SELECTDEPART_URI = `${API_SERVER_HOST}/schedule/selectDepart`; // 부서원 리스트 조회

// board
export const BOARD_WRITE_URI = `${API_SERVER_HOST}/board/write`; // 게시판 글쓰기
export const BOARD_LIST_URI = `${API_SERVER_HOST}/board/list`; // 게시판 리스트 (글목록) 
export const BOARD_VIEW_URI = `${API_SERVER_HOST}/board/view`; // 게시판 뷰 (글보기)
export const BOARD_UPDATE_URI = `${API_SERVER_HOST}/board/modify`; // 게시판 글 수정
export const BOARD_MAIN_URI = `${API_SERVER_HOST}/board`; // 게시판 메인
console.log('API_SERVER_HOST:', import.meta.env.VITE_API_SERVER_HOST);