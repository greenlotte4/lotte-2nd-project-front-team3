import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PAGE_FETCH_URI,
  PAGE_SAVE_URI,
  PAGE_IMAGE_UPLOAD_URI,
  PAGE_DELETE_URI,
  PAGE_CREATE_URI,
  WS_URL,
} from "../../../api/_URI";
import { Client } from "@stomp/stompjs";
import axios from "axios";

const PagingWrite = () => {
  // 기본 상태들
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [componentId, setComponentId] = useState(null);
  const [isCurrentEditor, setIsCurrentEditor] = useState(false);
  const [activeEditor, setActiveEditor] = useState(null);

  // refs
  const editorRef = useRef(null);
  const contentRef = useRef(null);

  // location & navigation
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [id, setId] = useState(queryParams.get("id"));

  // stompClient ref 추가
  const stompClientRef = useRef(null);

  // WebSocket 메시지 핸들러 수정
  const handleWebSocketMessage = async (message) => {
    try {
      const data = JSON.parse(message.body);
      console.log("Received message:", data);

      if (componentId === data.componentId) {
        console.log("Ignoring own changes");
        return;
      }

      // 제목 변경 처리
      if (data.title) {
        setTitle(data.title);
      }

      // 내용 변경 처리 - DOM 직접 조작
      if (data.content && editorRef.current) {
        try {
          const newContent =
            typeof data.content === "string"
              ? JSON.parse(data.content)
              : data.content;

          const editorElement = document.getElementById("editorjs");
          const currentBlocks = await editorRef.current.save();

          // 블록 개수가 다른 경우 전체 업데이트
          if (currentBlocks.blocks.length !== newContent.blocks.length) {
            await editorRef.current.render(newContent);
            return;
          }

          // 각 블록 업데이트
          newContent.blocks.forEach((block, index) => {
            const blockElement = editorElement.querySelector(
              `[data-id="${block.id}"]`
            );
            if (blockElement) {
              const currentBlock = currentBlocks.blocks[index];

              // 블록 타입이 다른 경우
              if (currentBlock.type !== block.type) {
                editorRef.current.blocks.update(index, block);
                return;
              }

              // 텍스트 블록인 경우
              if (block.type === "paragraph") {
                const textElement = blockElement.querySelector(
                  '[contenteditable="true"]'
                );
                if (textElement && textElement.innerHTML !== block.data.text) {
                  textElement.innerHTML = block.data.text;
                }
              }
              // 헤더인 경우
              else if (block.type === "header") {
                const headerElement = blockElement.querySelector(
                  '[contenteditable="true"]'
                );
                if (
                  headerElement &&
                  headerElement.innerHTML !== block.data.text
                ) {
                  headerElement.innerHTML = block.data.text;
                }
              }
              // 리스트인 경우
              else if (block.type === "list") {
                const listItems = blockElement.querySelectorAll(
                  '[contenteditable="true"]'
                );
                block.data.items.forEach((item, i) => {
                  if (listItems[i] && listItems[i].innerHTML !== item) {
                    listItems[i].innerHTML = item;
                  }
                });
              }
              // 이미지인 경우
              else if (block.type === "image") {
                const imgElement = blockElement.querySelector("img");
                if (imgElement && imgElement.src !== block.data.file.url) {
                  imgElement.src = block.data.file.url;
                }
              }
            }
          });
        } catch (error) {
          console.error("Error updating content:", error);
          // 에러 발생 시 전체 업데이트로 폴백
          await editorRef.current.render(newContent);
        }
      }
    } catch (error) {
      console.error("Error in handleWebSocketMessage:", error);
    }
  };

  // 공통 방송 함수
  const broadcastChanges = async (newTitle, newContent) => {
    if (!componentId) {
      console.warn("Component ID is null, cannot broadcast changes.");
      return;
    }
    try {
      console.log(
        "📡 Broadcasting attempt - WebSocket status:",
        stompClient?.active
      );

      if (!stompClient?.active) {
        console.log("❌ WebSocket not active, attempting reconnection...");
        return;
      }
      console.log(" Component ID in broadcastChanges:", componentId);
      const changes = {
        _id: id,
        title: newTitle,
        content: JSON.stringify(newContent),
        uid: "ghkdtnqls95",
        timestamp: Date.now(),
        componentId: componentId,
      };

      console.log(" Broadcasting changes:", changes);
      stompClient.publish({
        destination: `/app/page/${id}`,
        body: JSON.stringify(changes),
      });
      console.log("✅ Broadcast successful");
    } catch (error) {
      console.error("❌ Error broadcasting changes:", error);
    }
  };

  // EditorJS 초기화 및 변경 감지 핸들러
  const createEditor = async (initialData = null) => {
    console.log("🎯 에디터 생성:", { initialData: !!initialData });

    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3, 4],
            defaultLevel: 1,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            caption: false,
            uploader: {
              uploadByFile: async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                try {
                  const response = await axios.post(
                    PAGE_IMAGE_UPLOAD_URI,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  return { success: 1, file: { url: response.data } };
                } catch (error) {
                  console.error("Upload failed:", error);
                  return { success: 0, message: "Upload failed" };
                }
              },
            },
          },
        },
      },
      data: initialData,
      onReady: () => {
        const editorElement = document.getElementById("editorjs");
        editorElement.addEventListener("input", async () => {
          try {
            const savedData = await editor.save();
            if (stompClientRef.current?.active) {
              const message = {
                _id: id,
                content: JSON.stringify(savedData),
                componentId: componentId,
                timestamp: Date.now(),
              };

              stompClientRef.current.publish({
                destination: `/app/page/${id}`,
                body: JSON.stringify(message),
              });
            }
          } catch (error) {
            console.error("Error in input handler:", error);
          }
        });
      },
    });

    await editor.isReady;
    console.log("🚀 Editor initialized successfully");
    return editor;
  };

  // 페이지 데이터 가져오기
  const fetchPageData = async () => {
    try {
      const response = await axios.get(`${PAGE_FETCH_URI}/${id}`);
      const data = response.data;
      const parsedContent = JSON.parse(data.content);

      setTitle(data.title);
      contentRef.current = parsedContent;

      if (editorRef.current) {
        await editorRef.current.render(parsedContent);
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };

  // 에디터 초기화 useEffect 수정
  useEffect(() => {
    if (!id || !componentId) {
      console.log("Waiting for IDs...", { id, componentId });
      return;
    }

    const initializeEditor = async () => {
      try {
        const response = await axios.get(`${PAGE_FETCH_URI}/${id}`);
        const data = response.data;
        setTitle(data.title);
        const parsedContent =
          typeof data.content === "string"
            ? JSON.parse(data.content)
            : data.content;
        const editor = await createEditor(parsedContent);
        editorRef.current = editor;
      } catch (error) {
        console.error("Error initializing editor:", error);
      }
    };

    initializeEditor();
  }, [id, componentId]); // componentId를 의존성 배열에 추가

  // WebSocket 구독 수정
  useEffect(() => {
    if (!id || !componentId) {
      console.log("❌ Missing required IDs:", { pageId: id, componentId });
      return;
    }

    console.log(" Initializing WebSocket connection");
    const client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 2000,
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
      debug:
        process.env.NODE_ENV === "development"
          ? (str) => console.log("🔌 WebSocket Debug:", str)
          : null,
    });

    client.configure({
      onConnect: () => {
        console.log(" Connected to WebSocket");
        setStompClient(client);
        stompClientRef.current = client;

        // 구독을 하나의 배열로 처리
        const subscription = client.subscribe(
          `/topic/page/${id}`,
          handleWebSocketMessage
        );
        const statusSubscription = client.subscribe(
          `/topic/page/${id}/status`,
          handleWebSocketMessage
        );

        // 초기 상태 전송
        client.publish({
          destination: `/app/page/${id}/status`,
          body: JSON.stringify({
            componentId,
            type: "EDITOR_STATUS",
            pageId: id,
            uid: "ghkdtnqls95",
            status: "viewing",
            timestamp: Date.now(),
          }),
        });

        // cleanup을 위해 구독 객체 저장
        return () => {
          subscription.unsubscribe();
          statusSubscription.unsubscribe();
        };
      },
      onDisconnect: () => {
        console.log("🔴 Disconnected from WebSocket");
        setStompClient(null);
        stompClientRef.current = null; // ref 초기화
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
  }, [id, componentId]);

  // 대신 이 함수 사용
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

  // componentId 초기화를 위한 useEffect 수정
  useEffect(() => {
    if (!componentId) {
      const id = generateUUID(); // uuidv4() 대신 generateUUID() 사용
      setComponentId(id);
      console.log("🔍 Component ID initialized:", id);
    }
  }, []);

  // 제목 변경 핸들러도 공통 방송 함수 사용
  const handleTitleChange = async (e) => {
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
          uid: "ghkdtnqls95",
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

  // 이모지 선택 핸들러
  const onEmojiClick = async (emojiData) => {
    setSelectedIcon(emojiData.emoji);
    setShowIconPicker(false);

    const newTitle = emojiData.emoji + " " + title;
    setTitle(newTitle);

    try {
      if (editorRef.current) {
        const currentContent = await editorRef.current.save();

        // 저장할 데이터 구성
        const pageData = {
          _id: id,
          title: newTitle,
          content: JSON.stringify(currentContent),
        };

        // 서버에 저장
        await savePage(pageData);
      }
    } catch (error) {
      console.error("Error in onEmojiClick:", error);
    }
  };

  // 에디터 초기 함수
  const initializeEditor = async (initialContent = null) => {
    if (editorRef.current) {
      await editorRef.current.destroy();
    }

    editorRef.current = await createEditor(initialContent);
    return editorRef.current;
  };

  // 공통 메시지 전송 함수 추가
  const broadcastMessage = async (type, data) => {
    if (!componentId || !stompClientRef.current?.active) {
      console.warn("Cannot broadcast message:", {
        componentId,
        isConnected: stompClientRef.current?.active,
      });
      return;
    }

    try {
      const message = {
        _id: id,
        type,
        ...data,
        componentId,
        timestamp: Date.now(),
        uid: "ghkdtnqls95",
      };

      stompClientRef.current.publish({
        destination: `/app/page/${id}`,
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error(`Error broadcasting ${type}:`, error);
    }
  };

  // 기 마운트와 id 체크를 위한 useEffect 추가
  useEffect(() => {
    const initializePage = async () => {
      const params = new URLSearchParams(location.search);
      const pageId = params.get("id");

      if (!pageId) {
        try {
          const response = await axios.post(PAGE_CREATE_URI, {
            title: "",
            content: "",
            uid: "ghkdtnqls95",
          });

          const newId = response.data;
          setId(newId);

          // URL 업데이트
          const newParams = new URLSearchParams(location.search);
          newParams.set("id", newId);
          window.history.replaceState(
            {},
            "",
            `${location.pathname}?${newParams}`
          );

          // 에디터 초기화
          if (editorRef.current) {
            await editorRef.current.destroy();
          }
          initializeEditor();
        } catch (error) {
          console.error("Error creating new page:", error);
        }
      }
    };

    initializePage();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // location 변경 감지를 위한 useEffect 추가
  useEffect(() => {
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
          <div
            className="content-header flex gap-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-[40px] h-[40px]">
              {selectedIcon ? (
                <button className="w-[30px] h-[30px] flex items-center justify-center rounded hover:bg-gray-100 text-[24px]">
                  {selectedIcon}
                </button>
              ) : (
                <button
                  onClick={() => setShowIconPicker(true)}
                  className={`w-[30px] h-[30px] flex items-center justify-center rounded hover:bg-gray-100 transition-opacity duration-200
                    ${isHovering ? "opacity-100" : "opacity-0"}`}
                >
                  <BsEmojiSmile size={20} className="text-gray-400" />
                </button>
              )}

              {showIconPicker && (
                <div className="absolute top-0 left-[35px] z-40">
                  <div className="flex items-start">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      width={400}
                      height={500}
                    />
                    <button
                      onClick={() => setShowIconPicker(false)}
                      className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors h-[30px] w-[30px] flex items-center justify-center"
                    >
                      <IoCloseOutline size={20} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <input
              className="text-[30px] text-gray-500 !border-none focus:outline-none flex-1"
              placeholder="새 페이지111"
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
