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
          <div className="flex flex-col h-full overflow-hidden p-6 bg-white rounded-lg shadow-lg">
            {/* 제목 */}
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
              대화상대 초대
            </h2>

            {/* 검색 입력창 */}
            <div className="mb-4 flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <input
                type="text"
                placeholder="사용자 검색"
                value={props?.searchQuery || ""}
                onChange={(e) => updateProps({ searchQuery: e.target.value })}
                className="flex-1 border-none bg-transparent focus:outline-none text-gray-600"
              />
              <button>
                <img
                  src="../../../public/images/ico/돋보기.svg"
                  alt="검색"
                  className="w-6 h-6 text-gray-500"
                />
              </button>
            </div>

            {/* 컨테이너 */}
            <div className="flex flex-1 space-x-4">
              {/* 초대 가능한 사용자 */}
              <div className="w-1/2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    초대 가능한 사용자
                  </h3>
                  <button
                    onClick={() => console.log("새로고침 클릭")}
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 7.707a1 1 0 01-1.414 0L10 6.414 7.707 8.707a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="space-y-3">
                  {props?.filteredUsers?.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border border-gray-200 mr-3"
                        />
                        <span className="text-gray-700">{user.name}</span>
                      </div>
                      <button
                        onClick={() => handleAddUser(user)}
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        &gt;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 선택한 사용자 */}
              <div className="w-1/2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  선택한 사용자
                </h3>
                <ul className="space-y-3">
                  {props?.selectedUsers?.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border border-gray-200 mr-3"
                        />
                        <span className="text-gray-700">{user.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveUser(user)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => console.log("초대 버튼 클릭")}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                초대
              </button>
              <button
                onClick={() => console.log("취소 버튼 클릭")}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                취소
              </button>
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
