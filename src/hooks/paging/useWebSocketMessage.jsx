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
  console.log("Updating list block:", {
    blockData: block.data,
    style: block.data.style,
    items: block.data.items,
  });

  const listItems = element.querySelectorAll(
    ".ce-block__content .cdx-list__item"
  );

  block.data.items.forEach((item, index) => {
    if (listItems[index]) {
      const contentElement = listItems[index].querySelector(
        '[contenteditable="true"]'
      );
      if (contentElement) {
        let newText;
        // 체크리스트인 경우
        if (block.data.style === "checked") {
          newText = typeof item === "object" ? item.text : item;
          console.log(`Checklist item ${index}:`, { item, newText });
        } else {
          // 일반 목록인 경우
          newText = item;
          console.log(`List item ${index}:`, { item, newText });
        }

        if (contentElement.innerHTML !== newText) {
          console.log(
            `Updating item ${index} from "${contentElement.innerHTML}" to "${newText}"`
          );
          contentElement.innerHTML = newText;
        }
      }
    }
  });
};

const updateImageBlock = (element, block) => {
  const imgElement = element.querySelector("img");
  if (imgElement && imgElement.src !== block.data.file.url) {
    imgElement.src = block.data.file.url;
  }
};
