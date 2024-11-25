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
  const basePath = "/antWork"; // `/antWork`를 무시
  const relativePath = location.pathname.replace(basePath, "");
  const mainPath = relativePath.split("/")[1] || ""; // 첫 번째 경로 추출 (`page`, `project`, `drive` 등)

  // 토글 하위목록 보이도록 (2024/11/25 황수빈 추가 : page - 토글)
  const [showPersonalPages, setShowPersonalPages] = useState(true);

  const togglePersonalPages = () => {
    setShowPersonalPages((prev) => !prev);
  };

  return (
    <>
      {mainPath === "" && (
        <aside className={`sidebar ${!asideVisible ? "hidden" : ""}`}>
          <div className="logo">
            <span className="sub-title">AntWork Home</span>
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
              className="image-button-css !bg-[url('../../../public/images/ico/page_write_22_999999.svg')]"
              aria-label="등록"
            ></button>
            <span className="title">페이지</span>
          </div>
          <ul className="lnb inline-grid">
            <li className="lnb-item">
              <div className="lnb-header !mb-[10px]">
                <img
                  src="../../../public/images/ico/page_home_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link to="/antWork/page" className="main-cate !text-[16px]">
                  홈
                </Link>
              </div>

              <div className="lnb-header !pb-[15px] border-b border-[#ddd]">
                <img
                  src="../../../public/images/ico/page_search_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <span className="main-cate !text-[16px] ">검색</span>
              </div>
            </li>

            <li className="lnb-item !mt-[15px] !h-[300px] border-b border-[#ddd]">
              {/* 개인 페이지 토글 */}
              <div
                className="lnb-header cursor-pointer "
                onClick={togglePersonalPages}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                  개인 페이지{" "}
                  <img
                    src={
                      showPersonalPages
                        ? "../../../public/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "../../../public/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {showPersonalPages && (
                <ol>
                  <li>
                    <a href="#">🌹&nbsp;&nbsp;Spring</a>
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
            </li>
            <li className="lnb-item">
              <div className="lnb-header !mb-[10px]">
                <img
                  src="../../../public/images/ico/page_template_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antWork/page"
                  className="main-cate !text-[16px] text-[#757575]"
                >
                  템플릿
                </Link>
              </div>

              <div className="lnb-header !mb-[10px]">
                <img
                  src="../../../public/images/ico/page_delete24_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antWork/page"
                  className="main-cate !text-[16px] text-[#757575]"
                >
                  휴지통
                </Link>
              </div>
              <div className="lnb-header !mb-[10px]">
                <img
                  src="../../../public/images/ico/page_setting_22_999999.svg"
                  className="cate-icon !w-[22px] !h-[22px]"
                />
                <Link
                  to="/antWork/page"
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
