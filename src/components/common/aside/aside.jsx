/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import ProjectAside from "./projectAside";
import PageAside from "./pageAside";
import BoardAside from "./boardAside";
import DriveAside from "./driveAside";
import ChattingAside from "./chattingAside";
import CalendarAside from "./calendarAside";
import AdminAside from "./adminAside";

{
  /*
    날짜 : 2024/11/25(월)
    생성자 : 황수빈
    내용 : aside.jsx - 주소값에 따라 asdie 바뀌도록 구현

    수정 내역 : 
    2024/11/25 - 김민희 : 토글 메뉴 컴포넌트화를 위해 
    2024/11/26 - 황수빈 : AdminAside 추가
  */
}

export default function Aside({ asideVisible }) {
  const location = useLocation();

  //http://localhost:5137/anwork/_______ 여기 주소값을 찾음
  const basePath = "/antwork"; // `/antwork`제외
  const relativePath = location.pathname.replace(basePath, "");
  const mainPath = relativePath.split("/")[1] || "";

  return (
    <>
      {mainPath === "" && (
        <aside className={`sidebar ${!asideVisible ? "hidden" : ""}`}>
          <div className="logo">
            <span className="sub-title">antwork Home</span>
            <button className="image-button-css" aria-label="등록"></button>
            <span className="title">Home</span>
          </div>
          <ul className="lnb">
            <li className="lnb-item">
              <div className="lnb-header">
                <a className="main-cate">여기 뭐넣을지 고민</a>
              </div>
            </li>
          </ul>
        </aside>
      )}
      {mainPath === "page" && <PageAside asideVisible={asideVisible} />}
      {mainPath === "project" && <ProjectAside asideVisible={asideVisible} />}
      {mainPath === "board" && <BoardAside asideVisible={asideVisible} />}
      {mainPath === "drive" && <DriveAside asideVisible={asideVisible} />}
      {mainPath === "chatting" && <ChattingAside asideVisible={asideVisible} />}
      {mainPath === "calendar" && <CalendarAside asideVisible={asideVisible} />}
      {mainPath === "admin" && <AdminAside asideVisible={asideVisible} />}
    </>
  );
}
