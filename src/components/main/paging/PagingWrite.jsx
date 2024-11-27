import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import CheckList from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Marker from "@editorjs/marker";
import Warning from "@editorjs/warning";

export default function PagingWrite() {
  const ejInstance = useRef();
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setSelectedIcon(emojiObject.emoji);
    setShowIconPicker(false);
  };

  // Editor.js 초기화
  useEffect(() => {
    const initEditor = async () => {
      if (!ejInstance.current) {
        const editor = new EditorJS({
          holder: "editorjs",
          data: {
            blocks: [],
          },
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
              class: Image,
              config: {
                uploader: {
                  uploadByFile(file) {
                    return new Promise((resolve, reject) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        resolve({
                          success: 1,
                          file: {
                            url: reader.result,
                          },
                        });
                      };
                      reader.onerror = (error) => reject(error);
                    });
                  },
                },
              },
            },
            link: {
              class: Link,
              config: {
                endpoint: "/api/fetchUrl",
              },
            },
            code: Code,
            table: {
              class: Table,
              inlineToolbar: true,
            },
            checklist: {
              class: CheckList,
              inlineToolbar: true,
            },
            quote: Quote,
            embed: Embed,
            marker: Marker,
            warning: Warning,
          },
        });

        // editor 인스턴스가 준비될 때까지 기다립니다
        await editor.isReady;
        ejInstance.current = editor;
      }
    };

    initEditor();

    // cleanup 함수
    return () => {
      if (ejInstance.current) {
        const destroyPromise = ejInstance.current.destroy();
        if (destroyPromise && typeof destroyPromise.then === "function") {
          destroyPromise.catch((e) => {
            console.error("Editor cleanup failed:", e);
          });
        }
      }
    };
  }, []);

  return (
    <div className="w-full">
      <article className="page-list pageWrite content">
        <div className="content-header">
          <h2>New Page</h2>
        </div>
        <article className="page-list !-5mt !border-none w-full">
          <div
            className="content-header flex  gap-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* 아이콘 영역 */}
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
                    ${isHovering ? "opacity-100" : "opacity-0"}`}
                >
                  <BsEmojiSmile size={20} className="text-gray-400" />
                </button>
              )}

              {/* 이모지 피커 */}
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

            {/* 제목 입력 */}
            <input
              className="text-[30px] text-gray-500 !border-none focus:outline-none flex-1"
              placeholder="새 페이지"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div id="editorjs" className="editorSection !h-[800px] !mt-14 "></div>
        </article>
      </article>
    </div>
  );
}

/* 
// Spring Boot 서버 연동 시 사용할 코드 - 이미지 업로드 예시
async uploadByFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {  // 실제 업로드 API 엔드포인트로 수정 필요
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  return {
    success: 1,
    file: {
      url: data.url  // 서버에서 반환한 이미지 URL
    }
  };
}
*/
