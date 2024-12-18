import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getDmList, getDmMessages, sendDmMessage, getDmById, getDmMembers } from "../../../api/chattingAPI";
import useToggle from "./../../../hooks/useToggle";
import useAuthStore from "../../../store/AuthStore";
import formatChatTime from "@/utils/chatTime";
import { Client } from "@stomp/stompjs";
import { WS_URL } from "@/api/_URI";

export default function DmMain() {
  const { id: dmId } = useParams();
  const [dmData, setDmData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const chatBoxRef = useRef(null); // 채팅창 Ref  
  const [members, setMembers] = useState([])
  const stompClientRef = useRef(null)
  // const user = useAuthStore((state) => state.user);

  const [searchQuery, setSearchQuery] = useState(""); // 검색 입력 상태
  const [highlightedId, setHighlightedId] = useState(null);
  const chatRefs = useRef([]);


  // useToggle 훅 사용
  const [toggleStates, toggleState] = useToggle({
    isSidebarOpen: false, // 오른쪽 사이드바 토글
    isAlarmOn: true, // 알림 상태 토글
    isContactOpen: true, // 대화 상대 토글
    isPhotoOpen: false, // 사진 파일 토글
    isFileOpen: false, // 첨부 파일 토글
    isSearchOpen: false, // 검색창 토글
  });


  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current !== null) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]);
  
  useEffect(() => {
    const fetchDmMembers = async () => {
      try {
        const members = await getDmMembers(dmId);
        console.log(`members:`, members);
        setMembers(members);
      } catch (err) {
        console.error(err);
      }
    };
  
    const fetchDm = async () => {
      try {
        const dm = await getDmById(dmId); // 단일 디엠방 조회 API 호출
        setDmData(dm);
      } catch (error) {
        console.error("Failed to fetch DM data:", error);
      }
    };
  
    const fetchMessages = async () => {
      try {
        const messages = await getDmMessages(dmId); // 메시지 조회 API 호출
        setMessages(messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
  
    if (dmId) {
      fetchDmMembers();
      fetchDm();
      fetchMessages();
    }
  }, [dmId]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    const fetchDm = async () => {
      try {
        const dm = await getDmList(user?.id);
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
      userName: user?.name,
      dmId,
      createdAt: new Date()
    };

    console.log("🚀 전송하는 메시지:", newMessage);

    try {
      const result = await sendDmMessage(newMessage);

      const msg = {
        id: result.data,
        senderId: user?.id,
        userName: user?.name,
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
      // brokerURL: "ws://localhost:8080/ws", // WebSocket 서버 URL
      brokerURL: WS_URL,
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
    <div className="w-[100%] rounded-3xl shadow-md z-20 overflow-hidden max-w-7xl">
      <div className="flex flex-col h-full">
        <div
          // TODO: 스크롤 height 길이
          className={`flex flex-col h-full transition-all duration-300 w-full min-w-[300px] max-h-[670px]`}
        >
          {/* DM 헤더 */}
          <div className="flex-none px-6 py-4 bg-white border-b border-white-200 rounded-t-3xl shadow flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
              />
              <div className="flex items-center ml-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                  {dmData?.dmName}
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
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50" ref={chatBoxRef}>
            {loading ? (
              <div>로딩 중...</div>
            ) : messages.length === 0 ? (
              <div>채팅 본문이 없습니다.</div>
            ) : (
              messages.map((message, index) => {
                const isMyMessage = message.senderId === user?.id;
                const isFirstMessageFromUser =
                  index === 0 || messages[index - 1]?.senderId !== message.senderId;
                const isLastMessageFromSameUser =
                  index === messages.length - 1 || messages[index + 1]?.senderId !== message.senderId;

                const currentDate = new Date(message.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                });

                const previousDate =
                  index > 0
                    ? new Date(messages[index - 1]?.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })
                    : null;

                return (
                  <div key={message.id}
                    style={{
                      backgroundColor: message.id === highlightedId ? "#e0f7fa" : "rgb(249, 250, 251)",
                    }}
                    className="flex flex-col mb-2" ref={(el) => (chatRefs.current[message.id] = el)}>
                    {/* 날짜 표시 */}
                    {currentDate !== previousDate && (
                      <div className="flex justify-center items-center my-4">
                        <div className="bg-gray-200 text-gray-600 text-m py-1 px-4 rounded-full">
                          {currentDate}
                        </div>
                      </div>
                    )}

                    {/* 메시지 내용 */}
                    <div
                      className={`flex items-end ${isMyMessage ? "justify-end" : "justify-start"} mb-1`}
                    >
                      {/* 상대방 메시지 프로필 */}
                      {!isMyMessage && isFirstMessageFromUser && (
                        <div className="w-10 h-10 mr-2">
                          <img
                            src={message.userProfile || "https://via.placeholder.com/50"}
                            alt="Profile"
                            className="w-full h-full rounded-full"
                          />
                        </div>
                      )}

                      {/* 말풍선과 시간 */}
                      <div className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}>
                        {/* 상대방 이름 */}
                        {!isMyMessage && isFirstMessageFromUser && (
                          <div className="text-m text-gray-600 mb-1">{message.userName}</div>
                        )}

                        {/* 말풍선 */}
                        <div className="relative">
                          <div
                            className={`p-3 rounded-lg shadow-md text-lg ${isMyMessage ? "bg-blue-100" : "bg-gray-100"
                              } ${!isMyMessage && isFirstMessageFromUser ? "ml-0" : "ml-12"}`}
                          >
                            <p className="text-base lg:text-lg text-gray-800">{message.content}</p>
                          </div>


                          {/* 시간 표시 */}
                          {isLastMessageFromSameUser && (
                            <span
                              className={`absolute text-m text-gray-400 ${isMyMessage ? "-left-16 bottom-0" : "right-[-70px] bottom-0" // 여백 조정
                                }`}
                            >
                              {formatChatTime(message.createdAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
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
            <h3 className="text-lg font-semibold text-gray-900">{dmData?.dmName}</h3>

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
            </div>
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
                {members.map(member =>
                  <li className="flex items-center" key={member.userId}>
                    <img
                      src={member.profileImageUrl || "https://via.placeholder.com/50"}
                      alt="Profile"
                      className="w-8 h-8 mr-4 rounded-full"
                    />
                    {member.userName}
                  </li>
                )}

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
    </div>
  );
}
