import { getChannelUnreadCount } from "@/api/chattingAPI";
import React, { useEffect, useState, useRef } from "react";
import { filterMessage, isMessageFiltered } from "@/utils/messageUtils"; // 금칙어 유틸 함수 import
import { useStomp } from "@/provides/StompProvide";

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
    const [zoomLevel, setZoomLevel] = useState(1);
    const [unreadCount, setUnreadCount] = useState(null);
    const containerRef = useRef(null);
    const { isConnected, subscribe } = useStomp();

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

    // 필터링된 메시지 내용
    const filteredContent = filterMessage(message.content);

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
            {currentDate !== previousDate && (
                <div className="flex justify-center items-center my-4">
                    <div className="bg-gray-200 text-gray-600 text-m py-1 px-4 rounded-full">
                        {currentDate}
                    </div>
                </div>
            )}

            <div
                className={`flex items-end ${isMyMessage ? "justify-end" : "justify-start"} mb-1`}
            >
                {!isMyMessage && isFirstMessageFromUser && (
                    <div className="w-10 h-10 mr-2">
                        <img
                            src={message.userProfile || "https://via.placeholder.com/50"}
                            alt="Profile"
                            className="w-full h-full rounded-full"
                        />
                    </div>
                )}

                <div className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}>
                    {!isMyMessage && isFirstMessageFromUser && (
                        <div className="text-m text-gray-600 mb-1">{message.userName}</div>
                    )}

                    <div className="relative">
                        <div
                            className={`p-3 rounded-lg shadow-md text-lg ${
                                isMyMessage ? "bg-blue-100" : "bg-gray-100"
                            } ${!isMyMessage && isFirstMessageFromUser ? "ml-0" : "ml-12"}`}
                        >
                            {message.fileUrl ? (
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
                                    {filteredContent}
                                </p>
                            )}
                        </div>

                        {isMessageFiltered(filteredContent) && (
                            <p
                                style={{
                                    color: "#F87171",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                }}
                            >
                                ⚠️ 필터링된 메시지
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`text-sm text-gray-500 ${isMyMessage ? "text-right" : "text-left"}`}
            >
                {unreadCount !== null && unreadCount > 0 && `Unread: ${unreadCount}`}
            </div>
        </div>
    );
}

export default MessageItem;
