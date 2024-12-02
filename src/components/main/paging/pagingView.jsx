import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useLocation } from "react-router-dom";

const NotionLikeEditor = () => {
  const ejInstance = useRef();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // 쿼리 파라미터에서 ID 추출
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [pageData, setPageData] = useState(null);
  const debounceTimer = useRef(null);

  const savePage = async (updatedTitle, updatedContent) => {
    const finalTitle =
      updatedTitle !== undefined ? updatedTitle : title || pageData?.title;
    const finalContent =
      updatedContent || JSON.stringify(await ejInstance.current.save());

    try {
      const response = await fetch("http://localhost:8080/api/page/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          title: finalTitle,
          content: finalContent,
        }),
      });

      if (response.ok) {
        console.log("Saved successfully!");
      } else {
        console.error("Error saving page:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  useEffect(() => {
    // EditorJS 인스턴스 초기화
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
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => savePage(null, null), 500);
      },
    });

    // 페이지 데이터 가져오기
    const fetchPageData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/page/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPageData(data);
          ejInstance.current.render(JSON.parse(data.content));
          setTitle(data.title);
        } else {
          console.error("Error fetching page data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };
    fetchPageData();

    return () => {
      ejInstance.current.destroy();
    };
  }, [id]);

  // 제목 변경 시 자동 저장 처리
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(
      () => savePage(id, title, finalContent),
      500
    );
  }, [id, title, contㅋ]);

  const onEmojiClick = (event, emojiObject) => {
    setSelectedIcon(emojiObject.emoji);
    setShowIconPicker(false);
  };

  return (
    <div className="w-full">
      <article className="page-list pageWrite content">
        <div className="content-header">
          <h2>My Page</h2>
          <p>page view</p>
        </div>
        <article className="page-list !-5mt !border-none w-full">
          <div
            className="content-header flex gap-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-[30px] h-[30px]">
              {selectedIcon ? (
                <button
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-[30px] h-[30px] flex items-center justify-center rounded hover:bg-gray-100 text-[24px]"
                >
                  {selectedIcon}
                </button>
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
              placeholder="새 페이지"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

export default NotionLikeEditor;
