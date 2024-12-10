import { useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { PAGE_IMAGE_UPLOAD_URI } from "@/api/_URI";
import axiosInstance from "@utils/axiosInstance";

export const useEditor = (throttledBroadcast) => {
  const createEditor = useCallback(
    async (initialData = null) => {
      console.log("createEditor - 에디터 생성 시작");

      // 기존 에디터 요소가 있다면 초기화
      const editorElement = document.getElementById("editorjs");
      if (editorElement) {
        editorElement.innerHTML = "";
      }

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
                    const response = await axiosInstance.post(
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
        data: initialData || {
          blocks: [], // 빈 페이지일 경우 빈 블록 배열
        },
        onReady: () => {
          const editorElement = document.getElementById("editorjs");
          editorElement.addEventListener("input", async () => {
            try {
              const savedData = await editor.save();
              throttledBroadcast(savedData);
            } catch (error) {
              console.error("Error in input handler:", error);
            }
          });
        },
      });

      await editor.isReady;
      console.log("🚀 Editor initialized successfully");
      return editor;
    },
    [throttledBroadcast]
  );

  return createEditor;
};
