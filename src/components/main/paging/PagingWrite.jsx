import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useLocation } from "react-router-dom";

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

  useEffect(() => {
    const setupPage = async () => {
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

  return (
    <div className="w-full">
      <article className="page-list pageWrite content">
        <div className="content-header">
          <h2>{id ? "My Page" : "New Page"}</h2>
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
