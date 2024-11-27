import { createBrowserRouter } from "react-router-dom";
import LandingMainPage from "../pages/Landing/LandingMainPage";
import MainPage from "./../pages/Main/MainPage";
import LoginPage from "../pages/Member/LoginPage";
import RegisterPage from "../pages/Member/RegisterPage";
import TermsPage from "../pages/Member/TermsPage";

import ChattingPage from "./../pages/Main/chatting/chattingPage";
import DrivePage from "../pages/Main/drive/drivePage";
import CalendarPage from "../pages/Main/calendar/CalendarPage";
import { lazy, Suspense } from "react";
import PagingPage from "./../pages/Main/Paging/pagingPage";
import PagingViewPage from "../pages/Main/Paging/pagingViewPage";
import PagingWritePage from "../pages/Main/Paging/pagingWritePage";
import BoardPage from "../pages/Main/board/boardPage";
import BoardViewPage from "../pages/Main/board/boardViewPage";
import BoardWritePage from "../pages/Main/board/boardWritePage";
import BoardListPage from "../pages/Main/board/boardListPage";
import AdminPage from "../pages/Main/Admin/adminPage";
import AdminMemberPage from "../pages/Main/Admin/adminMemberPage";
import AdminLoginPage from "../pages/Main/Admin/LoginPage";
import SettingMainPage from "../pages/Main/setting/settingMainPage";
import SettingMyinfoPage from "../pages/Main/setting/settingMyinfoPage";

{
  /*
  작업 이력
  - 2024/11/26(화) 황수빈 - adminPage 추가, settingPage 추가
  - 2024/11/27(수) 김민희 - board -> List, Write, ViewPage 추가
  */
}

import LandingSupportPage from "../pages/Landing/LandingSupportPage";

// 해당 컴포넌트가 필요할때 로딩 되도록 lazy import 처리
const ProjectMainPage = lazy(() =>
  import("../pages/Main/project/projectMainPage")
);
const ProjectViewPage = lazy(() =>
  import("../pages/Main/project/projectViewPage")
);

import ScheduleListPage from "../pages/Main/calendar/ScheduleListPage";
import DriveSharePage from "../pages/Main/drive/driveSharePage";
import DriveRecylcePage from "../pages/Main/drive/driveRecyclePage";
import LandingPayPage from "./../pages/Landing/LandingPayPage";
import LandingFuctionPage from "../pages/Landing/LandingFuctionPage";

const router = createBrowserRouter([
  // 랜딩 페이지
  { path: "/", element: <LandingMainPage /> }, // 2024/11/25(월) 최준혁 - LandingMainPage 추가
  { path: "/pay", element: <LandingPayPage /> }, // 2024/11/27(수) 최준혁 - LandingPayPage 추가
  { path: "/support", element: <LandingSupportPage /> }, // 랜딩 지원
  { path: "/function", element: <LandingFuctionPage /> }, // 랜딩 기능

  // 유저 페이지
  { path: "/login", element: <LoginPage /> }, // 로그인
  { path: "/register", element: <RegisterPage /> }, // 회원가입
  { path: "/terms", element: <TermsPage /> }, // 회원가입

  // 관리자 페이지
  { path: "/admin/login", element: <AdminLoginPage /> }, // 2024/11/26(화) 최준혁 - AdminLoginPage 추가
  { path: "/antwork/admin", element: <AdminPage /> }, // 2024/11/26(화) 황수빈 - AdminPage 추가
  { path: "/antwork/admin/member", element: <AdminMemberPage /> }, // 2024/11/26(화) 황수빈 - AdminPage 추가

  // 메인 페이지 (Antwork)
  { path: "/antwork", element: <MainPage /> }, // Antwork 메인
  { path: "/antWork/page", element: <PagingPage /> }, // Antwork 페이지
  { path: "/antWork/chatting", element: <ChattingPage /> }, // Antwork 채팅
  { path: "/antwork/setting/myinfo", element: <SettingMyinfoPage /> }, // Antwork 설정
  { path: "/antwork/setting", element: <SettingMainPage /> }, // Antwork 설정

  { path: "/antwork/drive", element: <DrivePage /> }, // antwork 페이지
  { path: "/antwork/calendar", element: <CalendarPage /> }, // Antwork 캘린더 페이지
  { path: "/antWork/calendar/ScheduleList", element: <ScheduleListPage /> }, // Antwork 캘린더 일정 페이지

  // 메인 페이지 (antwork)
  { path: "/antwork", element: <MainPage /> }, // antwork 메인
  { path: "/antwork/page", element: <PagingPage /> }, // antwork 페이지
  { path: "/antwork/page/view", element: <PagingViewPage /> }, // 2024/11/25(월) 황수빈 - Page View 추가
  { path: "/antwork/page/write", element: <PagingWritePage /> }, // 2024/11/25(월) 황수빈 - Page Writer 추가
  { path: "/antwork/chatting", element: <ChattingPage /> }, // antwork 페이지
  { path: "/antwork/drive", element: <DrivePage /> }, // antwork 페이지
  { path: "/antwork/drive/share", element: <DriveSharePage /> }, // antwork 페이지
  { path: "/antwork/drive/recycle", element: <DriveRecylcePage /> }, // antwork 페이지
  { path: "/antwork/board", element: <BoardPage /> }, //
  { path: "/antwork/board/list", element: <BoardListPage /> }, // 2024/11/27(수) 김민희 - Board List 추가
  { path: "/antwork/board/write", element: <BoardWritePage /> }, // 2024/11/27(수) 김민희 - Board Write 추가
  { path: "/antwork/board/view", element: <BoardViewPage /> }, // 2024/11/27(수) 김민희 - Board View 추가
  { path: "/antwork/project/main", element: <ProjectMainPage /> }, // 2024/11/27(월) 강은경 - Project main 추가
  { path: "/antwork/project/view", element: <ProjectViewPage /> }, // 2024/11/27(월) 강은경 - Project view 추가
]);
// 라우터 내보내기
export default router;
