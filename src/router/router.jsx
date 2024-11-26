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
import BoardPage from "../pages/Main/board/\bboardPage";

const router = createBrowserRouter([
  // 랜딩 페이지
  { path: "/", element: <LendingMainPage /> }, // 랜딩 메인

  // 유저 페이지
  { path: "/login", element: <LoginPage /> }, // 로그인
  { path: "/register", element: <RegisterPage /> }, // 회원가입
  { path: "/terms", element: <TermsPage /> }, // 회원가입

  // 메인 페이지 (antwork)
  { path: "/antwork", element: <MainPage /> }, // antwork 메인
  { path: "/antwork/page", element: <PagingPage /> }, // antwork 페이지
  { path: "/antwork/chatting", element: <ChattingPage /> }, // antwork 페이지
  { path: "/antwork/drive", element: <DrivePage /> }, // antwork 페이지
  { path: "/antwork/project", element: <ProjectPage /> }, // antwork 페이지
  { path: "/antwork/board", element: <BoardPage /> }, // antwork 게시판 페이지
]);
// 라우터 내보내기
export default router;
