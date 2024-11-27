import { useState } from "react";
import { Link } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";

export default function PageAside({ asideVisible }) {
  const [toggles, toggleSection] = useToggle({
    personalPages: true,
    sharedPages: true,
  });

  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""} table-cell`}>
        <div className="logo">
          <span className="sub-title">Shared Page</span>
          <Link
            to="/antwork/page/write"
            className="image-button-css !bg-[url('/images/ico/page_write_22_999999.svg')]"
            aria-label="등록"
          ></Link>
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
                  <Link to="/antwork/page/view">📘&nbsp;&nbsp;업무일지</Link>
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
    </>
  );
}
