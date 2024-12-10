import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { WS_URL } from "@/api/_URI";

export const useWebSocket = ({
  uid,
  id,
  componentId,
  handleWebSocketMessage,
  setStompClient,
  stompClientRef,
}) => {
  useEffect(() => {
    if (!uid || !id || !componentId) {
      console.log("❌ Missing required data:", {
        uid,
        pageId: id,
        componentId,
      });
      return;
    }

    console.log("Initializing WebSocket connection");
    const client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: function (str) {
        console.log("🔌 WebSocket Debug:", str);
      },
    });

    client.configure({
      onConnect: () => {
        console.log("🔌 Connected to WebSocket");
        setStompClient(client);
        stompClientRef.current = client;

        const subscriptions = [`/topic/page/${id}`, `/topic/page/${id}/status`];
        console.log("📩 Subscribing to channels:", subscriptions);

        subscriptions.forEach((channel) => {
          client.subscribe(channel, handleWebSocketMessage);
        });

        const initialStatus = {
          componentId: componentId,
          type: "EDITOR_STATUS",
          pageId: id,
          uid: uid,
          status: "viewing",
          timestamp: Date.now(),
        };

        client.publish({
          destination: `/app/page/${id}/status`,
          body: JSON.stringify(initialStatus),
        });
      },
      onDisconnect: () => {
        console.log("🔴 Disconnected from WebSocket");
        setStompClient(null);
        stompClientRef.current = null;
      },
      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
      },
    });

    try {
      console.log("🔌 Activating WebSocket client");
      client.activate();
    } catch (error) {
      console.error("❌ Error activating WebSocket:", error);
    }

    return () => {
      if (client.active) {
        console.log("🔌 Cleaning up WebSocket connection");
        client.deactivate();
      }
    };
  }, [
    id,
    componentId,
    uid,
    handleWebSocketMessage,
    setStompClient,
    stompClientRef,
  ]);
};
