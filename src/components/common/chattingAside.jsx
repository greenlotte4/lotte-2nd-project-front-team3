import { useState } from "react";

export default function ChattingAside() {
  const [isDMOpen, setIsDMOpen] = useState(true);
  const [isChannelOpen, setIsChannelOpen] = useState(true);
  const [isPersonalOpen, setIsPersonalOpen] = useState(true);

  return (
    <aside className="bg-white h-screen p-4 text-gray-800 flex flex-col w-80 shadow-lg rounded-xl border border-gray-200">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-extrabold text-blue-500">💬 채팅</h1>
        <div className="mt-3">
          <input
            type="text"
            placeholder="채팅방 검색"
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>
      </div>

      {/* 개인 채팅 섹션 */}
      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setIsPersonalOpen(!isPersonalOpen)}
        >
          <span className="text-sm font-semibold text-blue-500 text-lg">
            👤 개인 채팅
          </span>
          <img
            src="path/to/arrow-icon.svg"
            alt="Toggle"
            className={`w-4 h-4 transform ${
              isPersonalOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isPersonalOpen && (
          <ul className="space-y-3">
            <li className="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer shadow-sm transition">
              <img
                src="path/to/avatar1.jpg"
                alt="User"
                className="w-12 h-12 rounded-full mr-3 border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">강은경</p>
                <p className="text-sm text-gray-500">
                  새로운 메시지가 있습니다.
                </p>
              </div>
              <span className="text-xs text-gray-400">11:30</span>
            </li>
            <li className="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer shadow-sm transition">
              <img
                src="path/to/avatar2.jpg"
                alt="User"
                className="w-12 h-12 rounded-full mr-3 border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">김민희</p>
                <p className="text-sm text-gray-500">"잠시 후 회의 시작..."</p>
              </div>
              <span className="text-xs text-gray-400">10:15</span>
            </li>
          </ul>
        )}
      </div>

      {/* 채널 섹션 */}
      <div className="mt-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setIsChannelOpen(!isChannelOpen)}
        >
          <span className="text-sm font-semibold text-black-800">
            📢 채널 (단체 채팅)
          </span>
          <img
            src="path/to/arrow-icon.svg"
            alt="Toggle"
            className={`w-4 h-4 transform ${
              isChannelOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        {isChannelOpen && (
          <ul className="space-y-3">
            <li className="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer shadow-sm transition">
              <img
                src="path/to/group-icon.svg"
                alt="Group"
                className="w-12 h-12 rounded-full mr-3 border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">팀 프로젝트</p>
              </div>
              <div className="ml-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                3
              </div>
            </li>
            <li className="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer shadow-sm transition">
              <img
                src="path/to/group-icon.svg"
                alt="Group"
                className="w-12 h-12 rounded-full mr-3 border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">마케팅 팀</p>
              </div>
              <div className="ml-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                5
              </div>
            </li>
          </ul>
        )}
      </div>

      {/* Invite Users */}
      <div className="border-t border-gray-200 pt-4 mt-6">
        <button className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-3 rounded-full hover:shadow-lg transition">
          ✨ 사용자 초대
        </button>
      </div>
    </aside>
  );
}
