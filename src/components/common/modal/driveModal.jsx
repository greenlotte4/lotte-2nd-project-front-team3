import { useEffect, useState } from "react";
import useModalStore from "./../../../store/modalStore";

export default function DriveModal() {
  const { isOpen, type, props, closeModal, updateProps } = useModalStore();
  const [folderName, setFolderName] = useState("");
  const [ModifyName, setModfiyName] = useState("");

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (type === "insert") {
      setFolderName("");
    } else if (type === "name") {
      setModfiyName("");
    }
  }, [type]);

  if (!isOpen) return null;

  const handleNameSubmit = async () => {
    return;
  };

  const handleFolderSubmit = async () => {
    if (!folderName.trim()) {
      alert("폴더 이름을 입력하세요!");
      return;
    }

    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: folderName }),
      });

      if (!response.ok) {
        throw new Error("폴더 생성 실패");
      }

      const data = await response.json();
      console.log("폴더 생성 성공:", data);

      // 서버 응답을 props로 업데이트 (필요 시)
      updateProps(data);

      alert("폴더가 성공적으로 생성되었습니다!");
      closeModal();
    } catch (error) {
      console.error("에러 발생:", error);
      alert("폴더 생성 중 문제가 발생했습니다.");
    }
  };

  const renderContent = () => {
    switch (type) {
      case "insert":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">새 폴더 만들기</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-4">
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="새 폴더"
                />
              </div>

              <div className="flex justify-end gap-4 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={handleFolderSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        );

      case "name":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">이름 바꾸기</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-4">
                <input
                  type="text"
                  value={ModifyName}
                  onChange={(e) => setModfiyName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="이름 바꾸기"
                />
              </div>

              <div className="flex justify-end gap-4 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={handleNameSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        );

      case "move":
        return <></>;
      case "share":
        return <></>;
      case "delete":
        return <></>;
      case "out":
        return <></>;
      default:
        return <div>모달 내용이 없습니다.</div>;
    }
  };

  return renderContent();
}
