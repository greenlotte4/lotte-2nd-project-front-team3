import React, { useState } from "react";

const ProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("#000000");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    console.log("Label:", label);
    console.log("Color:", color);
    console.log("Description:", description);
    setIsOpen(false);
    setLabel("");
    setColor("#000000");
    setDescription("");
  };

  return (
    <div>
      {/* 버튼 */}
      <button
        className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 h-10"
        style={{ backgroundColor: "#D9E8FF" }}
        onClick={() => setIsOpen(true)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">라벨 등록</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                라벨 이름
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                라벨 색상
              </label>
              <input
                type="color"
                className="w-16 h-10"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
                onClick={() => setIsOpen(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
                onClick={handleSave}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
