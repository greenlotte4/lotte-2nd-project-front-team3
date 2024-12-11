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
  const [toggleStates, toggleState] = useToggle({
    isSearchOpen: false,
  });

  useEffect(() => {
    const fetchDm = async () => {
      // try {
      //   const dm = await getDm(dmId);
      //   setDmData(dm);
      // } catch (error) {
      //   console.error(error);
      // }
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
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <h1 className="ml-4 text-xl font-semibold text-gray-900">
              {dmData?.name}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-300"
              onClick={() => toggleState("isSearchOpen")}
            >
              <img src="/images/ico/돋보기.svg" alt="Search" className="w-6 h-6" />
            </button>
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
                  src="https://via.placeholder.com/50"
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
    </div>
  );
}
