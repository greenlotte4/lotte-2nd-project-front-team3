import { useState } from "react";
import { Link } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";

export default function AdminAside({ asideVisible }) {
  const [toggles, toggleSection] = useToggle({
    basicManagement: true,
    organizationalManagement: true,
    securityManagement: true,
    menuManagement: true,
  });

  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""} table-cell`}>
        <div className="logo">
          <span className="sub-title">Admin Setting</span>

          <span className="title">Admin</span>
        </div>
        <ul className="lnb inline-grid">
          <li className="lnb-item !h-[auto]">
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/ico/page_home_22_999999.svg"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <Link to="/antwork/admin" className="main-cate !text-[16px]">
                홈
              </Link>
            </div>
          </li>

          <li className="lnb-item !mt-[15px] !h-[500px] border-b border-[#ddd]">
            {/* 기본관리 */}
            <div
              className="lnb-header cursor-pointer "
              onClick={() => toggleSection("basicManagement")}
            >
              <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                기본 관리{" "}
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
                  <Link to="/antwork/admin/member">
                    🌐&nbsp;&nbsp;서비스 정보
                  </Link>
                </li>
                <li>
                  <Link to="/antwork/admin/member">👨‍💻&nbsp;&nbsp;멤버관리</Link>
                </li>
                <li>
                  <Link to="/antwork/admin/popup">🔔&nbsp;&nbsp;팝업관리</Link>
                </li>
                <li>
                  <Link to="/antwork/admin/notification">
                    📩&nbsp;&nbsp;알림관리
                  </Link>
                </li>
              </ol>
            )}
            {/* 조직관리*/}
            <div
              className="lnb-header cursor-pointer "
              onClick={() => toggleSection("organizationalManagement")}
            >
              <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex !mt-[12px] ">
                조직 관리{" "}
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
                    📁&nbsp;&nbsp;조직도 설계
                  </Link>
                </li>
                <li>
                  <Link to="/admin/member-integration">
                    👤&nbsp;&nbsp;멤버 통합 관리
                  </Link>
                </li>
                <li>
                  <Link to="/antwork/admin/department">
                    🏢&nbsp;&nbsp;부서 관리
                  </Link>
                </li>
              </ol>
            )}

            <div
              className="lnb-header cursor-pointer "
              onClick={() => toggleSection("securityManagement")}
            >
              <span className="main-cate !mt-[12px] !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                보안관리{" "}
                <img
                  src={
                    toggles.securityManagement
                      ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                      : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                  }
                  alt="toggle"
                />
              </span>
            </div>
            {toggles.securityManagement && (
              <ol>
                <li>
                  <Link to="/antwork/admin/member">
                    🚫&nbsp;&nbsp;접근 제한
                  </Link>
                </li>
                <li>
                  <Link to="/antwork/admin/member">
                    📄&nbsp;&nbsp;멤버접근로그
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
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/ico/page_setting_22_999999.svg"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <Link
                to="/antwork/page"
                className="main-cate !text-[16px] text-[#757575]"
              >
                관리자 설정
              </Link>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
