import { useState } from "react";
import { Link } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";

export default function ProjectAside({ asideVisible }) {
  const [toggles, toggleSection] = useToggle({
    ongoingProjects: true,
    completedProjects: true,
  });

  return (
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
          <div
            className="lnb-header cursor-pointer"
            onClick={() => toggleSection("ongoingProjects")}
          >
            <span className="main-cate">
              진행중인 프로젝트{" "}
              <img
                src={
                  toggles.ongoingProjects
                    ? "/images/ico/page_dropup_20_999999.svg"
                    : "/images/ico/page_dropdown_20_999999.svg"
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
        </li>
        <li className="lnb-item !mt-[15px] !h-[500px] border-b border-[#ddd]">
          <div
            className="lnb-header cursor-pointer"
            onClick={() => toggleSection("completedProjects")}
          >
            <span className="main-cate">
              완료된 프로젝트{" "}
              <img
                src={
                  toggles.completedProjects
                    ? "/images/ico/page_dropup_20_999999.svg"
                    : "/images/ico/page_dropdown_20_999999.svg"
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
  );
}
