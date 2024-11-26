import { createBrowserRouter } from "react-router-dom";
import LendingMainPage from "../pages/Lending/LendingMainPage";
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
import PagingWritePage from "../pages/Main/Paging/pagingWrite";
import BoardPage from "../pages/Main/board/boardPage";
import AdminPage from "../pages/Main/Admin/adminPage";
import AdminMemberPage from "../pages/Main/Admin/adminMemberPage";
import AdminLoginPage from "../pages/Main/Admin/LoginPage";
{
  /*
  작업 이력
  - 2024/11/26(화) 황수빈 - adminPage 추가
  
  
  */
}
// 해당 컴포넌트가 필요할때 로딩 되도록 lazy import 처리
const ProjectMainPage = lazy(() =>
  import("../pages/Main/project/projectMainPage")
);
const ProjectViewPage = lazy(() =>
  import("../pages/Main/project/projectViewPage")
);

import ScheduleListPage from "../pages/Main/calendar/ScheduleListPage";
import ProfilePage from "../pages/Main/profile/profilePage";

const router = createBrowserRouter([
  // 랜딩 페이지
  { path: "/", element: <LendingMainPage /> }, // 랜딩 메인

  // 유저 페이지
  { path: "/login", element: <LoginPage /> }, // 로그인
  { path: "/register", element: <RegisterPage /> }, // 회원가입
  { path: "/terms", element: <TermsPage /> }, // 회원가입

  // 관리자 페이지
  { path: "/admin/login", element: <AdminLoginPage /> }, // 관리자 로그인
  { path: "/antwork/admin", element: <AdminPage /> }, // 2024/11/26(화) 황수빈 - AdminPage 추가
  { path: "/antwork/admin/member", element: <AdminMemberPage /> }, // 2024/11/26(화) 황수빈 - AdminPage 추가

  // 메인 페이지 (Antwork)
  { path: "/antwork", element: <MainPage /> }, // Antwork 메인
  { path: "/antwork/profile", element: <ProfilePage /> }, // Antwork 메인

  { path: "/antWork/page", element: <PagingPage /> }, // Antwork 페이지
  { path: "/antWork/chatting", element: <ChattingPage /> }, // Antwork 채팅
  {
    path: "/antWork/project/main",
    element: (
      <Suspense>
        <ProjectMainPage />
      </Suspense>
    ),
  },
  {
    path: "/antWork/project/view",
    element: (
      <Suspense>
        <ProjectViewPage />
      </Suspense>
    ),
  },
  { path: "/antwork/drive", element: <DrivePage /> }, // antwork 페이지
  { path: "/antWork/calendar", element: <CalendarPage /> }, // Antwork 캘린더 페이지
  { path: "/antWork/calendar/ScheduleList", element: <ScheduleListPage /> }, // Antwork 캘린더 일정 페이지

  // 메인 페이지 (antwork)
  { path: "/antwork", element: <MainPage /> }, // antwork 메인
  { path: "/antwork/page", element: <PagingPage /> }, // antwork 페이지
  { path: "/antwork/page/view", element: <PagingViewPage /> }, // 2024/11/25(월) 황수빈 - Page View 추가
  { path: "/antwork/page/write", element: <PagingWritePage /> }, // 2024/11/25(월) 황수빈 - Page Writer 추가
  { path: "/antwork/chatting", element: <ChattingPage /> }, // antwork 페이지
  { path: "/antwork/drive", element: <DrivePage /> }, // antwork 페이지
  { path: "/antwork/board", element: <BoardPage /> }, // antwork 게시판
]);
// 라우터 내보내기
export default router;
