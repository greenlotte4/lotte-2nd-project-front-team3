import { useState } from "react";
import useToggle from "./../../../hooks/useToggle";
import useModalStore from "./../../../store/modalStore";

export default function ChattingMain() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력 상태
  const { openModal } = useModalStore(); // 모달 열기 함수 가져오기

  // useToggle 훅 사용
  const [toggleStates, toggleState] = useToggle({
    isSidebarOpen: false, // 오른쪽 사이드바 토글
    isAlarmOn: true, // 알림 상태 토글
    isContactOpen: true, // 대화 상대 토글
    isPhotoOpen: false, // 사진 파일 토글
    isFileOpen: false, // 첨부 파일 토글
    isSearchOpen: false, // 검색창 토글
  });

  return (
    <>
    <article className="page-list">
        <div className="content-header">
          <div className="max-w-9xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">Chatting</h1>
              <p className="text-sm text-gray-500">채팅 메인 페이지입니다.</p>
            </div>
    <div className="w-full max-w-9xl mx-auto px-6 py-12 space-y-8 bg-white min-h-screen">
   

      {/* 채팅방 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DM 카드 */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 h-[300px] 
                          transform transition-all duration-300 
                          hover:shadow-2xl hover:scale-[1.02] 
                          hover:border-green-100 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-green-500 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span className="text-gray-400 group-hover:text-green-500 transition-colors">
                • 개인 채팅
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Direct Message
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              개인 메시지로 중요한 대화를 이어가보세요.
            </p>
            <a
              className="w-full text-center block bg-green-500 text-white 
                         py-3 rounded-xl hover:bg-green-600 
                         transition-colors font-medium"
            >
              DM 초대하기
            </a>
          </div>

          {/* 채널 카드 */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 h-[300px]
                          transform transition-all duration-300 
                          hover:shadow-2xl hover:scale-[1.02] 
                          hover:border-blue-100 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-blue-500 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                • 단체 채팅
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">채널</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              팀원들과 실시간으로 소통할 수 있는 채널에 참여해보세요.
            </p>
            <a
              href="/channels"
              className="w-full text-center block bg-blue-500 text-white 
                         py-3 rounded-xl hover:bg-blue-600 
                         transition-colors font-medium"
            >
              채널 추가
            </a>
          </div>

          {/* 도움말 카드 */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 h-[300px]
                          transform transition-all duration-300 
                          hover:shadow-2xl hover:scale-[1.02] 
                          hover:border-yellow-100 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-50 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-yellow-500 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-gray-400 group-hover:text-yellow-500 transition-colors">
                • 도움말
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">도움말</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              버튼을 클릭하여 DM 초대와 채널 생성을 할 수 있어요.
            </p>
            <a
              href="/help"
              className="w-full text-center block bg-yellow-500 text-white 
                         py-3 rounded-xl hover:bg-yellow-600 
                         transition-colors font-medium"
            >
              AntWork
            </a>
          </div>
        </div>

      {/* 하단 텍스트 */}
      <footer className="text-center text-gray-400 text-sm">
        AntWork 팀 커뮤니케이션의 새로운 시작
      </footer>
      </div>
      </div>
    </div>
  </article>
  </>
);
}