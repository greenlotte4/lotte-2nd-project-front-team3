import { getChannelUnreadCount } from "@/api/chattingAPI";
import React, { useEffect, useState, useRef } from "react";

// 1) @provides/StompProvide 에서 useStomp 훅 임포트
import { useStomp } from "@/provides/StompProvide";

/**
 * MessageItem 컴포넌트
 *
 * @param {object} props
 * @param {object} props.message - 메시지 데이터
 * @param {number} props.index - 메시지 index
 * @param {array} props.messages - 전체 메시지 목록
 * @param {object} props.user - 현재 로그인한 유저 정보
 * @param {string|number|null} props.highlightedId - 검색 등으로 하이라이트할 메시지 ID
 * @param {object} props.chatRefs - 메시지 요소를 참조하기 위한 ref
 * @param {array} props.imageMessages - (이미지 파일) 메시지 목록
 * @param {function} props.setCurrentImageIndex - 이미지 모달에서 현재 인덱스를 설정하는 함수
 * @param {number} props.currentImageIndex - 이미지 모달에서 표시 중인 인덱스
 * @param {function} props.setIsModalOpen - 이미지 모달 열고 닫는 함수
 * @param {boolean} props.isModalOpen - 이미지 모달 열림 여부
 * @param {function} props.formatChatTime - 채팅 시간 포매팅 함수
 * @param {string|number} props.channelId - 채널 ID
 */
function MessageItem({
    message,
    index,
    messages,
    user,
    highlightedId,
    chatRefs,
    imageMessages,
    setCurrentImageIndex,
    currentImageIndex,
    setIsModalOpen,
    isModalOpen,
    formatChatTime,
    channelId,
}) {
    const [zoomLevel, setZoomLevel] = useState(1); // 초기 확대 비율은 1 (100%)
    const [unreadCount, setUnreadCount] = useState(null);
    const containerRef = useRef(null);

    // 2) useStomp 훅에서 필요한 값 가져오기
    const { isConnected, subscribe } = useStomp();

    useEffect(() => {
        console.log("currentImageIndex : ", currentImageIndex)
    }, [currentImageIndex])

    const isMyMessage = message.senderId === user?.id;

    const isFirstMessageFromUser =
        index === 0 || messages[index - 1]?.senderId !== message.senderId;

    const isLastMessageFromSameUser =
        index === messages.length - 1 ||
        messages[index + 1]?.senderId !== message.senderId;

    // 현재 메시지 날짜
    const currentDate = new Date(message.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    });

    // 이전 메시지 날짜 (없으면 null)
    const previousDate =
        index > 0
            ? new Date(messages[index - 1]?.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
            })
            : null;

    // 특정 메시지의 unreadCount(안 읽은 사람 수) 가져오기
    const fetchChannelUnreadCount = async () => {
        try {
            const count = await getChannelUnreadCount({
                channelId,
                messageId: message.id,
            });
            setUnreadCount(count);
        } catch (error) {
            console.error("UnreadCount Fetch Error:", error);
        }
    };

    // (1) IntersectionObserver: 해당 메시지가 화면에 보이기 시작하면 unreadCount 갱신
    useEffect(() => {
        if (!channelId || !message?.id) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                fetchChannelUnreadCount();
                if (containerRef.current) {
                    observer.unobserve(containerRef.current);
                }
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [channelId, message?.id]);

    // (2) 채널 방문 시 unreadCount 실시간 갱신을 위한 구독
    useEffect(() => {
        // 구독 전에 조건 체크
        if (!channelId || !message?.id) return;
        if (!isConnected) return;

        // '/topic/chatting/channel/123/visit' 등으로 방문 이벤트를 받아서 unreadCount를 다시 로딩
        const unsubscribe = subscribe(
            `/topic/chatting/channel/${channelId}/visit`,
            async (msg) => {
                try {
                    // unreadCount가 아직 null(=관심 없음)이면 굳이 다시 fetch하지 않음
                    if (unreadCount === null) return;

                    console.log("방문 이벤트 감지, unreadCount 다시 로딩");
                    await fetchChannelUnreadCount();
                } catch (error) {
                    console.error("fetchChannelUnreadCount 에러:", error);
                }
            }
        );

        return () => {
            unsubscribe?.();
        };
    }, [channelId, message?.id, unreadCount, isConnected, subscribe]);

    return (
        <div
            key={message.id}
            style={{
                backgroundColor:
                    message.id === highlightedId ? "#e0f7fa" : "rgb(249, 250, 251)",
            }}
            className="flex flex-col mb-2"
            ref={(el) => {
                chatRefs.current[message.id] = el;
                containerRef.current = el;
            }}
        >
            {/* 날짜가 바뀔 때마다 날짜 표시 */}
            {currentDate !== previousDate && (
                <div className="flex justify-center items-center my-4">
                    <div className="bg-gray-200 text-gray-600 text-m py-1 px-4 rounded-full">
                        {currentDate}
                    </div>
                </div>
            )}

            {/* 메시지 내용 */}
            <div
                className={`flex items-end ${isMyMessage ? "justify-end" : "justify-start"
                    } mb-1`}
            >
                {/* 상대방 메시지라면 프로필 & 사용자명 표시 */}
                {!isMyMessage && isFirstMessageFromUser && (
                    <div className="w-10 h-10 mr-2">
                        <img
                            src={message.userProfile || "https://via.placeholder.com/50"}
                            alt="Profile"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                )}

                <div
                    className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"
                        }`}
                >
                    {/* 상대방 이름 */}
                    {!isMyMessage && isFirstMessageFromUser && (
                        <div className="text-m text-gray-600 mb-1">{message.userName}</div>
                    )}

                    {/* 말풍선 영역 */}
                    <div className="relative">
                        <div
                            className={`p-3 rounded-lg shadow-md text-lg ${isMyMessage ? "bg-blue-100" : "bg-gray-100"
                                } ${!isMyMessage && isFirstMessageFromUser ? "ml-0" : "ml-12"}`}
                        >
                            {/* 파일 메시지인지, 일반 텍스트인지 구분 */}
                            {message.fileUrl ? (
                                // 이미지를 보냈다면
                                message.fileType?.startsWith("image") ? (
                                    <img
                                        src={message.fileUrl}
                                        alt={message.fileName || "이미지"}
                                        className="max-w-[300px] h-auto rounded-md cursor-pointer"
                                        onClick={() => {
                                            const imgIndex = imageMessages.findIndex(
                                                (img) => img.id === message.id
                                            );
                                            setCurrentImageIndex(imgIndex);
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

                        {/* 이미지 모달 */}
                        {isModalOpen && message.fileType?.startsWith("image") && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="relative w-[80vw] max-w-4xl max-h-[80vh] bg-white rounded-lg border border-gray-300 p-4 flex flex-col items-center justify-center">
                                    <button
                                        onClick={() => setIsModalOpen(false)} // 모달 닫기
                                        className="absolute top-4 right-4 text-gray-800 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
                                    >
                                        ❌
                                    </button>
                                    {/* 확대/축소 가능한 이미지 */}
                                    <div
                                        className="flex items-center justify-center overflow-hidden"
                                        style={{
                                            width: "100%",
                                            height: "80vh",
                                        }}
                                    >
                                        <img
                                            src={imageMessages[currentImageIndex].fileUrl}
                                            alt={`이미지 ${currentImageIndex + 1}`}
                                            className={`rounded-md transform transition-transform duration-300 cursor-pointer ${zoomLevel > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
                                                }`}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                transform: `scale(${zoomLevel})`,
                                                objectFit: "contain",
                                            }}
                                            onClick={() =>
                                                setZoomLevel((prev) => (prev === 1 ? 1.5 : 1))
                                            }
                                        />
                                    </div>

                                    {/* 왼쪽 네비게이션 버튼 */}
                                    {currentImageIndex > 0 && (
                                        <button
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black bg-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300"
                                            onClick={() =>
                                                setCurrentImageIndex((prev) => Math.max(0, prev - 1))
                                            }
                                        >
                                            ◀
                                        </button>
                                    )}

                                    {/* 오른쪽 네비게이션 버튼 */}
                                    {currentImageIndex < imageMessages.length - 1 && (
                                        <button
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black bg-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-300"
                                            onClick={() =>
                                                setCurrentImageIndex((prev) =>
                                                    Math.min(imageMessages.length - 1, prev + 1)
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
                                className={`absolute text-m text-gray-400 ${isMyMessage ? "-left-16 bottom-0" : "right-[-70px] bottom-0"
                                    }`}
                            >
                                {formatChatTime(message.createdAt)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Unread Count 표시 영역 */}
            <div
                className={`text-sm text-gray-500 ${isMyMessage ? "text-right" : "text-left"
                    }`}
            >
                {/* unreadCount가 null이 아닐 때, 그리고 unreadCount > 0 이상일 때만 표시 */}
                {unreadCount !== null && unreadCount > 0 && `Unread: ${unreadCount}`}
            </div>
        </div>
    );
}

export default MessageItem;
