import { useEffect, useState } from "react";
import { useInviteModal } from "../../../hooks/chatting/invitemodal";
import useModalStore from "../../../store/modalStore";
import useToggle from "../../../hooks/useToggle";


export default function ChattingAside({ asideVisible }) {
  const [toggleStates, toggleState] = useToggle({
    isDMOpen: true,
    isChannelOpen: true,
    isPersonalOpen: true,
  });

  const openModal = useModalStore((state) => state.openModal);
  const inviteModalProps = useInviteModal(); // 채팅방 초대 모달 props 호출
  useEffect(() => {
    console.log("==============");
  }, [inviteModalProps]);

  return (
    <aside
      className={`h-screen p-4 text-gray-800 flex flex-col shadow-xl rounded-2xl border border-gray-200 ${
        !asideVisible ? "hidden" : "" 
      }`}
    >
      {/* Header */}
      <div className="pb-4 border-b border-gray-200 mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-black">💬 채팅</h1>
        {/* 플러스 버튼 */}
        {/* <button
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none shadow-md"
          onClick={() => {
            console.log("Modal Props:", inviteModalProps); // 로그 추가
            openModal("invite", { ...inviteModalProps });
          }}
        >
          +
        </button> */}
 {/* 채널 생성 플러스 버튼 */}
        <button
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none shadow-md"
          onClick={() => openModal("createChannel", {})} // 모달 열기
        >
        + 채널 추가
        </button>

      </div>

      {/* 채팅방 검색 */}
      <div className="mt-3">
        <input
          type="text"
          placeholder="채팅방 검색"
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      </div>

      {/* 개인 채팅 섹션 */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer mb-3 bg-white-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
          onClick={() => toggleState("isPersonalOpen")}
        >
          <span className="text-lg font-semibold text-black">👤 개인 채팅</span>
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-transform ${
              toggleStates.isPersonalOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            toggleStates.isPersonalOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="space-y-4">
            <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
              <img
                src="path/to/avatar1.jpg"
                alt="User"
                className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
              />
              <div className="flex-1">
                <p className="font-medium text-lg text-gray-800">
                  강은경
                  <span className="ml-2 w-3 h-3 bg-green-400 rounded-full inline-block"></span>
                </p>
                <p className="text-sm text-gray-500">
                  새로운 메시지가 있습니다.
                </p>
              </div>
              <span className="text-sm text-gray-400">11:30</span>
            </li>
            <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
              <img
                src="path/to/avatar2.jpg"
                alt="User"
                className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
              />
              <div className="flex-1">
                <p className="font-medium text-lg text-gray-800">
                  김민희
                  <span className="ml-2 w-3 h-3 bg-gray-400 rounded-full inline-block"></span>
                </p>
                <p className="text-sm text-gray-500">"잠시 후 회의 시작..."</p>
              </div>
              <span className="text-sm text-gray-400">10:15</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 채널 섹션 */}
      <div className="mt-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3 bg-white-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
          onClick={() => toggleState("isChannelOpen")}
        >
          <span className="text-lg font-semibold text-black">
            📢 채널 (단체 채팅)
          </span>
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-transform ${
              toggleStates.isChannelOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            toggleStates.isChannelOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="space-y-4">
            <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
              <img
                src="path/to/group-icon.svg"
                alt="Group"
                className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
              />
              <div className="flex-1">
                <p className="font-medium text-lg text-gray-800">팀 프로젝트</p>
              </div>
              <div className="ml-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                3
              </div>
            </li>
            <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
              <img
                src="path/to/group-icon.svg"
                alt="Group"
                className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
              />
              <div className="flex-1">
                <p className="font-medium text-lg text-gray-800">마케팅 팀</p>
              </div>
              <div className="ml-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                5
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* 사용자 초대 버튼 */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <button
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white px-6 py-3 rounded-full hover:shadow-xl transition-transform hover:scale-105"
          onClick={() => {
            console.log("Modal Props:", inviteModalProps); // 로그 추가
            openModal("invite", { ...inviteModalProps });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-lg font-semibold">사용자 초대</span>
        </button>
      </div>
    </aside>
  );
}
