import { useState } from "react";
import { Link } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";

export default function ApprovalAside({ asideVisible }) {
  const [toggles, toggleSection] = useToggle({
    basicApproval: true,
    approvalList: true,
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
          <span className="sub-title">electronic approval</span>

          <span className="title">Approval</span>
        </div>

        <ul className="lnb inline-grid">
          <li className="lnb-item !mt-[10px] !h-[500px] border-b border-[#ddd]">
            {/* 기본관리 */}
            <div
              className="lnb-header cursor-pointer "
              onClick={() => toggleSection("basicApproval")}
            >
              <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                전자결재{" "}
                <img
                  src={
                    toggles.basicApproval
                      ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                      : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                  }
                  alt="toggle"
                />
              </span>
            </div>
            {toggles.basicApproval && (
              <ol>
                <li>
                  <Link
                    to="/antwork/setting/electronic-approval"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    🏝️&nbsp;&nbsp;휴가 신청
                  </Link>
                </li>
                <li>
                  <Link
                    to="/antwork/setting/electronic-approval"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    💼&nbsp;&nbsp;출장 신청
                  </Link>
                </li>
                <li>
                  <Link
                    to="/antwork/setting/electronic-approval"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    💰&nbsp;&nbsp;경비 신청
                  </Link>
                </li>
              </ol>
            )}
            <div
              className="lnb-header cursor-pointer "
              onClick={() => toggleSection("approvalList")}
            >
              <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex mt-[10px]">
                나의 결재내역{" "}
                <img
                  src={
                    toggles.approvalList
                      ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                      : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                  }
                  alt="toggle"
                />
              </span>
            </div>
            {toggles.approvalList && (
              <ol>
                <li>
                  <Link
                    to="/antwork/setting/electronic-approval"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    🗄️&nbsp;&nbsp;나의 결재내역
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
                최근사용목록
              </Link>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
