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
import EmojiPicker from "emoji-picker-react";
import { getPageCollaborators } from "../../../api/pageAPI";
import { fetchDepartmentsByCompanyId } from "@/api/departmentAPI";
import useModalStore from "../../../store/modalStore";
import PageCollaboratorModal from "../../common/modal/pageCollaboratorModal";
import { usePageActions } from "../../../hooks/paging/usePageActions";
import { usePageList } from "../../../hooks/paging/usePageList";
import {
  PAGE_LIST_UID_URI,
  PAGE_LIST_MODIFIED_URI,
  PAGE_LIST_DELETED_URI,
} from "../../../api/_URI";

const PagingWrite = () => {
  // 기본 상태들
  const [title, setTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [componentId, setComponentId] = useState(null);
  const [emoji, setEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [showAllCollaborators, setShowAllCollaborators] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

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
  const name = user?.name;
  const profile = user?.profile;

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
        try {
          // 페이지 생성 요청
          const pageData = {
            title: "",
            content: "",
            owner: uid,
            ownerName: name,
            ownerImage: profile,
            collaborators: [
              {
                // 배열로 변경
                uid: uid,
                type: "OWNER",
                isOwner: true,
                // user 정보는 서버에서 uid로 찾아서 설정됨
              },
            ],
          };

          console.log("Creating new page with data:", pageData);
          const response = await axiosInstance.post(PAGE_CREATE_URI, pageData);

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

  // 이모지 선택 핸들러 수정
  const onEmojiClick = (emojiObject) => {
    // 기존 제목에서 첫 번째 이모지와 공백을 제거
    const titleWithoutEmoji = title.replace(/^\p{Emoji}\s*/u, "");
    // 새로운 이모지 추가
    const newTitle = `${emojiObject.emoji} ${titleWithoutEmoji}`;

    setTitle(newTitle);
    setShowEmojiPicker(false);

    // WebSocket을 통해 제목 변경사항 브로드캐스트
    if (stompClientRef.current?.active) {
      const changes = {
        _id: id,
        title: newTitle,
        timestamp: Date.now(),
        componentId: componentId,
        uid: uid,
      };

      stompClientRef.current.publish({
        destination: `/app/page/${id}`,
        body: JSON.stringify(changes),
      });
    }
  };

  // 협업자 목록 가져오기
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        if (id) {
          const collaboratorsData = await getPageCollaborators(id);
          setCollaborators(collaboratorsData);
        }
      } catch (error) {
        console.error("Failed to fetch collaborators:", error);
      }
    };

    fetchCollaborators();
  }, [id]);

  // departments 데이터 가져오기
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (user?.company) {
          const data = await fetchDepartmentsByCompanyId(user.company);
          setDepartments(data);
        }
      } catch (error) {
        console.error("부서 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchDepartments();
  }, [user]);

  // 모달 관련 상태와 함수
  const openModal = useModalStore((state) => state.openModal);

  // 협업자 업데이트 핸들러
  const handleCollaboratorsUpdate = (updatedCollaborators) => {
    setCollaborators(updatedCollaborators);
  };

  // 페이지 목록 상태 추가
  const { setPages: setPersonalPageList } = usePageList(
    `${PAGE_LIST_UID_URI}/${uid}`
  );
  const { setPages: setLatestPages } = usePageList(
    `${PAGE_LIST_MODIFIED_URI}/${uid}`
  );
  const { setPages: setDeletedPages } = usePageList(
    `${PAGE_LIST_DELETED_URI}/${uid}`
  );

  // 페이지 액션 훅 사용
  const { handleDeletePage } = usePageActions();

  // 삭제 핸들러 수정
  const handleDelete = async () => {
    try {
      await handleDeletePage(id, {
        personalPageList: [],
        setPersonalPageList,
        latestPages: [],
        setLatestPages,
        deletedPages: [],
        setDeletedPages,
      });

      // 페이지 이동 전에 약간의 딜레이를 주어 상태 업데이트가 완료되도록 함
      setTimeout(() => {
        navigate("/antwork/page");
        window.location.reload(); // 페이지 새로고침
      }, 100);
    } catch (error) {
      console.error("페이지 삭제 중 오류 발생:", error);
      alert("페이지 삭제에 실패했습니다.");
    }
  };

  // useEffect에서 페이지 로드 시 소유자 여부 확인
  useEffect(() => {
    const checkOwnership = async () => {
      if (id && uid) {
        try {
          const response = await axiosInstance.get(`${PAGE_FETCH_URI}/${id}`);
          setIsOwner(response.data.owner === uid);
        } catch (error) {
          console.error("Failed to check page ownership:", error);
        }
      }
    };

    checkOwnership();
  }, [id, uid]);

  return (
    <div className="w-full">
      <article className="page-list pageWrite content">
        <div className="content-header flex justify-between items-center">
          <h2>{id ? "My Page" : "New Page"}</h2>
          <div className="flex items-center gap-4">
            {/* 협업자 프로필 이미지 목록 */}
            <div className="flex items-center">
              {(showAllCollaborators
                ? collaborators
                : collaborators.slice(0, 3)
              ).map((collaborator) => {
                // departments에서 사용자와 해당 부서 정보 찾기
                const matchedDepartment = departments?.find((dept) =>
                  dept.users.some((u) => u.id === collaborator.user_id)
                );
                const matchedUser = matchedDepartment?.users.find(
                  (u) => u.id === collaborator.user_id
                );

                return (
                  <div key={collaborator.id} className="relative group">
                    <img
                      src={
                        collaborator.uidImage || "/images/default_profile.png"
                      }
                      alt={`Profile`}
                      className="w-12 h-12 rounded-full border-[3px] border-white -ml-3 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                      style={{
                        objectFit: "cover",
                        filter: "brightness(1.02)",
                      }}
                    />
                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-2.5 rounded-xl whitespace-nowrap z-10 shadow-xl transition-all duration-200">
                      <div className="font-medium">
                        {matchedUser?.name || "Unknown User"}
                      </div>
                      <div className="text-xs text-gray-300 mt-0.5">
                        {matchedDepartment?.name || ""}
                      </div>
                    </div>
                  </div>
                );
              })}

              {!showAllCollaborators && collaborators.length > 3 && (
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setShowAllCollaborators(true)}
                >
                  <div className="w-12 h-12 bg-gray-100 text-gray-500 font-medium flex items-center justify-center rounded-full border-[3px] border-white -ml-3 hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110">
                    +{collaborators.length - 3}
                  </div>
                  <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-2.5 rounded-xl whitespace-nowrap z-10 shadow-xl">
                    클릭하여 모든 협업자 보기
                  </div>
                </div>
              )}

              {showAllCollaborators && (
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setShowAllCollaborators(false)}
                >
                  <div className="w-12 h-12 bg-gray-100 text-gray-500 font-medium flex items-center justify-center rounded-full border-[3px] border-white -ml-3 hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110">
                    <span className="transform -translate-y-0.5">−</span>
                  </div>
                  <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-2.5 rounded-xl whitespace-nowrap z-10 shadow-xl">
                    접기
                  </div>
                </div>
              )}
            </div>

            <div className="relative menu-container">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <BsThreeDotsVertical className="text-gray-400 text-xl" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 p-4 !pb-0 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="border-t border-gray-300 border-b border-gray-300 p-3">
                      {isOwner && ( // 소유자인 경우에만 삭제 버튼 표시
                        <button
                          onClick={() => {
                            handleDelete();
                            setShowMenu(false);
                          }}
                          className="w-full px-4 py-3 text-[14px] text-red-600 hover:bg-gray-100 hover:rounded-[10px] text-left"
                        >
                          페이지 삭제
                        </button>
                      )}
                      <button
                        onClick={() => {
                          openModal("page-collaborator");
                          setShowMenu(false);
                        }}
                        className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left bt-black-200"
                      >
                        공유 멤버 관리
                      </button>
                    </div>
                    <div className="p-3">
                      <button className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left">
                        페이지 설정
                        <p className="!text-[11px] !text-slate-400 mt-[2px]">
                          &nbsp;설정페이지로 이동
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <article className="page-list !-5mt !border-none w-full">
          <div className="content-header">
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-2xl p-2 hover:bg-gray-100 rounded-full"
                >
                  🫥
                </button>
                {showEmojiPicker && (
                  <div className="absolute left-0 top-12 z-50">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
              <input
                className="text-[30px] text-gray-500 !border-none focus:outline-none flex-1"
                placeholder="새 페이지"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div
            id="editorjs"
            className="editorSection min-h-[800px] !h-[auto] !mt-14"
          ></div>
        </article>
      </article>
      <PageCollaboratorModal
        pageId={id}
        onCollaboratorsUpdate={handleCollaboratorsUpdate}
      />
    </div>
  );
};

export default PagingWrite;
