import { getChannelUnreadCount } from "@/api/chattingAPI";
import React, { useEffect, useState, useRef } from "react";

function MessageItem({
    message,
    index,
    messages,
    user,
    highlightedId,
    chatRefs,
    imageMessages,
    setCurrentImageIndex,
    setIsModalOpen,
    isModalOpen,
    formatChatTime,
    channelId,
    stompClientRef
}) {
    const [unreadCount, setUnreadCount] = useState(null);
    const containerRef = useRef(null);

    const isMyMessage = message.senderId === user?.id;
    const isFirstMessageFromUser =
        index === 0 || messages[index - 1]?.senderId !== message.senderId;
    const isLastMessageFromSameUser =
        index === messages.length - 1 ||
        messages[index + 1]?.senderId !== message.senderId;

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
    const fetchChannelUnreadCount = async () => {
        try {
            const count = await getChannelUnreadCount({ channelId, messageId: message.id });
            setUnreadCount(count);
        } catch (error) {
            console.error("UnreadCount Fetch Error:", error);
        }
    };

    useEffect(() => {
        if (!channelId || !message?.id) return;
        console.log("MOUNT");


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

    useEffect(() => {
        console.log(`stomp : `, stompClientRef)
        stompClientRef.subscribe(
            `/topic/chatting/channel/${channelId}/visit`,
            async (msg) => {
                try {
                    if (unreadCount === null)
                        return;
                    console.log("제발방문")
                    await fetchChannelUnreadCount();
                } catch (error) {
                    console.error("fetchChannelUnreadCount 에러:", error);
                }
            }
        );
    }, [channelId, unreadCount])


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
                className={`flex items-end ${isMyMessage ? "justify-end" : "justify-start"
                    } mb-1`}
            >
                {/* 상대방 메시지 프로필 & 이름 */}
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
                <div
                    className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"
                        }`}
                >
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
                            {message.fileUrl ? (
                                message.fileType?.startsWith("image") ? (
                                    <img
                                        src={message.fileUrl}
                                        alt={message.fileName || "이미지"}
                                        className="max-w-full h-auto rounded-md cursor-pointer"
                                        onClick={() => {
                                            const imgIndex = imageMessages.findIndex(
                                                (img) => img.id === message.id
                                            );
                                            setCurrentImageIndex(imgIndex);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                ) : (
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
                                <p className="text-base lg:text-lg text-gray-800">
                                    {message.content}
                                </p>
                            )}
                        </div>

                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="relative w-[80vw] max-w-4xl max-h-[80vh] bg-white rounded-lg border border-gray-300 p-4 flex flex-col items-center justify-center">
                                    <button
                                        onClick={() => setIsModalOpen(false)} // 모달 닫기
                                        className="absolute top-4 right-4 text-gray-800 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
                                    >
                                        ❌
                                    </button>
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
                {/* unreadCount가 null이 아닐 때, 그리고 unreadCount > 1일 때만 표시 */}
                {unreadCount !== null && unreadCount > 0 && `Unread: ${unreadCount}`}
            </div>
        </div>
    );
}

export default MessageItem;
