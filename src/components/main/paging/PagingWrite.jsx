import React, { useEffect, useRef, useState, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_FETCH_URI, PAGE_CREATE_URI } from "../../../api/_URI";
import axiosInstance from "@utils/axiosInstance";
import { useThrottle } from "../../../hooks/paging/useThrottle";
import { useWebSocketMessage } from "../../../hooks/paging/useWebSocketMessage";
import { useEditor } from "../../../hooks/paging/useEditor";
import { useWebSocket } from "../../../hooks/paging/useWebSocket";
import useAuthStore from "@/store/AuthStore";
const PagingWrite = () => {
  // 기본 상태들
  const [title, setTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [componentId, setComponentId] = useState(null);

  // location & navigation - 주소값에서 id값 찾기
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(searchParams.get("id"));

  // refs
  const editorRef = useRef(null);

  // stompClient ref
  const stompClientRef = useRef(null);

  // 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);
  const uid = user?.uid;

  // uid 체크 로그인 안되어 있으면 로그인 페이지로
  useEffect(() => {
    if (!uid) {
      console.warn("User ID is not available");
      navigate("/login"); // 로그인 페이지로 리다이렉트
      return;
    }
  }, [uid, navigate]);

  // WebSocket 메시지 핸들러
  const handleWebSocketMessage = useWebSocketMessage(
    editorRef,
    componentId,
    id,
    setTitle
  );

  // content 수정 - throttle된 브로드캐스트 함수 생성
  const throttledBroadcast = useThrottle(async (savedData) => {
    console.log("throttledBroadcast - throttle된 브로드캐스트 함수 실행");
    if (stompClientRef.current?.active) {
      const currentId = new URLSearchParams(window.location.search).get("id");
      const message = {
        _id: currentId,
        content: JSON.stringify(savedData),
        componentId: componentId,
        timestamp: Date.now(),
        uid: uid,
      };

      stompClientRef.current.publish({
        destination: `/app/page/${id}`,
        body: JSON.stringify(message),
      });
    }
  }, 500); // 500ms 쓰로틀

  // Editor 훅 사용
  const createEditor = useEditor(throttledBroadcast);

  // 에디터 초기화 함수
  const initializeEditor = useCallback(
    async (initialContent = null) => {
      console.log("initializeEditor - 에디터 초기화 시작");
      try {
        if (
          editorRef.current &&
          typeof editorRef.current.destroy === "function"
        ) {
          await editorRef.current.destroy();
          editorRef.current = null;
        }

        const editor = await createEditor(initialContent);
        editorRef.current = editor;
        return editor;
      } catch (error) {
        console.error("Error initializing editor:", error);
      }
    },
    [createEditor]
  );

  // 페이지 데이터 가져오기
  const fetchPageData = async (pageId) => {
    try {
      console.log("Fetching data for page:", pageId);
      const response = await axiosInstance.get(`${PAGE_FETCH_URI}/${pageId}`);
      const data = response.data;
      setTitle(data.title);
      const parsedContent =
        typeof data.content === "string"
          ? JSON.parse(data.content)
          : data.content;

      await initializeEditor(parsedContent);
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };

  // 페이지 초기화 useEffect
  useEffect(() => {
    if (!uid) return;

    const initializePage = async () => {
      const params = new URLSearchParams(location.search);
      const pageId = params.get("id");

      if (!pageId) {
        // 새 페이지 생성
        try {
          const response = await axiosInstance.post(PAGE_CREATE_URI, {
            title: "",
            content: "",
            owner: uid,
          });

          const newId = response.data;
          setId(newId);
          setSearchParams({ id: newId });
          await initializeEditor();
        } catch (error) {
          console.error("Error creating new page:", error);
        }
      } else {
        // 기존 페이지 데이터 가져오기
        setId(pageId);
        await fetchPageData(pageId);
      }
    };

    initializePage();
  }, [uid, location.search]);

  // WebSocket 훅 사용
  useWebSocket({
    uid,
    id,
    componentId,
    handleWebSocketMessage,
    setStompClient,
    stompClientRef,
  });

  // 신 이 함수 사용
  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  useEffect(() => {
    console.log("useEffect - componentId 초기화 시작");
    if (!componentId) {
      const id = generateUUID(); // uuidv4() 대신 generateUUID() 사용
      setComponentId(id);
      console.log("🔍 Component ID initialized:", id);
    }
  }, []);

  // 제목 변경 핸들러
  const handleTitleChange = async (e) => {
    console.log("handleTitleChange - 제목 변경 처리 시작");
    const newTitle = e.target.value;
    setTitle(newTitle);

    try {
      if (!componentId || !stompClientRef.current?.active) {
        console.warn("Cannot broadcast title change:", {
          componentId,
          isConnected: stompClientRef.current?.active,
        });
        return;
      }

      if (editorRef.current) {
        const currentContent = await editorRef.current.save();
        const changes = {
          _id: id,
          title: newTitle,
          content: JSON.stringify(currentContent),
          timestamp: Date.now(),
          componentId: componentId,
          uid: uid,
        };

        stompClientRef.current.publish({
          destination: `/app/page/${id}`,
          body: JSON.stringify(changes),
        });
      }
    } catch (error) {
      console.error("❌ 제목 변경 중 에러:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect - location 변경 감지");
    const params = new URLSearchParams(location.search);
    const newId = params.get("id");

    if (newId !== id) {
      // WebSocket 연결 정리
      if (stompClientRef.current?.active) {
        stompClientRef.current.deactivate();
      }

      // 에디터 정리
      if (editorRef.current) {
        editorRef.current.destroy();
      }

      // 새 id로 상태 업데이트
      setId(newId);

      // 에디터 다시 초기화
      initializeEditor();
    }
  }, [location.search]); // URL 변경 감지

  return (
    <div className="w-full">
      <article className="page-list pageWrite content">
        <div className="content-header flex justify-between items-center">
          <h2>{id ? "My Page" : "New Page"}</h2>
          <div className="relative menu-container">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <BsThreeDotsVertical className="text-gray-500 text-xl" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 p-4 !pb-0 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <div className="border-t border-gray-300 border-b border-gray-300 p-3">
                    <button
                      onClick={handleDeletePage}
                      className="w-full px-4 py-3 text-[14px] text-red-600 hover:bg-gray-100 hover:rounded-[10px] text-left"
                    >
                      페이지 삭제
                    </button>
                    <button className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left bt-black-200"></button>
                  </div>
                  <div className="p-3">
                    <button className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left">
                      페이지 설정
                      <p className="!text-[11px] !text-slate-400 mt-[2px]">
                        &nbsp;설정페지 동
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <article className="page-list !-5mt !border-none w-full">
          <div className="content-header">
            <input
              className="text-[30px] text-gray-500 !border-none focus:outline-none flex-1"
              placeholder="새 페이지"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div
            id="editorjs"
            className="editorSection min-h-[800px] !h-[auto] !mt-14"
          ></div>
        </article>
      </article>
    </div>
  );
};

export default PagingWrite;
