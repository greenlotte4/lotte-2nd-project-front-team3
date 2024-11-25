import { createBrowserRouter } from "react-router-dom";
import LendingMainPage from "../pages/Lending/LendingMainPage";
import MainPage from "./../pages/Main/MainPage";
import LoginPage from "../pages/Member/LoginPage";
import RegisterPage from "../pages/Member/RegisterPage";
import TermsPage from "../pages/Member/TermsPage";
import PagingPage from "./../pages/Main/Paging/pagingPage";
import ChattingPage from "./../pages/Main/chatting/chattingPage";
import DrivePage from "../pages/Main/drive/drivePage";
import ProjectPage from "../pages/Main/project/projectPage";
import { lazy, Suspense } from "react";

// 해당 컴포넌트가 필요할때 로딩 되도록 lazy import 처리
const ProjectMainPage = lazy(() =>
  import("../pages/Main/project/projectMainPage")
);
const ProjectViewPage = lazy(() =>
  import("../pages/Main/project/projectViewPage")
);

const router = createBrowserRouter([
  // 랜딩 페이지
  { path: "/", element: <LendingMainPage /> }, // 랜딩 메인

  // 유저 페이지
  { path: "/login", element: <LoginPage /> }, // 로그인
  { path: "/register", element: <RegisterPage /> }, // 회원가입
  { path: "/terms", element: <TermsPage /> }, // 회원가입

  // 메인 페이지 (Antwork)
  { path: "/antwork", element: <MainPage /> }, // Antwork 메인
  { path: "/antWork/page", element: <PagingPage /> }, // Antwork 페이지
  { path: "/antWork/chatting", element: <ChattingPage /> }, // Antwork 페이지
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
]);
// 라우터 내보내기
export default router;
