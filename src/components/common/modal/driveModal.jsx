import { useEffect, useState } from "react";
import useModalStore from "./../../../store/modalStore";

export default function DriveModal() {
  const { isOpen, type, props, closeModal, updateProps } = useModalStore();
  const [folderName, setFolderName] = useState("");
  const [ModifyName, setModfiyName] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[350px]">
              <div className="flex justify-between items-center px-7 py-2 border-gray-200 mt-[15px]">
                <i className="fa-solid fa-folder text-[#5C9CE6] text-[20px]"></i>
                <h2 className="text-lg font-semibold">머시기 폴더의 링크</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <div className="px-6 pt-4 pb-6">
                <div className="px-6 py-4 bg-[#F0F7FF] rounded-lg">
                  <h2 className="font-bold">링크 공유</h2>
                  <p>
                    링크가 있는 사용자가
                    <span
                      className={isChecked ? "text-blue-500" : "text-gray-500"}
                    >
                      {isChecked ? " 편집 " : " 읽기 "}
                    </span>
                    가능
                  </p>
                  <div className="flex mt-[5px]">
                    <div className="flex grow shrink basis-auto bg-white border border-gray-300 rounded-lg h-[30px] focus:outline-none focus:ring focus:ring-blue-300">
                      <a className="grow shrink basis-auto"></a>
                      <button className="px-2 py-0 border-l">링크복사</button>
                    </div>
                    <div className="ml-2 ">
                      <button className="border rounded-lg h-[30px] px-2 py-0 bg-white">
                        보내기
                      </button>
                    </div>
                  </div>
                  <div className="flex grow shrink basis-auto mt-[10px]">
                    <p>편집</p>
                    <div className="ml-auto">
                      <label className="relative inline-flex items-center cursor-pointer ">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
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
