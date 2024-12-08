// src/components/modals/InviteModal.js

import { useState } from "react";

export default function InviteModal({ closeModal }) {
  const [inviteableUsers, setInviteableUsers] = useState([
    { id: 1, name: "이상훈" },
  ]);
  const [selectedUsers, setSelectedUsers] = useState([
    { id: 1, name: "박경림" },
  ]);

  return (
    <div className="flex flex-col h-full overflow-hidden p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        대화상대 초대
      </h2>
      <div className="mb-4 flex items-center border rounded-lg px-3 py-2 bg-gray-50">
        <input
          type="text"
          placeholder="사용자 검색"
          className="flex-1 border-none bg-transparent focus:outline-none text-gray-600"
        />
      </div>
      <div className="flex flex-1 space-x-4">
        <div className="w-1/2 border rounded-lg p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold">초대 가능한 사용자</h3>
          <ul className="space-y-3">
            {inviteableUsers.map((user) => (
              <li
                key={user.id}
                className="flex justify-between p-2 bg-white rounded-md shadow-sm"
              >
                <span>{user.name}</span>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  초대
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 border rounded-lg p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold">선택한 사용자</h3>
          <ul className="space-y-3">
            {selectedUsers.map((user) => (
              <li
                key={user.id}
                className="flex justify-between p-2 bg-white rounded-md shadow-sm"
              >
                <span>{user.name}</span>
                <button className="px-3 py-1 bg-red-500 text-white rounded">
                  제거
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
          초대
        </button>
        <button
          onClick={closeModal}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  );
}
