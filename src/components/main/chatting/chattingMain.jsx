import { useState, useEffect } from "react";
import { getDmMessages } from "../../../api/chattingAPI";
import useToggle from "./../../../hooks/useToggle";
import useModalStore from "./../../../store/modalStore";

export default function ChattingMain({ dmId }) {
  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력 상태
  const { openModal } = useModalStore(); // 모달 열기 함수 가져오기

  const [messages, setMessages] = useState([]); // 메시지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  
  // useToggle 훅 사용
  const [toggleStates, toggleState] = useToggle({
    isSidebarOpen: false, // 오른쪽 사이드바 토글
    isAlarmOn: true, // 알림 상태 토글
    isContactOpen: true, // 대화 상대 토글
    isPhotoOpen: false, // 사진 파일 토글
    isFileOpen: false, // 첨부 파일 토글
    isSearchOpen: false, // 검색창 토글
  });

  const fetchMessages = async () => {
    try {
      console.log("Fetching messages for dmId:", dmId);
      setLoading(true);
  
      const response = await getDmMessages(dmId);
      
      // 응답이 HTML인 경우 처리
      if (response.data.includes("<html")) {
        console.error("HTML 응답을 받았습니다. 서버 응답을 확인하세요.");
        setMessages([]); // HTML 응답이면 메시지 비우기
        return;
      }
  
      // 응답 데이터가 배열인지 확인
      if (Array.isArray(response.data)) {
        setMessages(response.data); // 메시지 상태에 저장
      } else {
        console.error("응답 데이터가 배열이 아닙니다:", response.data);
        setMessages([]); // 배열이 아니면 빈 배열 설정
      }
    } catch (error) {
      console.error("메시지 조회 오류:", error);
      setMessages([]); // 오류 발생 시 빈 배열로 설정
    } finally {
      setLoading(false); // 로딩 종료
    }
  };
  
  // 컴포넌트 마운트 시 메시지 조회
  useEffect(() => {
    fetchMessages(); // dmId가 변경될 때마다 호출
  }, [dmId]);

  return (
    <div className="w-[100%] rounded-3xl shadow-md z-20 overflow-hidden">
      <div className="flex h-full">
        {/* 메인 채팅 영역 */}
        <div
          className={`flex flex-col h-full transition-all duration-300 ${toggleStates.isSidebarOpen ? "w-[78%] min-w-[300px]" : "w-full min-w-[300px]"}`}
        >
          {/* 채팅 헤더 */}
          <div className="flex-none px-6 py-4 bg-white border-b border-white-200 rounded-t-3xl shadow flex items-center justify-between">
            {/* 프로필 섹션 */}
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
              />
              <div className="flex items-center ml-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                  최준혁
                </h1>
                <span className="ml-2 w-3 h-3 bg-green-400 rounded-full inline-block"></span>
              </div>
            </div>

            {/* 아이콘 섹션 */}
            <div className="flex items-center space-x-4">
              {/* 고정핀 아이콘 */}
              <button
                className="p-2 rounded-full hover:bg-gray-300 focus:outline-none "
                onClick={() => console.log("고정핀 기능 실행")}
              >
                <img
                  src="/images/ico/고정핀.svg"
                  alt="Pin"
                  className="w-8 h-8"
                />
              </button>

              {/* 검색 아이콘 및 입력창 */}
              <div className="relative flex items-center">
                {/* 검색 입력창 */}
                {toggleStates.isSearchOpen && (
                  <div className="relative flex items-center ml-2">
                    <input
                      type="text"
                      value={searchQuery}
                      placeholder="검색어를 입력하세요."
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md transition-all duration-300"
                      style={{ width: "200px" }}
                    />
                    {/* 입력 지우기 버튼 */}
                    {searchQuery && (
                      <button
                        className="absolute right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
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
                  </div>
                )}
                <button
                  className="p-2 rounded-full hover:bg-gray-300 focus:outline-none transition"
                  onClick={() => toggleState("isSearchOpen")}
                >
                  <img
                    src="/images/ico/돋보기.svg"
                    alt="Search"
                    className="w-8 h-8"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 채팅 본문 */}
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50 bg-white">
            {loading ? (
              <div>로딩 중...</div> // 로딩 중일 때 표시할 내용
            ) : (
              <>
                {Array.isArray(messages) && messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 1 ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className={`p-4 ${message.senderId === 1 ? "bg-gray-100" : "bg-blue-100"} rounded-lg`}>
                        <p>{message.content}</p>
                        <span>{message.createdAt}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>메시지가 없습니다.</div> // 메시지가 없을 때 표시할 내용
                )}
              </>
            )}
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
                <img src="/images/ico/file.svg" alt="Attach" />
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
      </div>
    </div>
  );
}
