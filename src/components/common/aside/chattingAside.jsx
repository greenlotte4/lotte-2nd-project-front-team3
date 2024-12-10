import { useEffect, useState } from "react";
import { useInviteModal } from "../../../hooks/chatting/invitemodal";
import useModalStore from "../../../store/modalStore";
import useToggle from "../../../hooks/useToggle";
import { getAllChannels, getDmList } from "../../../api/chattingAPI"; // 경로 확인
import { Link, NavLink } from "react-router-dom";
import { channelStore } from "../../../store/chattingStore";
import useAuthStore from "../../../store/AuthStore"; // userId 가져오기 위한 import

export default function ChattingAside({ asideVisible, channelId, isDm }) {
  const [toggleStates, toggleState] = useToggle({
    isDMOpen: true,
    isChannelOpen: true,
    isPersonalOpen: true,
  });

  const channels = channelStore((state) => state.channels);
  const setChannels = channelStore((state) => state.setChannels);
  const [dms, setDms] = useState([]); // 디엠 방 목록 상태의 기본값을 빈 배열로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태

  const openModal = useModalStore((state) => state.openModal);
  const inviteModalProps = useInviteModal(); // 채팅방 초대 모달 props 호출

  const user = useAuthStore((state) => state.user); // user 정보가 state에 저장되어 있다고 가정
  // userId를 상태에서 가져옵니다.
  const { userId } = useAuthStore((state) => state);

  // 채널 목록을 가져오는 함수
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await getAllChannels(); // getAllChannels 함수 호출
        setChannels(response); // API에서 받은 채널 목록 상태에 저장
      } catch (error) {
        console.error("채널 목록을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    const fetchDMs = async () => {
      if (user.id) {
        try {
          const dmData = await getDmList(user.id);

          // 데이터 로깅 추가
          console.log('DM Data:', dmData);

          // 안전한 배열 설정
          if (Array.isArray(dmData)) {
            setDms(dmData);
          } else {
            // 예상치 못한 데이터 형태
            console.error('Unexpected response format:', dmData);
            setDms([]);
          }
        } catch (error) {
          console.error("디엠 목록을 가져오는 데 실패했습니다:", error);
          setDms([]);
        }
      }
    };

    fetchDMs();
  }, [user.id]);
  return (
    <aside
      className={`h-screen p-4 text-gray-800 flex flex-col shadow-xl rounded-2xl border border-gray-200 ${!asideVisible ? "hidden" : ""
        }`}
    >
      {/* Header */}
      <div className="pb-4 border-b border-gray-200 mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-black">💬 채팅</h1>
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
        <div className="flex">
          <div
            className="flex-1 flex items-center gap-4 cursor-pointer mb-3 bg-white-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
            onClick={() => toggleState("isPersonalOpen")}
          >
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-transform ${toggleStates.isPersonalOpen ? "rotate-180" : "rotate-0"
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
            <span className="text-lg font-semibold text-black">👤 개인 채팅</span>

          </div>
          <div
            className="cursor-pointer rounded-lg text-blue-500 hover:bg-blue-200 mb-3 w-[45px] flex justify-center items-center text-2xl"
            onClick={() => openModal("createDm", {})}
          >+</div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${toggleStates.isPersonalOpen ? "max-h-screen" : "max-h-0"
            }`}
        >
          <ul className="space-y-4">
            {dms.length > 0 ? (
              dms.map((dm) => (
                <li title={dm.dmName} key={dm.dmId}> {/* 각 li에 고유한 key를 추가 */}
                  <NavLink to={`/antwork/chatting/dm/${dm.dmId}`} className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
                    <img src="path/to/avatar.jpg" alt="User" className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-gray-800 text-base truncate ">
                        {dm.dmName}
                      </p>
                      <p className="text-sm text-gray-500">{dm.lastMessage ?? '새로운 메시지가 없습니다.'} </p>
                    </div>
                    <span className="text-sm text-gray-400">11:30</span>
                  </NavLink>
                </li>
              ))
            ) : (
              <li className="text-gray-500 p-3">디엠방이 없습니다.</li>
            )}

          </ul>
        </div>
      </div>
      {/* 채널 섹션 */}
      <div className="mt-6">
        <div className="flex">
          <div
            className="flex-1 gap-4 flex items-center cursor-pointer mb-3 bg-white-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
            onClick={() => toggleState("isChannelOpen")}
          >
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-transform ${toggleStates.isChannelOpen ? "rotate-180" : "rotate-0"
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
            <span className="text-lg font-semibold text-black">📢 채널</span>

          </div>
          <div
            className="cursor-pointer rounded-lg text-blue-500 hover:bg-blue-200 mb-3 w-[45px] flex justify-center items-center text-2xl"
            onClick={() => openModal("createChannel", {})}
          >+</div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${toggleStates.isChannelOpen ? "max-h-screen" : "max-h-0"
            }`}
        >

          <ul className="space-y-4">
            {channels.length > 0 ? (
              channels.map((channel) => (
                <li key={channel.id}>
                  <NavLink
                    to={`/antwork/chatting/channel/${channel.id}`}
                    className={`flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition`}
                  >
                    <img
                      src="path/to/group-icon.svg"
                      alt="Group"
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg text-gray-800">
                        {channel.name}
                      </p>
                    </div>
                    <div className="ml-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                      {channel.unreadCount}
                    </div>
                  </NavLink>
                </li>
              ))
            ) : (
              <li className="text-gray-500 p-3">채널이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>

      {/* 사용자 초대 버튼 */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <button
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white px-6 py-3 rounded-full hover:shadow-xl transition-transform hover:scale-105"
          onClick={() => {
            console.log("채널 ID 전달:", channelId); // *** 로그 추가 ***
            openModal("invite", { channelId }); // channelId를 전달
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
