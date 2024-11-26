import React, { useState } from "react";
import useModalStore from "../../../store/modalStore";

export default function ProjectModal() {
  const { isOpen, type, props, closeModal, updateProps } = useModalStore();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [priority, setPriority] = useState("P2");
  const [status, setStatus] = useState("Todo");
  const [assignee, setAssignee] = useState("");

  // 팀원 목록 (예시)
  const teamMembers = [
    { id: 1, name: "김철수" },
    { id: 2, name: "이영희" },
    { id: 3, name: "박민수" },
    { id: 4, name: "최지원" },
  ];

  const [filteredMembers, setFilteredMembers] = useState(teamMembers);

  const handleSearch = (e) => {
    const query = e.target.value;
    const filtered = teamMembers.filter((member) =>
      member.name.includes(query)
    );
    setFilteredMembers(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 작업 추가 로직 (여기서는 콘솔 로그로 대체)
    console.log({
      title: taskTitle,
      content: taskContent,
      priority,
      status,
      assignee,
    });
    onClose();
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case "task":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[500px] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">새 작업 추가</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 작업 제목 */}
                <div>
                  <label className="block mb-2 font-medium">작업 제목</label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="작업 제목을 입력하세요"
                    required
                  />
                </div>

                {/* 작업 내용 */}
                <div>
                  <label className="block mb-2 font-medium">작업 내용</label>
                  <textarea
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    className="w-full border rounded p-2"
                    rows="4"
                    placeholder="작업 내용을 설명해주세요"
                  />
                </div>

                {/* 우선순위 */}
                <div>
                  <label className="block mb-2 font-medium">우선순위</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="P0">P0 - 최우선 순위</option>
                    <option value="P1">P1 - 높은 순위</option>
                    <option value="P2">P2 - 일반 순위</option>
                  </select>
                </div>

                {/* 작업 상태 */}
                <div>
                  <label className="block mb-2 font-medium">작업 상태</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="Todo">Todo</option>
                    <option value="Ready">Ready</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                {/* 작업 담당자 */}
                <div>
                  <label className="block mb-2 font-medium">작업 담당자</label>
                  <div class="relative w-full">
                    <input
                      type="text"
                      placeholder="담당자 검색"
                      onChange={handleSearch}
                      class="w-full border rounded p-2 pl-10 mb-2"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <div className="border rounded max-h-40 overflow-y-auto">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => setAssignee(member.name)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {member.name}
                      </div>
                    ))}
                  </div>
                  {assignee && (
                    <div className="mt-2 text-sm text-gray-600">
                      선택된 담당자: {assignee}
                    </div>
                  )}
                </div>

                {/* 버튼 */}
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    작업 추가
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
}
