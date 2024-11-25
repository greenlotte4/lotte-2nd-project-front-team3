/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

{
  /*
    날짜 : 2024/11/25(월)
    생성자 : 황수빈
    내용 : aside.jsx - 주소값에 따라 asdie 바뀌도록 구현

    수정 내역 : 
    예시) 2024/12/01 - 강은경 : ~~~ 를 위해 ~~~ 추가
    
  */
}

export default function Aside({ asideVisible }) {
  const location = useLocation();

  // 주소값에서 param 찾기
  const basePath = "/antwork"; // `/antwork`를 무시
  const relativePath = location.pathname.replace(basePath, "");
  const mainPath = relativePath.split("/")[1] || ""; // 첫 번째 경로 추출 (`page`, `project`, `drive` 등)

  const [toggles, setToggles] = useState({
    personalPages: true, // 개인 페이지 토글 상태
    sharedPages: true, // 개인 페이지 토글 상태
    ongoingProjects: true, // 진행중인 프로젝트 토글 상태
    completedProjects: true, // 완료된 프로젝트 토글 상태
  });

  const toggleSection = (section) => {
    setToggles((prev) => ({
      ...prev,
      [section]: !prev[section], // 클릭한 섹션만 상태 반전
    }));
  };

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
      {mainPath === "page" && (
        <aside
          className={`sidebar ${!asideVisible ? "hidden" : ""} table-cell`}
        >
          <div className="logo">
            <span className="sub-title">Shared Page</span>
            <button
              className="image-button-css !bg-[url('/images/ico/page_write_22_999999.svg')]"
              aria-label="등록"
            ></button>
            <span className="title">Page</span>
          </div>
          <ul className="lnb inline-grid">
            <li className="lnb-item">
              <div className="lnb-header !mb-[10px]">
                <img
                  src="/images/ico/page_home_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link to="/antwork/page" className="main-cate !text-[16px]">
                  홈
                </Link>
              </div>

              <div className="lnb-header !pb-[15px] border-b border-[#ddd]">
                <img
                  src="/images/ico/page_search_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <span className="main-cate !text-[16px] ">검색</span>
              </div>
            </li>

            <li className="lnb-item !mt-[15px] !h-[500px] border-b border-[#ddd]">
              {/* 개인 페이지 토글 */}
              <div
                className="lnb-header cursor-pointer "
                onClick={() => toggleSection("personalPages")}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                  개인 페이지{" "}
                  <img
                    src={
                      toggles.personalPages
                        ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.personalPages && (
                <ol>
                  <li>
                    <a href="#">🌹&nbsp;&nbsp;업무일지</a>
                  </li>
                  <li>
                    <a href="#">✔&nbsp;&nbsp;CheckList</a>
                  </li>
                  <li>
                    <a href="#">❓&nbsp;&nbsp;Question</a>
                  </li>
                  <li>
                    <a href="#">🎞 &nbsp;&nbsp;Movie review</a>
                  </li>
                  <li>
                    <a href="#">👗 &nbsp;&nbsp;Shopping List</a>
                  </li>
                </ol>
              )}

              {/* 개인 페이지 토글 */}
              <div
                className="lnb-header cursor-pointer "
                onClick={() => toggleSection("sharedPages")}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex !mt-[12px] ">
                  공유중인 페이지{" "}
                  <img
                    src={
                      toggles.sharedPages
                        ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.sharedPages && (
                <ol>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;OO병원 사이트맵</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;OO학교 사이트맵</a>
                  </li>
                </ol>
              )}
            </li>
            <li className="lnb-item">
              <div className="lnb-header !mb-[10px]">
                <img
                  src="/images/ico/page_template_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antwork/page"
                  className="main-cate !text-[16px] text-[#757575]"
                >
                  템플릿
                </Link>
              </div>

              <div className="lnb-header !mb-[10px]">
                <img
                  src="/images/ico/page_delete24_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antwork/page"
                  className="main-cate !text-[16px] text-[#757575]"
                >
                  휴지통
                </Link>
              </div>
              <div className="lnb-header !mb-[10px]">
                <img
                  src="/images/ico/page_setting_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antwork/page"
                  className="main-cate !text-[16px] text-[#757575]"
                >
                  설정
                </Link>
              </div>
            </li>
          </ul>
        </aside>
      )}

      {mainPath === "project" && (
        <aside className={`sidebar ${!asideVisible ? "hidden" : ""}`}>
          <div className="logo !border-b-0 !h-auto">
            <span className="sub-title">My Projects</span>
            <span className="title">Projects</span>
            <button
              className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 mt-6 h-14"
              style={{ backgroundColor: "#D9E8FF" }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-xl">New Project</span>
            </button>
          </div>
          <ul className="lnb inline-grid">
            <li className="lnb-item !h-auto">
              <div className="lnb-header !mb-[10px] pt-[15px] border-t border-[#ddd]">
                <img
                  src="/images/ico/page_home_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link to="/antwork/project" className="main-cate !text-[16px]">
                  홈
                </Link>
              </div>
            </li>

            <li className="lnb-item !mt-[15px] !h-[500px] border-b border-[#ddd]">
              {/* 개인 페이지 토글 */}
              <div
                className="lnb-header cursor-pointer "
                onClick={() => {
                  toggleSection("ongoingProjects");
                }}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex !mt-[7px] ">
                  진행중인 프로젝트{" "}
                  <img
                    src={
                      toggles.ongoingProjects
                        ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.ongoingProjects && (
                <ol>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;OO병원 작업일지</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;OO학교 작업일지</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;OO치과 작업일지</a>
                  </li>
                </ol>
              )}
              {/* 개인 페이지 토글 */}
              <div
                className="lnb-header cursor-pointer "
                onClick={() => {
                  toggleSection("completedProjects");
                }}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex !mt-7 ">
                  완료된 프로젝트{" "}
                  <img
                    src={
                      toggles.completedProjects
                        ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.completedProjects && (
                <ol>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;자바병원 작업일지</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;리액트학교 작업일지</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;CSS치과 작업일지</a>
                  </li>
                </ol>
              )}
            </li>

            <li className="lnb-item">
              <div className="lnb-header !mb-[10px]">
                <img
                  src="/images/ico/page_delete24_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antwork/project"
                  className="main-cate !text-[16px] text-[#757575]"
                >
                  휴지통
                </Link>
              </div>
              <div className="lnb-header !mb-[10px]">
                <img
                  src="/images/ico/page_setting_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antwork/project"
                  className="main-cate !text-[16px] text-[#757575]"
                >
                  설정
                </Link>
              </div>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
}
