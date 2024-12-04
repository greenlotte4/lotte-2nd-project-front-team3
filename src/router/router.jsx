import { createBrowserRouter } from "react-router-dom";

import LandingMainPage from "../pages/Landing/LandingMainPage";

import MainPage from "./../pages/Main/MainPage";

import LoginPage from "../pages/Member/LoginPage";
import RegisterPage from "../pages/Member/RegisterPage";
import TermsPage from "../pages/Member/TermsPage";

import ChattingPage from "./../pages/Main/chatting/chattingPage";
import DrivePage from "../pages/Main/drive/drivePage";
import CalendarPage from "../pages/Main/calendar/CalendarPage";
import PagingPage from "./../pages/Main/Paging/pagingPage";
import PagingWritePage from "../pages/Main/Paging/pagingWritePage";
import BoardPage from "../pages/Main/board/boardPage";
import BoardViewPage from "../pages/Main/board/boardViewPage";
import BoardWritePage from "../pages/Main/board/boardWritePage";
import BoardListPage from "../pages/Main/board/boardListPage";
import BoardDataRoomPage from "../pages/Main/board/boardDataRoomPage";
import BoardDataViewPage from "../pages/Main/board/boardDataViewPage";
import AdminPage from "../pages/Main/Admin/adminPage";
import AdminMemberPage from "../pages/Main/Admin/adminMemberPage";
import AdminLoginPage from "../pages/Main/Admin/LoginPage";
import SettingMainPage from "../pages/Main/setting/settingMainPage";
import SettingMyinfoPage from "../pages/Main/setting/settingMyinfoPage";
import DriveSharePage from "./../pages/Main/drive/driveSharePage";
import ProjectMainPage from "../pages/Main/project/projectMainPage";
import ProjectViewPage from "../pages/Main/project/projectViewPage";

{
  /*
  작업 이력
  - 2024/11/26(화) 황수빈 - adminPage 추가, settingPage 추가
  - 2024/11/27(수) 김민희 - board -> List, Write, ViewPage 추가
  */
}

import LandingSupportPage from "../pages/Landing/LandingSupportPage";
import LandingFunctionPage from "../pages/Landing/LandingFunctionPage";

import DriveRecylcePage from "../pages/Main/drive/driveRecyclePage";
import LandingPayPage from "./../pages/Landing/LandingPayPage";
import CompletePage from "./../pages/Landing/CompletePage";
import EmailVerificationPage from "./../pages/Landing/EmailVerificationPage";
import SchedulePage from "../pages/Main/calendar/SchedulePage";
import AdminDepartmentPage from "../pages/Main/Admin/adminDepartmentPage";

const router = createBrowserRouter([
  // 랜딩 페이지
  { path: "/", element: <LandingMainPage /> }, // 2024/11/25(월) 최준혁 - LendingMainPage 추가
  { path: "/pay", element: <LandingPayPage /> }, // 2024/11/27(수) 최준혁 - LendingPayPage 추가추가
  { path: "/support", element: <LandingSupportPage /> }, // 2024/11/29(금) 강은경 - LendingSupportPage 추가
  { path: "/function", element: <LandingFunctionPage /> }, // 2024/11/29(금) 강은경 - LandingFunctionPage 추가
  { path: "/complete", element: <CompletePage /> }, // 2024/11/27(수) 최준혁 - LendingPayPage 추가
  { path: "/email-verification", element: <EmailVerificationPage /> }, // 2024/11/27(수) 최준혁 - LendingPayPage 추가

  // 유저 페이지
  { path: "/login", element: <LoginPage /> }, // 로그인
  { path: "/register", element: <RegisterPage /> }, // 회원가입
  { path: "/terms", element: <TermsPage /> }, // 회원가입

  // 관리자 페이지
  { path: "/admin/login", element: <AdminLoginPage /> }, // 2024/11/26(화) 최준혁 - AdminLoginPage 추가
  { path: "/antwork/admin", element: <AdminPage /> }, // 2024/11/26(화) 황수빈 - AdminPage 추가
  { path: "/antwork/admin/member", element: <AdminMemberPage /> }, // 2024/11/26(화) 황수빈 - AdminPage 추가
  { path: "/antwork/admin/department", element: <AdminDepartmentPage /> }, // 2024/12/03(화) 최준혁 - AdminDepartmentPage 추가

  // 메인 페이지 (Antwork)
  { path: "/antwork", element: <MainPage /> }, // Antwork 메인
  { path: "/antWork/page", element: <PagingPage /> }, // Antwork 페이지
  { path: "/antWork/chatting", element: <ChattingPage /> }, // Antwork 채팅
  { path: "/antwork/setting/myinfo", element: <SettingMyinfoPage /> }, // Antwork 설정
  { path: "/antwork/setting", element: <SettingMainPage /> }, // Antwork 설정

  { path: "/antwork/drive", element: <DrivePage /> }, // antwork 페이지
  { path: "/antwork/calendar", element: <CalendarPage /> }, // Antwork 캘린더 페이지 2024/11/26(화) 하정훈 - calendar 추가
  { path: "/antwork/schedule", element: <SchedulePage /> }, // Antwork 캘린더 페이지 2024/11/26(화) 하정훈 - calendar 추가

  // 메인 페이지 (antwork)
  { path: "/antwork", element: <MainPage /> }, // antwork 메인
  { path: "/antwork/page", element: <PagingPage /> }, // antwork 페이지
  { path: "/antwork/page/write", element: <PagingWritePage /> }, // 2024/11/25(월) 황수빈 - Page Writer 추가
  { path: "/antwork/chatting", element: <ChattingPage /> }, // antwork 페이지
  { path: "/antwork/drive", element: <DrivePage /> }, // antwork 페이지
  { path: "/antwork/drive/folder/:driveFolderId", element: <DrivePage /> }, // 조건을 통한 dirvePage
  { path: "/antwork/drive/share", element: <DriveSharePage /> }, // antwork 페이지
  { path: "/antwork/drive/recycle", element: <DriveRecylcePage /> }, // antwork 페이지
  { path: "/antwork/board", element: <BoardPage /> }, //
  { path: "/antwork/board/list", element: <BoardListPage /> }, // 2024/11/27(수) 김민희 - Board List 추가
  { path: "/antwork/board/write", element: <BoardWritePage /> }, // 2024/11/27(수) 김민희 - Board Write 추가
  { path: "/antwork/board/view", element: <BoardViewPage /> }, // 2024/11/27(수) 김민희 - Board View 추가
  { path: "/antwork/board/boardDataRoom", element: <BoardDataRoomPage /> }, // 2024/11/29(금) 김민희 - Board Data Room 추가
  { path: "/antwork/board/boardDataView", element: <BoardDataViewPage /> }, // 2024/11/29(금) 김민희 - Board Data View 추가
  { path: "/antwork/project/main", element: <ProjectMainPage /> }, // 2024/11/27(월) 강은경 - Project main 추가
  { path: "/antwork/project/view", element: <ProjectViewPage /> }, // 2024/11/27(월) 강은경 - Project view 추가
]);
// 라우터 내보내기
export default router;
