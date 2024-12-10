import { useCallback, useRef } from "react";

export const useWebSocketMessage = (
  editorRef,
  componentId,
  pageId,
  setTitle
) => {
  const lastUpdateRef = useRef(Date.now());
  const isEditingRef = useRef(false);

  return useCallback(
    async (message) => {
      console.log("handleWebSocketMessage - 웹소켓 메시지 수신 처리 시작");
      try {
        const data = JSON.parse(message.body);
        console.log("Received message:", data);

        if (data._id !== pageId) {
          console.log("Ignoring message from different page:", data._id);
          return;
        }

        if (
          componentId === data.componentId ||
          data.timestamp <= lastUpdateRef.current
        ) {
          console.log("Ignoring own changes or old message");
          return;
        }

        const editorElement = document.getElementById("editorjs");
        if (editorElement && editorElement.contains(document.activeElement)) {
          console.log("Currently editing, ignoring update");
          return;
        }

        lastUpdateRef.current = data.timestamp;

        if (data.title !== undefined) {
          console.log("Updating title to:", data.title);
          setTitle(data.title);
        }

        if (data.content && editorRef.current) {
          try {
            const newContent =
              typeof data.content === "string"
                ? JSON.parse(data.content)
                : data.content;

            console.log("Updating content with:", newContent);

            const editorElement = document.getElementById("editorjs");
            if (!editorElement) {
              console.error("Editor element not found");
              return;
            }

            const currentBlocks = await editorRef.current.save();

            if (shouldFullUpdate(currentBlocks.blocks, newContent.blocks)) {
              console.log("Performing full update");
              await editorRef.current.render(newContent);
              return;
            }

            await updateBlocks(
              editorElement,
              currentBlocks.blocks,
              newContent.blocks,
              editorRef.current
            );
          } catch (error) {
            console.error("Error updating content:", error);
            if (editorRef.current) {
              await editorRef.current.render(newContent);
            }
          }
        }
      } catch (error) {
        console.error("Error in handleWebSocketMessage:", error);
      }
    },
    [componentId, pageId, setTitle]
  );
};

const shouldFullUpdate = (currentBlocks, newBlocks) => {
  if (currentBlocks.length !== newBlocks.length) return true;

  return currentBlocks.some(
    (block, index) => block.type !== newBlocks[index].type
  );
};

const updateBlocks = async (
  editorElement,
  currentBlocks,
  newBlocks,
  editor
) => {
  for (let i = 0; i < newBlocks.length; i++) {
    const block = newBlocks[i];
    const blockElement = editorElement.querySelector(`[data-id="${block.id}"]`);

    if (!blockElement) continue;

    const currentBlock = currentBlocks[i];
    if (currentBlock.type !== block.type) {
      await editor.blocks.update(i, block);
      continue;
    }

    switch (block.type) {
      case "paragraph":
      case "header":
        updateTextBlock(blockElement, block);
        break;
      case "list":
        updateListBlock(blockElement, block);
        break;
      case "image":
        updateImageBlock(blockElement, block);
        break;
    }
  }
};

const updateTextBlock = (element, block) => {
  const textElement = element.querySelector('[contenteditable="true"]');
  if (textElement && textElement.innerHTML !== block.data.text) {
    textElement.innerHTML = block.data.text;
  }
};

const updateListBlock = (element, block) => {
  const listItems = element.querySelectorAll('[contenteditable="true"]');
  block.data.items.forEach((item, i) => {
    if (listItems[i] && listItems[i].innerHTML !== item) {
      listItems[i].innerHTML = item;
    }
  });
};

const updateImageBlock = (element, block) => {
  const imgElement = element.querySelector("img");
  if (imgElement && imgElement.src !== block.data.file.url) {
    imgElement.src = block.data.file.url;
  }
};
