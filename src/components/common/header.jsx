import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import useAuthStore from "@/store/AuthStore";
import axiosInstance from "@/utils/axiosInstance";
import { fetchNotifications } from "@/api/notificationAPI";
import { NOTIFICATION_MY_SELECT_URI, WS_URL } from "./../../api/_URI";

export default function Header({ onToggleAside }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const stompClientRef = useRef(null); // WebSocket 클라이언트 레퍼런스

  // 서버에서 초기 알림 데이터를 가져오기
  const loadNotifications = async () => {
    if (!user?.id) {
      console.error("❌ User ID is not available for fetching notifications.");
      return;
    }

    try {
      const data = await fetchNotifications(user.id); // 외부 함수를 사용하여 알림 조회
      setNotifications(data); // 조회된 알림 데이터 상태 업데이트
      setUnreadCount(data.filter((n) => !n.isRead).length); // 읽지 않은 알림 개수 계산
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    }
  };
  useEffect(() => {
    loadNotifications(); // 컴포넌트 마운트 시 초기 알림 데이터를 가져옵니다.
  }, [user?.id]);

  // WebSocket 설정
  useEffect(() => {
    if (!user?.id) {
      console.error(
        "❌ User ID is not available. WebSocket will not be initialized."
      );
      return;
    }

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws", // WebSocket 서버 URL
      reconnectDelay: 5000, // 재연결 딜레이
      heartbeatIncoming: 4000, // Heartbeat 설정 (수신)
      heartbeatOutgoing: 4000, // Heartbeat 설정 (송신)
      debug: (msg) => console.log("🔌 WebSocket Debug:", msg), // 디버그 로그
    });

    client.onConnect = () => {
      console.log("✅ WebSocket 연결 성공");
      stompClientRef.current = client;

      // 구독 설정
      const subscription = client.subscribe(
        `/topic/notifications/${user.id}`, // 표준 WebSocket 경로
        (message) => {
          try {
            const notification = JSON.parse(message.body);
            console.log("🔔 알림 메시지 수신:", notification);

            setNotifications((prev) => [notification, ...prev]);
            setUnreadCount((prev) => prev + 1);
            setHighlight(true);
            setTimeout(() => setHighlight(false), 1000); // 강조 효과
          } catch (error) {
            console.error("❌ 메시지 처리 중 에러:", error);
          }
        }
      );

      console.log("📩 Subscribed to: /topic/notifications/" + user.id);

      return () => subscription.unsubscribe();
    };

    client.onDisconnect = () => {
      console.log("🔴 WebSocket 연결 해제");
      stompClientRef.current = null;
    };

    client.onStompError = (frame) => {
      console.error("❌ STOMP Error:", frame.headers["message"], frame.body);
    };

    try {
      client.activate();
      console.log("🔌 WebSocket 활성화 중...");
    } catch (error) {
      console.error("❌ WebSocket 활성화 중 에러:", error);
    }

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [user?.id]);

  // 알림 드롭다운 열기
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0); // 읽지 않은 알림 초기화

    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  // 로그아웃 처리
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      navigate("/login"); // 로그아웃 처리
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error.message);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 드롭다운 토글
  const toggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="z-[1000]">
      <div className="header leftside">
        <a
          href="#"
          id="openSidebarBtn"
          onClick={(e) => {
            e.preventDefault();
            onToggleAside();
          }}
        >
          <img
            src="/images/ico/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
            alt="menu"
          />
        </a>
        <h1 className="hlogo">
          <img
            className="mt-[10px]"
            src="/images/Landing/antwork_logo.png"
            alt=""
          />
        </h1>
      </div>
      <div className="header rightside">
        <div className="relative">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleNotifications();
            }}
          >
            <img
              src="/images/ico/notifications_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 copy.svg"
              alt="alarm"
              className={`transition-transform duration-300 ${
                highlight ? "animate-bounce" : ""
              }`}
            />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </a>
          {showNotifications && (
            <div className="absolute top-full right-0 w-80 bg-white shadow-lg border rounded-md">
              <div className="p-3 border-b">
                <h3 className="text-lg font-semibold">알림</h3>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className={`p-3 cursor-pointer ${
                      notification.isRead ? "text-gray-500" : "font-bold"
                    } hover:bg-gray-100`}
                  >
                    {notification.message}
                    <span className="block text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a href="#">
          <img src="/images/ico/nav_chat.svg" alt="message" />
        </a>
        <div className="user-info headeruser relative">
          <img
            src="/images/ico/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
            alt="profile"
            className="avatar"
          />
          <div className="user-details">
            <h3>{user?.name || "사용자 이름"}</h3>
            <p>{user?.team || "소속 팀"}</p>
          </div>
          <a href="#" onClick={toggleDropdown}>
            <img
              src="/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
              alt="arrow"
            />
          </a>
          {showDropdown && (
            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
              <ul>
                <li className="p-3 hover:bg-gray-100">
                  <Link to="/antwork/setting/myinfo">나의 정보 수정</Link>
                </li>
                <li className="p-3 hover:bg-gray-100">
                  <Link to="/antwork/setting">설정 페이지</Link>
                </li>
                <li className="p-3 hover:bg-gray-100">
                  <Link to="/antwork/admin">관리자 페이지</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <a href="#" onClick={handleLogout}>
          <img
            src="/images/ico/logout_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
            alt="logout"
          />
        </a>
      </div>
    </header>
  );
}
