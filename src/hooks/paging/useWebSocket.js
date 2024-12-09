export const useWebSocket = (id, componentId, onMessage) => {
  const [client, setClient] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!id || !componentId) return;

    const wsClient = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      // ... 기타 설정
    });

    // ... WebSocket 설정 및 연결 로직

    return () => {
      if (wsClient.active) {
        wsClient.deactivate();
      }
    };
  }, [id, componentId, onMessage]);

  return { client, clientRef };
}; 