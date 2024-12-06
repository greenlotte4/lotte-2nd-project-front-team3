import React, { useState } from "react";

const PopupManager = () => {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [popups, setPopups] = useState([
    {
      id: 1,
      title: "공지사항",
      description: "새로운 업데이트가 있습니다.",
      active: true,
    },
    {
      id: 2,
      title: "이벤트",
      description: "할인 이벤트가 시작되었습니다.",
      active: false,
    },
  ]);

  const handleAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleSavePopup = (newPopup) => {
    setPopups([...popups, { ...newPopup, id: popups.length + 1 }]);
    setIsAddPopupOpen(false);
  };

  const handleDeletePopup = (id) => {
    setPopups(popups.filter((popup) => popup.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">팝업 관리</h1>

      {/* Popup List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">팝업 리스트</h2>
          <button
            onClick={handleAddPopup}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            팝업 추가
          </button>
        </div>

        <PopupTable popups={popups} onDelete={handleDeletePopup} />

        {/* Add Popup Modal */}
        {isAddPopupOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                팝업 추가
              </h3>
              <PopupForm
                onSave={handleSavePopup}
                onCancel={() => setIsAddPopupOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PopupTable = ({ popups, onDelete }) => (
  <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
    <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
      <tr>
        <th className="py-3 px-6 text-left">제목</th>
        <th className="py-3 px-6 text-left">설명</th>
        <th className="py-3 px-6 text-center">상태</th>
        <th className="py-3 px-6 text-center">액션</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {popups.map((popup) => (
        <tr
          key={popup.id}
          className="border-b border-gray-200 hover:bg-gray-100 transition"
        >
          <td className="py-3 px-6">{popup.title}</td>
          <td className="py-3 px-6">{popup.description}</td>
          <td className="text-center py-3 px-6">
            {popup.active ? (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                활성
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                비활성
              </span>
            )}
          </td>
          <td className="text-center py-3 px-6 space-x-2">
            <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
              수정
            </button>
            <button
              onClick={() => onDelete(popup.id)}
              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              삭제
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PopupForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, active });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
        />
        <label className="text-gray-600 font-medium">활성화</label>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          저장
        </button>
      </div>
    </form>
  );
};

export default PopupManager;
