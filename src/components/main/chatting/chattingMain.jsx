import { useState } from "react";
import useToggle from "./../../../hooks/useToggle";

export default function ChattingMain() {
  // useToggle 훅 사용
  const [toggleStates, toggleState] = useToggle({
    isSidebarOpen: false, // 사이드바
    isAlarmOn: true, // 알림 상태
    isContactOpen: true, // 대화 상대 토글
    isPhotoOpen: false, // 사진 파일 토글
    isFileOpen: false, // 첨부 파일 토글
  });

  return (
    <div className="fixed top-30 left-[5%] md:left-[10%] lg:left-[15%] h-[calc(100vh-80px)] w-[90%] md:w-[80%] rounded-3xl shadow-md  z-20 overflow-hidden">
      <div className="flex h-full">
        {/* 메인 채팅 영역 */}
        <div
          className={`flex flex-col h-full transition-all duration-300 ${
            toggleStates.isSidebarOpen ? "w-[78%]" : "w-full"
          }`}
        >
          {/* 채팅 헤더 */}
          <div className="flex-none px-6 py-4 bg-white border-b border-gray-200 rounded-t-3xl shadow flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div className="flex items-center ml-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                  최준혁
                </h1>
                <span className="ml-2 w-3 h-3 bg-green-400 rounded-full inline-block"></span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={() => toggleState("isSidebarOpen")}
              >
                <img
                  src="../../../../public/images/ico/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
                  alt="Menu"
                />
              </button>
            </div>
          </div>

          {/* 채팅 본문 */}
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`flex items-start mb-8 space-x-4 ${
                  i % 2 === 0 ? "" : "flex-row-reverse space-x-reverse"
                }`}
              >
                {i % 2 === 0 ? (
                  <>
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Profile"
                      className="w-14 h-14 rounded-full border border-gray-300"
                    />
                    <div className="bg-gray-100 px-6 py-4 rounded-2xl shadow-md max-w-2xl">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        안녕하세요! 메시지 내용입니다.
                      </p>
                    </div>
                    <div className="flex flex-col items-start justify-end h-full">
                      <span className="text-xs text-gray-400 mb-1">읽음</span>
                      <span className="text-sm text-gray-500 self-end">
                        오후 4:31
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src="https://via.placeholder.com/50"
                      alt="My Profile"
                      className="w-14 h-14 rounded-full border border-gray-300"
                    />
                    <div className="bg-[#A0C3F7] text-white px-6 py-4 rounded-2xl shadow-md max-w-2xl">
                      <p className="text-lg leading-relaxed">
                        안녕하세요! 제가 보낸 메시지입니다.
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-end h-full">
                      <span className="text-xs text-gray-400 mb-1">3</span>
                      <span className="text-sm text-gray-500 self-end">
                        오후 4:31
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* 입력창 */}
          <div className="flex-none px-6 py-4 bg-white border-t border-gray-200 rounded-b-3xl">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="메시지를 입력하세요."
                className="flex-1 border border-gray-300 rounded-full px-6 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
              {/* 첨부파일 버튼 */}
              <button className="p-3 rounded-full hover:bg-gray-200 focus:outline-none">
                <img
                  src="../../../../public/images/ico/file.svg"
                  alt="Attach"
                />
              </button>
              {/* 전송 버튼 */}
              <button
                className="ml-4 px-6 py-3 text-lg font-semibold rounded-full shadow-md"
                style={{ backgroundColor: "#eff6ff", color: "gray-800" }}
              >
                전송
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 토글 패널 */}
        <div
          className={`fixed top-30 right-0 h-full bg-white w-[20%] rounded-3xl p-6 shadow-lg border-l transition-transform transform ${
            toggleStates.isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } duration-300`}
        >
          {/* 상단 영역 */}
          <div className="flex items-center justify-between mb-6">
            {/* 사이드바 닫기 버튼 */}
            <button
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              onClick={() => toggleState("isSidebarOpen")}
            >
              <img src="../../../../public/images/ico/closechat.svg"></img>
            </button>

            {/* 채팅방 이름 */}
            <h3 className="text-lg font-semibold text-gray-900">채팅방 이름</h3>

            {/* 오른쪽 아이콘들 */}
            <div className="flex items-center space-x-4">
              {/* 알림 아이콘 */}
              <button
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={() => toggleState("isAlarmOn")}
              >
                <img
                  src={
                    toggleStates.isAlarmOn
                      ? "../../../../public/images/ico/alerm.svg"
                      : "../../../../public/images/ico/alermoff.svg"
                  }
                  alt="알림 아이콘"
                />
              </button>

              {/* 나가기 아이콘 */}
              <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                <img src="../../../../public/images/ico/outchat.svg"></img>
              </button>
            </div>
          </div>

          {/* 검색창 */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              placeholder="DM 검색"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* 대화 상대 */}
          <div className="my-5">
            <div
              className="flex items-center justify-between cursor-pointer border-b border-gray-200"
              onClick={() => toggleState("isContactOpen")}
            >
              <h3 className="text-lg font-semibold mb-2">대화 상대</h3>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${
                    toggleStates.isContactOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {toggleStates.isContactOpen && (
              <ul className="space-y-4 mt-4">
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-300 mr-4"></span>
                  준혁
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-300 mr-4"></span>
                  모라존잘
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-300 mr-4"></span>
                  서영이
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-300 mr-4"></span>
                  김혜민
                </li>
              </ul>
            )}
          </div>

          {/* 사진 파일 */}
          <div className="my-5">
            <div
              className="flex items-center justify-between cursor-pointer border-b border-gray-200"
              onClick={() => toggleState("isPhotoOpen")}
            >
              <h3 className="text-lg font-semibold mb-2">사진 파일</h3>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${
                    toggleStates.isPhotoOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {toggleStates.isPhotoOpen && (
              <div className="space-y-4 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="파일"
                      className="w-10 h-10 rounded-md shadow-md"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        사진 {i + 1}
                      </p>
                      <p className="text-sm text-gray-400">어제</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 첨부 파일 */}
          <div className="my-5">
            <div
              className="flex items-center justify-between cursor-pointer border-b border-gray-200"
              onClick={() => toggleState("isFileOpen")}
            >
              <h3 className="text-lg font-semibold mb-2">첨부 파일</h3>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${
                    toggleStates.isFileOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            {toggleStates.isFileOpen && (
              <div className="space-y-4 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="파일"
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        11월 회의록.pptx
                      </p>
                      <p className="text-sm text-gray-400">어제</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
