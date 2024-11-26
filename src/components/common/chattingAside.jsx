import { useEffect, useState } from "react";
import { useInviteModal } from "./../../hooks/chatting/invitemodal";
import useModalStore from "./../../store/modalStore";
import useToggle from "./../../hooks/useToggle";

export default function ChattingAside() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색 상태 관리
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
    <aside className="h-screen p-4 text-gray-800 bg-white flex flex-col shadow-xl ">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200 mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-black">💬 채팅</h1>
      </div>

      <div className="relative mt-3 flex items-center rounded-full border border-gray-300 bg-white shadow-sm">
        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="채팅방 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-5 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />

        {/* 입력 지우기 버튼 */}
        {searchQuery && (
          <button
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => setSearchQuery("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.707 6.293a1 1 0 00-1.414 1.414L8.586 11l-3.293 3.293a1 1 0 001.414 1.414L11 12.414l3.293 3.293a1 1 0 001.414-1.414L12.414 11l3.293-3.293a1 1 0 00-1.414-1.414L11 9.586 7.707 6.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* 검색 버튼 */}
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none"
          onClick={() => console.log("검색 버튼 클릭")}
        >
          <img
            src="../../../public/images/ico/돋보기.svg"
            alt="Search"
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* 채널 섹션 */}
      <div className="mt-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3 bg-white-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
          onClick={() => toggleState("isChannelOpen")}
        >
          <span className="text-lg font-semibold text-black">📢 채널</span>
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
          <ul className="space-y-3">
            <li className="flex items-center p-2 rounded-md bg-white hover:bg-blue-100 cursor-pointer transition">
              {/* 공개 채널 아이콘 */}
              <img
                src="../../../public/images/ico/chat_public.svg"
                alt="Public Channel"
                className="w-7 h-7 rounded-full mr-3 border border-gray-300 shadow-sm"
              />
              <div className="flex-1">
                <p className="font-medium text-base text-gray-800">
                  팀 프로젝트
                </p>
              </div>
              <div className="ml-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                3
              </div>
            </li>
            <li className="flex items-center p-2 rounded-md bg-white hover:bg-blue-100 cursor-pointer transition">
              {/* 비공개 채널 아이콘 */}
              <img
                src="../../../public/images/ico/chat_private.svg"
                alt="Private Channel"
                className="w-7 h-7 rounded-full mr-3 border border-gray-300 shadow-sm"
              />
              <div className="flex-1">
                <p className="font-medium text-base text-gray-800">마케팅 팀</p>
              </div>
              <div className="ml-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                5
              </div>
            </li>
          </ul>

          {/* 채널 추가 버튼 */}
          <div className="mt-4">
            <button
              className="w-full flex items-center justify-center bg-[#A0C3F7] text-white py-2  hover:bg-[#6a9eed] transition focus:outline-none "
              onClick={() => console.log("채널 추가 버튼 클릭")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              채널 추가
            </button>
          </div>
        </div>
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
                src="../../../public/images/ico/chat_profile.svg"
                alt="User"
                className="w-10 h-10 rounded-full mr-4 border border-gray-300 shadow-sm"
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
                src="../../../public/images/ico/chat_profile.svg"
                alt="User"
                className="w-10 h-10 rounded-full mr-4 border border-gray-300 shadow-sm"
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

      {/* 사용자 초대 버튼 */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <button
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r  bg-[#A0C3F7] text-white py-2  hover:bg-[#6a9eed] text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          onClick={() => {
            console.log("Modal Props:", inviteModalProps); // 로그 추가
            openModal("invite", { ...inviteModalProps });
          }}
        >
          {/* 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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

          {/* 텍스트 */}
          <span className="text-lg font-semibold">사용자 초대</span>
        </button>
      </div>
    </aside>
  );
}
