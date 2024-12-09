import React, { useState } from "react";

export default function AdminNotification() {
  const [message, setMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("전체"); // 사용자 그룹 선택
  const [notifications, setNotifications] = useState([
    {
      message: "첫 번째 알림",
      group: "전체",
      createdAt: "2024-12-08T10:00:00Z",
    },
    {
      message: "두 번째 알림",
      group: "관리자",
      createdAt: "2024-12-08T12:30:00Z",
    },
    {
      message: "세 번째 알림",
      group: "개발팀",
      createdAt: "2024-12-08T15:45:00Z",
    },
  ]);

  // 알림 전송 함수
  const sendNotification = () => {
    if (!message.trim()) {
      alert("메시지를 입력해주세요!");
      return;
    }
    const newNotification = {
      message,
      group: selectedGroup,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]); // 새 알림 추가
    alert("알림이 전송되었습니다!");
    setMessage(""); // 입력 초기화
  };

  // 알림 삭제 함수
  const deleteNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index)); // 해당 인덱스 알림 제거
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 페이지 헤더 */}
      <h1 className="text-2xl font-bold mb-4 text-gray-700">알림 관리</h1>

      {/* 알림 작성 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">알림 작성</h2>
        <textarea
          className="w-full h-28 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="알림 메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <select
          className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="전체">전체</option>
          <option value="관리자">관리자</option>
          <option value="개발팀">개발팀</option>
          <option value="마케팅팀">마케팅팀</option>
        </select>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 hover:bg-blue-600"
          onClick={sendNotification}
        >
          전송하기
        </button>
      </div>

      {/* 기존 알림 목록 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          전송된 알림
        </h2>
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m4 4h1v-4h1m-6 4H9v-4H8m8-4h1v-1a2 2 0 00-2-2h-4a2 2 0 00-2 2v1h8z"
              />
            </svg>
            <p className="text-lg font-medium">전송된 알림이 없습니다.</p>
            <p className="text-sm">새로운 알림을 작성하고 전송하세요.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <span className="text-gray-700">{notification.message}</span>
                  <span className="text-sm text-gray-500 block">
                    {notification.group} 그룹 •{" "}
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => deleteNotification(index)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
