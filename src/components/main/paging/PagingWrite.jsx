import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useLocation, useNavigate } from "react-router-dom";

const PagingWrite = () => {
  const ejInstance = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [id, setId] = useState(queryParams.get("id"));
  const titleRef = useRef("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const fetchPageData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/page/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        titleRef.current = data.title;
        if (ejInstance.current) {
          await ejInstance.current.render(JSON.parse(data.content));
          setContent(JSON.parse(data.content));
        }
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };

  const createPage = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/page/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "", content: "" }),
      });

      if (response.ok) {
        const result = await response.text();
        setId(result);
        queryParams.set("id", result);
        window.history.replaceState(
          {},
          "",
          `${location.pathname}?${queryParams}`
        );
      } else {
        console.error("Error creating page:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const savePage = async (currentTitle, currentContent) => {
    try {
      const saveData = {
        _id: id,
        title: currentTitle || titleRef.current,
        content: JSON.stringify(currentContent || content),
      };

      console.log("Saving with title:", saveData.title);

      const response = await fetch("http://localhost:8080/api/page/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });

      if (response.ok) {
        console.log("Saved successfully");
      }
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  const initializeEditor = () => {
    ejInstance.current = new EditorJS({
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

                const response = await fetch(
                  "http://localhost:8080/api/page/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                if (response.ok) {
                  const imageUrl = await response.text();
                  return {
                    success: 1,
                    file: {
                      url: imageUrl,
                    },
                  };
                } else {
                  return {
                    success: 0,
                    message: "Upload failed",
                  };
                }
              },
            },
          },
        },
      },
      onChange: async () => {
        const updatedContent = await ejInstance.current.save();
        setContent(updatedContent);
        await savePage(titleRef.current, updatedContent);
      },
    });
  };

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    titleRef.current = newTitle;

    const currentContent = await ejInstance.current.save();
    await savePage(newTitle, currentContent);
  };

  const onEmojiClick = (emojiData) => {
    setSelectedIcon(emojiData.emoji);
    setShowIconPicker(false);

    const newTitle = emojiData.emoji + " " + title;
    setTitle(newTitle);
    titleRef.current = newTitle;

    savePage(newTitle, content);
  };

  const handleDeletePage = async () => {
    if (!id) return;

    if (window.confirm("정말로 이 페이지를 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/page/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("페이지가 삭제되었습니다.");
          navigate("/antwork/page"); // 페이지 목록으로 이동
        } else {
          alert("페이지 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting page:", error);
        alert("페이지 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    const setupPage = async () => {
      // 기존 에디터 인스턴스 정리
      if (ejInstance.current) {
        ejInstance.current = null;
        document.getElementById("editorjs").innerHTML = "";
      }

      if (!id) {
        await createPage();
      } else {
        initializeEditor();
        await fetchPageData();
      }
    };

    setupPage();

    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
      }
    };
  }, [id]);

  useEffect(() => {
    const setupPage = async () => {
      // 기존 로직 유지
    };

    const newId = queryParams.get("id");
    if (id !== newId) {
      setId(newId);
      setupPage();
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest(".menu-container")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

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
              <div className="absolute right-0 mt-2 p-4 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <div className="border-t border-gray-300 border-b border-gray-300 p-3">
                    <button
                      onClick={handleDeletePage}
                      className="w-full px-4 py-3 text-[14px] text-red-600 hover:bg-gray-100 hover:rounded-[10px] text-left"
                    >
                      페이지 삭제
                    </button>
                    <button className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left bt-black-200">
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
        <article className="page-list !-5mt !border-none w-full">
          <div
            className="content-header flex gap-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-[40px] h-[40px]">
              {selectedIcon ? (
                <button className="w-[30px] h-[30px] flex items-center justify-center rounded hover:bg-gray-100 text-[24px]"></button>
              ) : (
                <button
                  onClick={() => setShowIconPicker(true)}
                  className={`w-[30px] h-[30px] flex items-center justify-center rounded hover:bg-gray-100 transition-opacity duration-200
                                        ${
                                          isHovering
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
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
                    <button className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors h-[30px] w-[30px] flex items-center justify-center">
                      <IoCloseOutline size={20} className="text-gray-500" />
                    </button>
                  </div>
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
          <div
            id="editorjs"
            className="editorSection min-h-[800px] !h-[auto] !mt-14 "
          ></div>
        </article>
      </article>
    </div>
  );
};

export default PagingWrite;
