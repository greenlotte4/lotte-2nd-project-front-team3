/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ onToggleAside }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // 기본 동작 방지

    // 로컬 스토리지와 세션 스토리지에서 인증 토큰 제거
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // 로그인 페이지로 리다이렉트
    navigate("/login");
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <header className="z-[1000]">
        <div className="header leftside">
          <a
            href="#"
            id="openSidebarBtn"
            onClick={(e) => {
              e.preventDefault();
              onToggleAside();
            }}
          >
            <img
              src="/images/ico/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="menu"
            />
          </a>
          <h1 className="hlogo">AntWork</h1>
        </div>
        <div className="header rightside">
          <a href="#">
            <img
              src="/images/ico/notifications_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 copy.svg"
              alt="alarm"
            />
          </a>
          <a href="#">
            <img src="/images/ico/nav_chat.svg" alt="message" />
          </a>

          <div className="user-info headeruser relative">
            <img
              src="/images/ico/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="profile"
              className="avatar"
            />
            <div className="user-details">
              <h3>최준혁</h3>
              <p>개발팀(팀장)</p>
            </div>
            <a href="#" onClick={toggleDropdown}>
              <img
                src="/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                alt="arrow"
              />
            </a>

            {/* 드롭다운 메뉴 */}
            {showDropdown && (
              <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                <ul>
                  <div className="border-t border-gray-300 border-b border-gray-300 p-3 m-3 mb-0">
                    <li className="w-full text-[14px] !hover:bg-gray-100 !hover:rounded-[10px] text-left">
                      <a href="#">나의 정보 수정</a>
                    </li>
                    <li className="w-full text-[14px] !hover:bg-gray-100 !hover:rounded-[10px] text-left">
                      <a href="#">설정 페이지</a>
                    </li>
                  </div>
                  <div className=" p-3 m-3 !mt-1 !pt-1 !mb-1">
                    <li className="w-full text-[14px] !hover:bg-gray-100 !hover:rounded-[10px] text-left">
                      <a href="#">관리자 페이지</a>
                    </li>
                  </div>
                </ul>
              </div>
            )}
          </div>
          {/* 로그아웃 버튼 */}
          <a href="#" onClick={handleLogout}>
            <img
              src="/images/ico/logout_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="logout"
            />
          </a>
        </div>
      </header>
    </>
  );
}
