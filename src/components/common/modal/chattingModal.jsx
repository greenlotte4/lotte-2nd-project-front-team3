import React, { useEffect } from "react";
import useModalStore from "./../../../store/modalStore";

export default function ChattingModal() {
  const { isOpen, type, props, closeModal, updateProps } = useModalStore();

  // 상태 변경 감지
  useEffect(() => {
    console.log("Modal Props Updated:", JSON.stringify(props));
  }, [JSON.stringify(props)]); // JSON.stringify로 변경 감지 강화

  if (!isOpen) return null;

  const handleAddUser = (user) => {
    const updatedFilteredUsers = props.filteredUsers.filter(
      (u) => u.id !== user.id
    );
    const updatedSelectedUsers = [...(props.selectedUsers || []), user];

    updateProps({
      filteredUsers: updatedFilteredUsers,
      selectedUsers: updatedSelectedUsers,
    });
  };

  const handleRemoveUser = (user) => {
    const updatedFilteredUsers = [...(props.filteredUsers || []), user];
    const updatedSelectedUsers = props.selectedUsers.filter(
      (u) => u.id !== user.id
    );

    updateProps({
      filteredUsers: updatedFilteredUsers,
      selectedUsers: updatedSelectedUsers,
    });
  };

  const renderContent = () => {
    switch (type) {
      case "invite":
        return (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="mb-4">
              <input
                type="text"
                placeholder="사용자 검색"
                value={props?.searchQuery || ""}
                onChange={
                  (e) => updateProps({ searchQuery: e.target.value }) // 상태 변경
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-1/2 border border-gray-300 rounded-lg p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3">
                  초대 가능한 사용자
                </h3>
                <ul className="space-y-2">
                  {props?.filteredUsers?.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{user.name}</span>
                      </div>
                      <button
                        onClick={() => handleAddUser(user)}
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        &gt;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2 border border-gray-300 rounded-lg p-4 ml-4 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3">선택한 사용자</h3>
                <ul className="space-y-2">
                  {props?.selectedUsers?.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span>{user.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveUser(user)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return <div>모달 내용이 없습니다.</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{type}</h2>
          <button
            onClick={closeModal}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            ✕
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
