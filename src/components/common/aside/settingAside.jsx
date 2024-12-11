import { useState } from "react";
import { Link } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";

export default function SettinngAside({ asideVisible }) {
  const [toggles, toggleSection] = useToggle({
    basicManagement: true,
    organizationalManagement: true,
    securityManagement: true,
    menuManagement: true,
  });

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const linkStyle = {
    textDecoration: "none",
    fontSize: "15px",
    color: "#555",
    transition: "color 0.2s ease",
  };
  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""} table-cell`}>
        <div className="logo">
          <span className="sub-title">Personal Setting</span>

          <span className="title">Setting</span>
        </div>
        <ul className="lnb inline-grid">
          <li className="lnb-item !mt-[10px] !h-[500px] border-b border-[#ddd]">
            {/* 기본관리 */}
            <div
              className="lnb-header cursor-pointer "
              onClick={() => toggleSection("basicManagement")}
            >
              <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                마이페이지{" "}
                <img
                  src={
                    toggles.basicManagement
                      ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                      : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                  }
                  alt="toggle"
                />
              </span>
            </div>
            {toggles.basicManagement && (
              <ol>
                <li>
                  <Link to="/antwork/setting/myinfo">
                    👤&nbsp;&nbsp;나의 정보수정
                  </Link>
                </li>
                <li>
                  <Link to="/antwork/setting/myinfo">
                    📃&nbsp;&nbsp;나의 활동내역
                  </Link>
                </li>
                <li>
                  <div
                    className="flex items-center cursor-pointer"
                    style={linkStyle}
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                  >
                    📝&nbsp;&nbsp;전자결제
                    <span className="ml-auto text-gray-500">
                      {isSubmenuOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {/* 하위 메뉴 */}
                  {isSubmenuOpen && (
                    <ul className="ml-6 mt-2 space-y-2">
                      <li>
                        <Link
                          to="/antwork/setting/electronic-approval"
                          className="block text-gray-700 hover:text-blue-500"
                        >
                          휴가신청
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/antwork/setting/electronic-approval"
                          className="block text-gray-700 hover:text-blue-500"
                        >
                          출장신청
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/antwork/setting/electronic-approval"
                          className="block text-gray-700 hover:text-blue-500"
                        >
                          경비신청
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ol>
            )}
            {/* 조직관리*/}
            <div
              className="lnb-header cursor-pointer "
              onClick={() => toggleSection("organizationalManagement")}
            >
              <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex !mt-[12px] ">
                메뉴 설정{" "}
                <img
                  src={
                    toggles.organizationalManagement
                      ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                      : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                  }
                  alt="toggle"
                />
              </span>
            </div>
            {toggles.organizationalManagement && (
              <ol>
                <li>
                  <Link to="/admin/organizational-design">
                    🗓️&nbsp;&nbsp;캘린더 설정
                  </Link>
                </li>
                <li>
                  <Link to="/admin/member-integration">
                    📮&nbsp;&nbsp;메신저 설정
                  </Link>
                </li>
                <li>
                  <Link to="/admin/member-integration">
                    🗒️&nbsp;&nbsp;페이지 설정
                  </Link>
                </li>

                <li>
                  <Link to="/admin/member-integration">
                    📊&nbsp;&nbsp;프로젝트 설정
                  </Link>
                </li>
                <li>
                  <Link to="/admin/member-integration">
                    📋&nbsp;&nbsp;게시판 설정
                  </Link>
                </li>
                <li>
                  <Link to="/admin/member-integration">
                    ☁️&nbsp;&nbsp;드라이브 설정
                  </Link>
                </li>
              </ol>
            )}
          </li>

          <li className="lnb-item">
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/ico/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <Link
                to="/antwork/page"
                className="main-cate !text-[16px] text-[#757575]"
              >
                최근사용목록
              </Link>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
