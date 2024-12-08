import React, { useRef, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";

export const useEditor = (initialContent, onContentChange) => {
  const editorRef = useRef(null);

  const initializeEditor = useCallback(async (content = null) => {
    if (editorRef.current) {
      await editorRef.current.destroy();
    }

    const editor = new EditorJS({
      // ... 설정
    });

    await editor.isReady;
    editorRef.current = editor;
    return editor;
  }, [onContentChange]);

  return { editorRef, initializeEditor };
}; 