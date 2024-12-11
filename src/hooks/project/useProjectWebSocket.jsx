import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { update } from "lodash";

const useProjectWebSocket = ({
  userId,
  projectRef,
  setCollaborators,
  collaborators,
}) => {
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!userId) {
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
        `/topic/project/${userId}`,
        (message) => {
          try {
            const data = JSON.parse(message.body); // 메시지 파싱
            console.log("🔔 알림 메시지 수신:", JSON.stringify(data));

            console.log("2222collaborators : " + collaborators);

            setCollaborators((prevCollaborators) => {
              console.log("2222prevCollaborators:", prevCollaborators); // 상태 업데이트 전에 현재 상태를 찍어봄
              const updatedCollaborators = prevCollaborators.filter(
                (collaborator) => collaborator.id !== data
              );
              console.log("updatedCollaborators:", updatedCollaborators); // 상태 업데이트 후 새 배열을 찍어봄
              return updatedCollaborators;
            });

            console.log("11111collaborators : " + collaborators);
          } catch (error) {
            console.error("❌ 메시지 처리 중 에러:", error);
          }
        }
      );

      console.log("📩 Subscribed to: /topic/project/" + userId);

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
  }, [userId]);

  return stompClientRef;
};

export default useProjectWebSocket;
