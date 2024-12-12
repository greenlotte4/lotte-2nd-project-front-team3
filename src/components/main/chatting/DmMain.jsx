import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getDmMessages, sendDmMessage } from "../../../api/chattingAPI";
import useToggle from "./../../../hooks/useToggle";
import useAuthStore from "../../../store/AuthStore";
import formatChatTime from "@/utils/chatTime";
import { Client } from "@stomp/stompjs";
export default function DmMain() {
  const { id: dmId } = useParams();
  const [dmData, setDmData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const chatBoxRef = useRef(null); // 채팅창 Ref  
  const stompClientRef = useRef(null)
  const { userId } = useAuthStore((state) => state);

    const [searchQuery, setSearchQuery] = useState(""); // 검색 입력 상태

 // useToggle 훅 사용
 const [toggleStates, toggleState] = useToggle({
  isSidebarOpen: false, // 오른쪽 사이드바 토글
  isAlarmOn: true, // 알림 상태 토글
  isContactOpen: true, // 대화 상대 토글
  isPhotoOpen: false, // 사진 파일 토글
  isFileOpen: false, // 첨부 파일 토글
  isSearchOpen: false, // 검색창 토글
});


  useEffect(() => {
    const fetchDm = async () => {
      try {
        const dm = await getDm(dmId);
        setDmData(dm);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const messages = await getDmMessages(dmId);
        setMessages(messages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDm();
    fetchMessages();
  }, [dmId]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") {
      alert("메시지를 입력해주세요.");
      return;
    }

    const newMessage = {
      content: messageInput.trim(),
      senderId: user?.id,
      dmId,
      createdAt: new Date()
    };

    try {
      const result = await sendDmMessage(newMessage);

      const msg = {
        id: result.data,
        senderId: user?.id,
        content: messageInput.trim(),
        createdAt: new Date()
      };
      console.log(`소켓 보낸 메시지 : ${msg}`)
      // TODO: 소켓 보내기
      stompClientRef.current.publish({
        destination: `/app/chatting/dm/${dmId}/send`,
        body: JSON.stringify(msg),
      });


      setMessages((prevMessages) => [...prevMessages, newMessage]); // 즉시 상태 업데이트
      setMessageInput(""); // 입력 초기화
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // WebSocket 연결 설정
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // 스크롤 하단 유지
    }
  }, [messages]); // 메시지가 변경될 때마다 스크롤 조정


  useEffect(() => {
    if (!user?.id || !dmId) {
      console.error("❌ User ID 또는 Channel ID가 없어요.");
      return;
    }

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws", // WebSocket 서버 URL
      reconnectDelay: 5000, // 재연결 딜레이
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (msg) => console.log("🔌 [ChannelMain.jsx] WebSocket Debug:", msg),

    });

    client.onConnect = () => {
      console.log("✅ [channel] WebSocket 연결 성공");
      stompClientRef.current = client;

      client.subscribe(`/topic/chatting/dm/${dmId}/messages`, (message) => {
        try {
          const newMessage = JSON.parse(message.body);
          if (newMessage.senderId === user?.id) {
            return;
          }
          console.log("📩 새 메시지 수신:", newMessage); // 메시지 수신 확인
          setMessages((prevMessages) => {
            return [...prevMessages, newMessage];
          });
          // TODO: 맨아래 스크롤
        } catch (error) {
          console.error("❌ 메시지 처리 중 에러:", error);
        }
      });
    };

    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [user?.id, dmId]); // 의존성 배열


  return (
    <div className="w-full rounded-3xl shadow-md overflow-hidden">
      <div className="flex flex-col h-full">
        {/* DM 헤더 */}
        <div className="flex-none px-6 py-4 bg-white border-b border-gray-200 shadow flex items-center justify-between">
        <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
              />
              <div className="flex items-center ml-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                  {dmData?.name}
                </h1>
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
                <button
                  className="p-2 rounded-full hover:bg-gray-300 focus:outline-none transition"
                >
                  <img
                    src="/images/ico/outchat.svg"
                    alt="Search"
                    className="w-8 h-8"
                  />
                </button>
                <button
                  className="p-2 rounded-full focus:outline-none "
                  onClick={() => toggleState("isSidebarOpen")}
                >
                  <img
                    src="/images/ico/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Menu"
                    className="w-8 h-8"
                  />
                </button>
              </div>
            </div>
          </div>


        {/* DM 본문 */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50" ref={chatBoxRef}>
          {loading ? (
            <div>로딩 중...</div>
          ) : messages.length === 0 ? (
            <div>메시지가 없습니다.</div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 mb-3 ${message.senderId === user?.id
                  ? "flex-row-reverse"
                  : "flex-row"
                  }`}
              >
                <img
                    src={message.userProfile || "https://via.placeholder.com/50"}
                    alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div
                  className={`p-4 ${message.senderId === user?.id
                    ? "bg-blue-100"
                    : "bg-gray-100"
                    } rounded-lg`}
                >
                  <p>{message.content}</p>
                </div>
                <span className="text-slate-400 self-end text-sm">{formatChatTime(message.createdAt)}</span>
              </div>
            ))
          )}
        </div>

        {/* 입력창 */}
        <div className="flex-none px-6 py-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="메시지를 입력하세요."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-lg"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="px-6 py-2 text-white bg-blue-500 rounded-full shadow hover:bg-blue-600"
              onClick={handleSendMessage}
            >
              전송
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽 토글 패널 */}
        <div
          className={`fixed top-30 right-0 h-full bg-white w-[20%] rounded-3xl p-6 shadow-lg border-l transition-transform transform ${toggleStates.isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } duration-300`}
        >
          {/* 상단 영역 */}
          <div className="flex items-center justify-between mb-6">
            {/* 사이드바 닫기 버튼 */}
            <button
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              onClick={() => toggleState("isSidebarOpen")}
            >
              <img src="/images/ico/closechat.svg"></img>
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
                      ? "/images/ico/alerm.svg"
                      : "/images/ico/alermoff.svg"
                  }
                  alt="알림 아이콘"
                />
              </button>

              {/* 나가기 아이콘 */}
              <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <img src="/images/ico/outchat.svg"></img>
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
                  className={`h-5 w-5 transform transition-transform ${toggleStates.isContactOpen ? "rotate-180" : "rotate-0"
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
                  className={`h-5 w-5 transform transition-transform ${toggleStates.isPhotoOpen ? "rotate-180" : "rotate-0"
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
                  className={`h-5 w-5 transform transition-transform ${toggleStates.isFileOpen ? "rotate-180" : "rotate-0"
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
  );
}
