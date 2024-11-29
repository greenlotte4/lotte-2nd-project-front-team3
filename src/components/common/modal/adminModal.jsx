import React, { useState } from "react";
import useModalStore from "../../../store/modalStore";

const AdminModal = () => {
  const { isOpen, type, props, closeModal, updateProps } = useModalStore();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [department, setDepartment] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // 사용자 정보 저장 로직 추가
    console.log("Saved user info:", {
      name,
      mail,
      department,
      rank,
      role,
      note,
    });
    closeModal();
  };

  const renderContent = () => {
    switch (type) {
      case "member-invite":
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px] h-auto p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-gray-800">멤버 초대</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>

              {/* 설명 */}
              <p className="text-gray-600 text-sm mb-6">
                새 멤버를 그룹웨어에 초대합니다. 이름, 이메일, 직급 등 정보를
                입력하세요.
              </p>

              {/* 초대 폼 */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  {/* 이름 입력 */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                  </div>

                  {/* 이메일 입력 */}
                  <div>
                    <label
                      htmlFor="mail"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      이메일
                    </label>
                    <input
                      type="email"
                      id="mail"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="example@domain.com"
                    />
                  </div>

                  {/* 부서 입력 */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      부서
                    </label>
                    <input
                      type="text"
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                  </div>

                  {/* 직급 입력 */}
                  <div>
                    <label
                      htmlFor="rank"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      직급
                    </label>
                    <input
                      type="text"
                      id="rank"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                  </div>

                  {/* 역할 선택 */}
                  <div>
                    <label
                      htmlFor="role"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      역할
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                      <option value="employee">직원</option>
                      <option value="manager">관리자</option>
                      <option value="admin">슈퍼 관리자</option>
                    </select>
                  </div>

                  {/* 메모 입력 */}
                  <div>
                    <label
                      htmlFor="note"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      초대 메모 (선택)
                    </label>
                    <textarea
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="초대와 관련된 메모를 추가하세요."
                    />
                  </div>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mr-2"
                  >
                    초대하기
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
                    onClick={closeModal}
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return <div>모달 내용이 없습니다.</div>;
    }
  };
  return renderContent();
};
export default AdminModal;
