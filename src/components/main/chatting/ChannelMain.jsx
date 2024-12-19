import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import {
  getChannel,
  getChannelMessages,
  getDmMessages,
  leaveChannel,
  sendChannelMessage,
  getChannelMembers,
  addChannelMember,
  changeChannelTitle,
  uploadFileToChannel,
} from "../../../api/chattingAPI";
import useToggle from "./../../../hooks/useToggle";
import useModalStore from "./../../../store/modalStore";
import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/AuthStore";
import { Client } from "@stomp/stompjs";
import { WS_URL } from "@/api/_URI";
import formatChatTime from "@/utils/chatTime";

export default function ChannelMain() {
  const [zoomLevel, setZoomLevel] = useState(1); // 초기 확대 비율은 1 (100%)
  const { id: channelId } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [messages, setMessages] = useState([]); // 메시지 상태
  const user = useAuthStore((state) => state.user);
  const chatBoxRef = useRef(null); // 채팅창 Ref
  const stompClientRef = useRef(null);
  const [members, setMembers] = useState([]);
  const [isMyChannel, setIsMyChannel] = useState(false);

  const [messageInput, setMessageInput] = useState("");

  const [searchText, setSearchText] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const chatRefs = useRef([]);
  const [isChangeTitleMode, setIsChangeTitleMode] = useState(false);
  const [titleChangeText, setTitleChangeText] = useState("");
  const [file, setFile] = useState(null); // 첨부된 파일 상태
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 현재 채널의 이미지 메시지 필터링
  const imageMessages = messages.filter((message) =>
    message.fileType?.startsWith("image")
  );

  // 이미지 모달
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentImageIndex > 0) {
        setCurrentImageIndex((prev) => Math.max(0, prev - 1));
      } else if (
        e.key === "ArrowRight" &&
        currentImageIndex < imageMessages.length - 1
      ) {
        setCurrentImageIndex((prev) =>
          Math.min(imageMessages.length - 1, prev + 1)
        );
      } else if (e.key === "Escape") {
        setIsModalOpen(false); // ESC로 모달 닫기
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImageIndex, imageMessages.length]);

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
    if (highlightedId !== null) {
      const targetElement = chatRefs.current[highlightedId];
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedId]);

  useEffect(() => {
    if (toggleStates.isSearchOpen === false) {
      setHighlightedId(null);
    }
  }, [toggleStates.isSearchOpen]);

  const handleSearch = () => {
    const foundChat = messages.find((chat) =>
      chat.content.toLowerCase().includes(searchText.toLowerCase())
    );
    if (foundChat) {
      setHighlightedId(foundChat.id);
    } else {
      setHighlightedId(null);
      alert("검색 결과가 없습니다.");
    }
  };

  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current !== null) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]);

  useEffect(() => {
    setMessageInput("");
  }, [channelId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const channel = await getChannel(channelId);
        setChannelData(channel);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const messages = await getChannelMessages(channelId);
        setMessages(messages);
        console.log(messages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchChannelMembers = async () => {
      try {
        const members = await getChannelMembers(channelId);
        console.log(`members : `, members);
        setMembers(members);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChannelMembers();
    fetchChannel();
    fetchMessages();
  }, [channelId]);

  const { openModal } = useModalStore(); // 모달 열기 함수 가져오기

  const [loading, setLoading] = useState(true); // 로딩 상태

  // 파일 전송 핸들러
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      try {
        const response = await uploadFileToChannel({
          channelId,
          file: selectedFile,
          content: `[파일] ${selectedFile.name}`,
          senderId: user?.id,
        });

        const fileMessage = {
          ...response.data, // 서버에서 반환된 메시지 데이터 활용
          createdAt: new Date(response.data.createdAt),
        };

        stompClientRef.current.publish({
          destination: `/app/chatting/channel/${channelId}/send`,
          body: JSON.stringify({
            id: fileMessage.id,
            senderId: fileMessage.senderId,
            userName: fileMessage.userName,
            content: fileMessage.content,
            createdAt: fileMessage.createdAt.toISOString(),
            fileUrl: fileMessage.fileUrl, // URL 포함 확인
            fileType: selectedFile.type, // MIME 타입
          }),
        });

        setMessages((prevMessages) => [...prevMessages, fileMessage]);
        fileInputRef.current.value = "";
      } catch (error) {
        console.error("파일 전송 실패:", error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) {
      alert("메시지를 입력하세요.");
      return;
    }

    const newMessage = {
      content: messageInput.trim(),
      senderId: user?.id,
      userName: user?.name,
      channelId,
      createdAt: new Date(),
    };

    try {
      const result = await sendChannelMessage(newMessage); // 서버 전송

      const msg = {
        id: result.data,
        senderId: user?.id,
        userName: user?.name,
        content: messageInput.trim(),
        createdAt: new Date(),
      };
      console.log(`소켓 보낸 메시지 : ${msg}`);
      stompClientRef.current.publish({
        destination: `/app/chatting/channel/${channelId}/send`,
        body: JSON.stringify(msg),
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]); // 즉시 상태 업데이트
      setMessageInput(""); // 입력 초기화
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  const handleJoin = async () => {
    if (confirm("해당 방에 참여하시겠습니까") == false) {
      return;
    }

    try {
      const addMembers = await addChannelMember(channelId, [user]);
      console.log("채널 참여 성공 : ", addMembers);
      setMembers((prev) => [...prev, ...addMembers]);
    } catch (error) {
      console.error("채널 참여 실패");
    }
  };

  useEffect(() => {
    setIsMyChannel(members.some((member) => member.userId === user.id));
  }, [members, user.id]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await getDmMessages(1);

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

  // WebSocket 연결 설정
  useEffect(() => {
    if (!user?.id || !channelId) {
      console.error("❌ User ID 또는 Channel ID가 없어요.");
      return;
    }

    const client = new Client({
      // brokerURL: "ws://localhost:8080/ws", // 로컬
      brokerURL: WS_URL, // WebSocket 서버 URL
      reconnectDelay: 5000, // 재연결 딜레이
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (msg) => console.log("🔌 [ChannelMain.jsx] WebSocket Debug:", msg),
    });

    client.onConnect = () => {
      console.log("✅ [channel] WebSocket 연결 성공");
      stompClientRef.current = client;

      client.subscribe(
        `/topic/chatting/channel/${channelId}/messages`,
        (message) => {
          try {
            const newMessage = JSON.parse(message.body);
            if (newMessage.senderId === user?.id) {
              return;
            }
            console.log("📩 새 메시지 수신:", newMessage); // 메시지 수신 확인
            setMessages((prevMessages) => {
              return [...prevMessages, newMessage];
            });
          } catch (error) {
            console.error("❌ 메시지 처리 중 에러:", error);
          }
        }
      );
    };

    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [user?.id, channelId]); // 의존성 배열

  return (
    //     <div className="w-full max-w-9xl mx-auto px-6 py-12 space-y-8 bg-white min-h-screen">
    <div className="w-[100%] rounded-3xl shadow-md z-20 overflow-hidden max-w-7xl">
      <div className="flex h-full">
        {/* 메인 채팅 영역 */}
        <div
          // TODO: 스크롤 height 길이
          className={`flex flex-col h-full transition-all duration-300 w-full min-w-[300px] max-h-[670px]`}
        >
          {/* 채팅 헤더 */}
          <div className="flex-none px-6 py-4 bg-white border-b border-white-200 rounded-t-3xl shadow flex items-center justify-between">
            {/* 프로필 섹션 */}
            <div className="flex items-stretch">
              {/* <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
              /> */}
              {isChangeTitleMode ? (
                <div className="flex items-stretch ml-4 text-[22.5px]">
                  <input
                    type="text"
                    value={titleChangeText}
                    onChange={(e) => {
                      setTitleChangeText(e.target.value);
                    }}
                  />
                  <button
                    className="font-semibold text-blue-500 text-[12px]"
                    onClick={async () => {
                      try {
                        await changeChannelTitle({
                          channelId,
                          name: titleChangeText,
                        });
                        setChannelData((prev) => ({
                          ...prev,
                          name: titleChangeText,
                        }));
                        setIsChangeTitleMode((prev) => !prev);
                      } catch (err) {
                        console.error("이름 수정 실패 : ", err);
                      }
                    }}
                  >
                    변경
                  </button>
                </div>
              ) : (
                <div className="flex items-center ml-4 gap-2">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                    {channelData?.name}
                  </h1>
                  {channelData?.ownerId === user.id ? (
                    <button
                      className="font-semibold text-blue-500"
                      onClick={() => {
                        setIsChangeTitleMode((prev) => !prev);
                        setTitleChangeText(channelData?.name);
                      }}
                    >
                      편집
                    </button>
                  ) : null}
                </div>
              )}
            </div>

            {/* 아이콘 섹션 */}
            <div className="flex items-center space-x-4">
              {/* 고정핀 아이콘 */}
              <button
                className="p-2 rounded-full hover:bg-gray-300 focus:outline-none "
                onClick={() => {
                  console.log("고정핀 기능 실행");
                }}
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
                      value={searchText}
                      placeholder="검색어를 입력하세요."
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md transition-all duration-300"
                      style={{ width: "200px" }}
                    />
                    {/* 입력 지우기 버튼 */}
                    {searchText && (
                      <button
                        className="absolute right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={() => setSearchText("")}
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
                  onClick={onClickLeaveButton()}
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

          <div
            className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50"
            ref={chatBoxRef}
          >
            {loading ? (
              <div>로딩 중...</div>
            ) : messages.length === 0 ? (
              <div>채팅 본문이 없습니다.</div>
            ) : (
              messages.map((message, index) => {
                const isMyMessage = message.senderId === user?.id;
                const isFirstMessageFromUser =
                  index === 0 ||
                  messages[index - 1]?.senderId !== message.senderId;
                const isLastMessageFromSameUser =
                  index === messages.length - 1 ||
                  messages[index + 1]?.senderId !== message.senderId;

                const currentDate = new Date(
                  message.createdAt
                ).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                });

                const previousDate =
                  index > 0
                    ? new Date(
                        messages[index - 1]?.createdAt
                      ).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })
                    : null;

                return (
                  <div
                    key={message.id}
                    style={{
                      backgroundColor:
                        message.id === highlightedId
                          ? "#e0f7fa"
                          : "rgb(249, 250, 251)",
                    }}
                    className="flex flex-col mb-2"
                    ref={(el) => (chatRefs.current[message.id] = el)}
                  >
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
                      className={`flex items-end ${
                        isMyMessage ? "justify-end" : "justify-start"
                      } mb-1`}
                    >
                      {/* 상대방 메시지 프로필 & 이름 */}
                      {!isMyMessage && isFirstMessageFromUser && (
                        <div className="w-10 h-10 mr-2">
                          <img
                            src={
                              message.userProfile ||
                              "https://via.placeholder.com/50"
                            }
                            alt="Profile"
                            className="w-full h-full rounded-full"
                          />
                        </div>
                      )}

                      {/* 말풍선과 시간 */}
                      <div
                        className={`flex flex-col ${
                          isMyMessage ? "items-end" : "items-start"
                        }`}
                      >
                        {/* 상대방 이름 */}
                        {!isMyMessage && isFirstMessageFromUser && (
                          <div className="text-m text-gray-600 mb-1">
                            {message.userName}
                          </div>
                        )}

                        {/* 말풍선 */}
                        <div className="relative">
                          <div
                            className={`p-3 rounded-lg shadow-md text-lg ${
                              isMyMessage ? "bg-blue-100" : "bg-gray-100"
                            } ${
                              !isMyMessage && isFirstMessageFromUser
                                ? "ml-0"
                                : "ml-12"
                            }`}
                          >
                            {message.fileUrl ? (
                              // 이미지파일
                              message.fileType?.startsWith("image") ? (
                                <img
                                  src={message.fileUrl}
                                  alt={message.fileName || "이미지"}
                                  className="max-w-full h-auto rounded-md cursor-pointer"
                                  onClick={() => {
                                    const index = imageMessages.findIndex(
                                      (img) => img.id === message.id
                                    );
                                    setCurrentImageIndex(index);
                                    setIsModalOpen(true);
                                  }}
                                />
                              ) : (
                                // 일반 파일
                                <a
                                  href={message.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline hover:text-blue-700"
                                  download
                                >
                                  {message.content || "파일 열기"}
                                </a>
                              )
                            ) : (
                              // 텍스트 메시지
                              <p className="text-base lg:text-lg text-gray-800">
                                {message.content}
                              </p>
                            )}
                          </div>

                          {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                              {/* 모달 박스 */}
                              <div className="relative w-[80vw] max-w-4xl max-h-[80vh] bg-white rounded-lg border border-gray-300 p-4 flex flex-col items-center justify-center">
                                {/* 닫기 버튼 */}
                                <button
                                  onClick={() => setIsModalOpen(false)} // 모달 닫기
                                  className="absolute top-4 right-4 text-gray-800 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
                                >
                                  ❌
                                </button>

                                {/* 이미지 */}
                                <div
                                  className="flex items-center justify-center overflow-hidden"
                                  style={{
                                    width: "100%", // 모달 너비
                                    height: "80vh", // 모달 높이
                                  }}
                                >
                                  <img
                                    src={
                                      imageMessages[currentImageIndex]?.fileUrl
                                    }
                                    alt={`이미지 ${currentImageIndex + 1}`}
                                    className={`rounded-md transform transition-transform duration-300 cursor-pointer ${
                                      zoomLevel > 1
                                        ? "cursor-zoom-out"
                                        : "cursor-zoom-in"
                                    }`}
                                    style={{
                                      maxWidth: "100%", // 모달 너비에 맞춤
                                      maxHeight: "100%", // 모달 높이에 맞춤
                                      transform: `scale(${zoomLevel})`, // 확대/축소 적용
                                      objectFit: "contain", // 이미지가 비율에 맞게 조정됨
                                    }}
                                    onClick={
                                      () =>
                                        setZoomLevel((prev) =>
                                          prev === 1 ? 1.5 : 1
                                        ) // 클릭 시 확대/축소 전환
                                    }
                                  />
                                </div>

                                {/* 왼쪽 네비게이션 버튼 */}
                                {currentImageIndex > 0 && (
                                  <button
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black bg-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300"
                                    onClick={() =>
                                      setCurrentImageIndex((prev) =>
                                        Math.max(0, prev - 1)
                                      )
                                    }
                                  >
                                    ◀
                                  </button>
                                )}

                                {/* 오른쪽 네비게이션 버튼 */}
                                {currentImageIndex <
                                  imageMessages.length - 1 && (
                                  <button
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black bg-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300"
                                    onClick={() =>
                                      setCurrentImageIndex((prev) =>
                                        Math.min(
                                          imageMessages.length - 1,
                                          prev + 1
                                        )
                                      )
                                    }
                                  >
                                    ▶
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* 시간 표시 */}
                          {isLastMessageFromSameUser && (
                            <span
                              className={`absolute text-m text-gray-400 ${
                                isMyMessage
                                  ? "-left-16 bottom-0"
                                  : "right-[-70px] bottom-0" // 여백 조정
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
          <div className="flex-none px-6 py-4 bg-white border-t border-gray-200 rounded-b-3xl">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                disabled={!isMyChannel}
                placeholder={
                  isMyChannel
                    ? "메시지를 입력하세요."
                    : "💡채널에 참여하면 바로 메시지를 보낼 수 있습니다. '참여' 버튼을 눌러 함께 대화해보세요! "
                }
                className="flex-1 border border-gray-300 rounded-full px-6 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              {/* 파일 첨부 버튼 */}
              <button
                className="p-3 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src="/images/ico/file.svg" alt="Attach" />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange} // 파일 변경 시 자동 전송
                />
              </button>

              {/* 전송 버튼 */}
              {isMyChannel ? (
                <button
                  className="ml-4 px-6 py-3 text-lg font-semibold rounded-full shadow-md"
                  style={{ backgroundColor: "#eff6ff", color: "gray-800" }}
                  onClick={handleSendMessage}
                >
                  전송
                </button>
              ) : (
                <button
                  className="ml-4 px-6 py-3 text-lg font-semibold rounded-full shadow-md"
                  style={{ backgroundColor: "#eff6ff", color: "gray-800" }}
                  onClick={handleJoin}
                >
                  참여
                </button>
              )}
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
              <img src="/images/ico/closechat.svg"></img>
            </button>

            {/* 채팅방 이름 */}
            <h3 className="text-lg font-semibold text-gray-900">
              {channelData?.name}
            </h3>
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
              <h3 className="text-lg font-semibold mb-2">채널 멤버</h3>
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
                {members.map((member) => (
                  <li className="flex items-center" key={member.userId}>
                    <img
                      src={
                        member.profileImageUrl ||
                        "https://via.placeholder.com/50"
                      }
                      alt="Profile"
                      className="w-8 h-8 mr-4 rounded-full"
                    />
                    {member.userName}
                  </li>
                ))}
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
          {/* 사용자 초대 버튼 */}
          <div className=" pt-6 mt-6">
            <button
              className="w-full flex items-center justify-center gap-4 bg-blue-500 text-white px-6 py-3 rounded-md text-[16px] hover:shadow-xl transition-transform hover:scale-105"
              onClick={() => openModal("invite", { channelId })}
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
              <span className="font-semibold">사용자 추가</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function onClickLeaveButton() {
    return async () => {
      if (user === null) return;

      const proceed = confirm("정말 방에서 나가시겠습니까?");
      if (proceed) {
        console.log(user?.id);
        await leaveChannel({ channelId, userId: user?.id });
        console.log("나가기 성공");
      } else {
      }
    };
  }
}
