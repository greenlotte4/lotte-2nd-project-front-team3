/* eslint-disable react/prop-types */
import useToggle from "../../../hooks/useToggle";
import { Link } from "react-router-dom";

{
  /*
    날짜 : 2024/11/26(화)
    생성자 : 김민희
    내용 : boardAside.jsx - 카테고리 토글 메뉴 및 검색 추가

    수정 내역 : 
    2024/11/25 - 김민희 : 토글 메뉴 컴포넌트화를 위해 토글 메뉴 컴포넌트 분리
    2024/11/27 - 김민희 : write(글쓰기 아이콘), list(글목록) 링크 연결
  */
}

export default function BoardAside({ asideVisible }) {
  const [toggles, toggleSection] = useToggle({
    communityList: true,
    dataList: true,
  });

  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""} table-cell`}>
        <div className="logo">
          <span className="sub-title">Notice Board</span>
          <Link to="/antwork/board/write">
            <button
              className="image-button-css !bg-[url('/images/ico/page_write_22_999999.svg')] cursor-pointer display-block"
              aria-label="글쓰기(작성)"
            ></button>
          </Link>
          <span className="title">게시판</span>
        </div>
        <ul className="lnb inline-grid">
          <li className="lnb-item">
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/ico/page_home_22_999999.svg"
                className="cate-icon !w-[22px] !h-[22px] cursor-pointer"
              />
              <Link
                to="/antwork/board"
                className="main-cate !text-[16px] cursor-pointer"
              >
                홈 바로가기
              </Link>

              <div className=""></div>
            </div>

            <div className="lnb-header !pb-[15px] border-b border-[#ddd]">
              <img
                src="/images/ico/page_search_22_999999.svg"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <span className="main-cate !text-[16px] ">검색</span>
            </div>
          </li>

          {/* 커뮤니티 토글 메뉴 start ---------------------------------------------------------------------------------------------------------- */}
          <li className="lnb-item !mt-[15px] !h-[300px] border-b border-[#ddd]">
            <div
              className="lnb-header cursor-pointer "
              onClick={() => {
                toggleSection("communityList");
              }}
            >
              <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                커뮤니티{" "}
                <img
                  src={
                    toggles.communityList
                      ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                      : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                  }
                  alt="toggle"
                />
              </span>
            </div>
            {toggles.communityList && (
              <ol>
                <li>
                  <Link to="/antwork/board/list">🌈&nbsp;&nbsp;자유게시판</Link>
                </li>
                <li>
                  <Link to="#">🥹&nbsp;&nbsp;억울한 일</Link>
                </li>
              </ol>
            )}

            {/* 자료실 토글 메뉴 start ---------------------------------------------------------------------------------------------------------- */}
            <li className="lnb-item !mt-[15px] !h-[300px] border-b border-[#ddd]">
              <div
                className="lnb-header cursor-pointer "
                onClick={() => {
                  toggleSection("dataList");
                }}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                  자료실{" "}
                  <img
                    src={
                      toggles.dataList
                        ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.dataList && (
                <ol>
                  <li>
                    <a href="#">🔖&nbsp;&nbsp;휴가신청서</a>
                  </li>
                  <li>
                    <a href="#">🔖&nbsp;&nbsp;지출결의서</a>
                  </li>
                </ol>
              )}
            </li>
            {/* 자료실 end ---------------------------------------------------------------------------------------------------------- */}
          </li>
          {/* 커뮤니티 end ---------------------------------------------------------------------------------------------------------- */}

          <li className="lnb-item">
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/ico/page_delete24_999999.svg"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <Link
                to="/antwork/board"
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
                to="/antwork/board"
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
