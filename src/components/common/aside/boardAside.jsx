import useToggle from "../../../hooks/useToggle";
import { Link } from "react-router-dom";
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
          <button
            className="image-button-css !bg-[url('/images/ico/page_write_22_999999.svg')]"
            aria-label="등록"
          ></button>
          <span className="title">게시판</span>
        </div>
        <ul className="lnb inline-grid">
          <li className="lnb-item">
            <div className="lnb-header !mb-[10px]">
              <img src="/images/ico/page_home_22_999999.svg"
                className="cate-icon !w-[22px] !h-[22px] cursor-pointer" 
                />
              <Link to="/antwork/page" className="main-cate !text-[16px]">
                홈 바로가기
              </Link>

              <div className="">

              </div>


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
                  <a href="#">🌈&nbsp;&nbsp;자유게시판</a>
                </li>
                <li>
                  <a href="#">🥹&nbsp;&nbsp;억울한 일</a>
                </li>₩  


                
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
