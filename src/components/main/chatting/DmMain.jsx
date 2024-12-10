import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getDm,
  getDmMessages,
  sendDmMessage,
} from "../../../api/chattingAPI";
import useToggle from "./../../../hooks/useToggle";
import useAuthStore from "../../../store/AuthStore";

export default function DmMain() {
  const { id: dmId } = useParams();
  const [dmData, setDmData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  const [toggleStates, toggleState] = useToggle({
    isSearchOpen: false,
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

    try {
      await sendDmMessage({
        dmId,
        content: messageInput,
        senderId: user?.id,
      });
      setMessageInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

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
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          {loading ? (
            <div>로딩 중...</div>
          ) : messages.length === 0 ? (
            <div>메시지가 없습니다.</div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user?.id ? "justify-end" : ""}`}
              >
                <div
                  className={`p-4 max-w-xs rounded-lg shadow ${
                    message.senderId === user?.id ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <p>{message.content}</p>
                  <small className="text-gray-500">{message.createdAt}</small>
                </div>
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
