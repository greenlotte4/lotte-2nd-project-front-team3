import React, { useState, useEffect } from "react";
import useModalStore from "../../../store/modalStore";
import { postProject } from "../../../api/projectAPI";

export default function ProjectModal({
  onAddState,
  onAddItem,
  onEditItem,
  currentStateId,
  currentTask,
  setCurrentTask,
}) {
  const { isOpen, type, closeModal } = useModalStore();

  // 프로젝트 추가 상태 관리
  const [project, setProject] = useState({
    projectName: "",
    status: 0,
  });

  // 프로젝트 추가 changeHandler
  const projectChangeHandler = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // 프로젝트 추가 submitHandler
  const projectSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // project 객체를 그대로 JSON으로 전송
      const result = await postProject(project);
      console.log("result:", result);

      // 상태 초기화 및 모달 닫기
      setProject({ projectName: "", status: 0 });
      closeModal();
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("프로젝트 생성 중 문제가 발생했습니다.");
    }
  };

  // State 관련 상태
  const [stateTitle, setStateTitle] = useState("");
  const [stateDescription, setStateDescription] = useState("");
  const [stateColor, setStateColor] = useState("#00FF00"); // 기본 색상

  // Task 관련 상태
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [priority, setPriority] = useState("P2");
  const [size, setSize] = useState("M");

  // 프로젝트 이름 상태 추가
  const [projectName, setProjectName] = useState("");

  // 협업자 관련 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  useEffect(() => {
    if (currentTask) {
      setTaskTitle(currentTask.title);
      setTaskContent(currentTask.content);
      setPriority(currentTask.priority);
      setSize(currentTask.size);

      // 선택된 담당자 설정
      if (currentTask.assignees) {
        setSelectedCollaborators(currentTask.assignees); // 담당자 설정
      }
    } else {
      setTaskTitle("");
      setTaskContent("");
      setPriority("P2");
      setSize("M");

      // 담당자 상태 초기화
      setSearchQuery("");
      setSearchResults([]);
      setSelectedCollaborators([]);
    }
  }, [currentTask]);

  const handleSaveTask = (e) => {
    e.preventDefault();

    const taskData = {
      id: currentTask?.id || Date.now(), // 수정 시 기존 ID 유지
      title: taskTitle,
      content: taskContent,
      priority,
      size,
      assignees: selectedCollaborators, // 선택된 담당자 추가
    };

    console.log("Task Data to Save:", taskData);

    if (type === "task-create") {
      onAddItem(currentStateId, taskData);
    } else if (type === "task-edit") {
      console.log("Calling onEditItem with:", currentStateId, taskData);
      onEditItem(currentStateId, taskData);
    }

    closeModal();
    setTimeout(() => {
      setCurrentTask(null);
    }, 0); // 상태 업데이트 후 초기화
  };

  const handleAddState = (e) => {
    e.preventDefault();
    onAddState({
      title: stateTitle,
      description: stateDescription,
      color: stateColor,
    });
    setStateTitle("");
    setStateDescription("");
    setStateColor("#00FF00"); // 초기화
    closeModal();
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    console.log("Current State ID:", currentStateId); // 디버깅 로그
    console.log("Adding Task:", { taskTitle, taskContent, priority, size }); // Task 내용 확인

    // currentStateId와 task 데이터를 확인 후 추가
    if (!onAddItem || !currentStateId) {
      console.error("onAddItem or currentStateId is missing!");
      return;
    }

    // New item 생성
    const newItem = {
      title: taskTitle,
      content: taskContent,
      priority,
      size,
    };

    console.log("New Item to Add:", newItem);

    // onAddItem 호출
    onAddItem(newItem);

    // 상태 초기화
    setTaskTitle("");
    setTaskContent("");
    setPriority("P2");
    setSize("M");
    closeModal();
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // 예제 사용자 데이터 (검색 API 대신)
    const exampleUsers = [
      { username: "ekkang1" },
      { username: "ekkang2" },
      { username: "ekkang3" },
      { username: "ekkang4" },
      { username: "ekkang5" },
      { username: "ekkang6" },
    ];

    const filteredUsers = exampleUsers.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  const handleAddCollaborator = (user) => {
    if (
      !selectedCollaborators.find(
        (collaborator) => collaborator.username === user.username
      )
    ) {
      setSelectedCollaborators((prev) => [...prev, { ...user, role: "Write" }]);
    }
  };

  const handleRemoveCollaborator = (username) => {
    setSelectedCollaborators((prev) =>
      prev.filter((collaborator) => collaborator.username !== username)
    );
  };

  const handleRoleChange = (username, newRole) => {
    setSelectedCollaborators((prev) =>
      prev.map((collaborator) =>
        collaborator.username === username
          ? { ...collaborator, role: newRole }
          : collaborator
      )
    );
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case "task-create":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[500px] h-[79vh] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">새 작업 추가</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">작업명</label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="작업 제목을 입력하세요"
                    required
                  />
                </div>

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

                <div>
                  <label className="block mb-2 font-medium">우선순위</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="P0">P0 - 최우선</option>
                    <option value="P1">P1 - 높음</option>
                    <option value="P2">P2 - 보통</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium">크기</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                {/* 담당자 검색 및 선택 */}
                <div>
                  <label className="block mb-2 font-medium">담당자 검색</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full border rounded p-2"
                    placeholder="담당자 이름을 입력하세요"
                  />
                  {searchQuery && (
                    <div className="mt-2 border rounded p-2 max-h-[100px] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((user, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2"
                          >
                            <span>{user.username}</span>
                            <button
                              type="button"
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleAddCollaborator(user)}
                            >
                              선택
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">검색 결과가 없습니다.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 선택된 담당자 목록 */}
                <div>
                  <h3 className="font-medium mb-3">선택된 담당자</h3>
                  <div className="border rounded p-4 max-h-[100px] overflow-y-auto">
                    {selectedCollaborators.length > 0 ? (
                      selectedCollaborators.map((collaborator, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2"
                        >
                          <span>{collaborator.username}</span>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              handleRemoveCollaborator(collaborator.username)
                            }
                          >
                            삭제
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">선택된 담당자가 없습니다.</p>
                    )}
                  </div>
                </div>

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
                    className="px-4 py-2 bg-[#A0C3F7] text-white rounded hover:bg-blue-700"
                  >
                    작업 추가
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case "task-edit":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[500px] h-[79vh] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">작업 수정</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveTask} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">작업명</label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="작업 제목을 입력하세요"
                    required
                  />
                </div>

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

                <div>
                  <label className="block mb-2 font-medium">우선순위</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="P0">P0 - 최우선</option>
                    <option value="P1">P1 - 높음</option>
                    <option value="P2">P2 - 보통</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium">크기</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                {/* 담당자 검색 및 선택 */}
                <div>
                  <label className="block mb-2 font-medium">담당자 검색</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full border rounded p-2"
                    placeholder="담당자 이름을 입력하세요"
                  />
                  {searchQuery && (
                    <div className="mt-2 border rounded p-2 max-h-[100px] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((user, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2"
                          >
                            <span>{user.username}</span>
                            <button
                              type="button"
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleAddCollaborator(user)}
                            >
                              선택
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">검색 결과가 없습니다.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 선택된 담당자 목록 */}
                <div>
                  <h3 className="font-medium mb-3">선택된 담당자</h3>
                  <div className="border rounded p-4 max-h-[100px] overflow-y-auto">
                    {selectedCollaborators.length > 0 ? (
                      selectedCollaborators.map((collaborator, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2"
                        >
                          <span>{collaborator.username}</span>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              handleRemoveCollaborator(collaborator.username)
                            }
                          >
                            삭제
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">선택된 담당자가 없습니다.</p>
                    )}
                  </div>
                </div>

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
                    className="px-4 py-2 bg-[#A0C3F7] text-white rounded hover:bg-blue-700"
                  >
                    수정
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case "project":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[500px] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">프로젝트 추가</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={projectSubmitHandler} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">프로젝트명</label>
                  <input
                    type="text"
                    name="projectName"
                    value={project.projectName}
                    onChange={projectChangeHandler}
                    className="w-full border rounded p-2"
                    placeholder="프로젝트 이름을 입력하세요"
                    required
                  />
                </div>

                {/* 저장 버튼 */}
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
                    className="px-4 py-2 bg-[#A0C3F7] text-white rounded hover:bg-blue-700"
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case "project-edit":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[600px] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">프로젝트 수정</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log({
                    updatedProjectName: projectName,
                    updatedProjectDescription: projectDescription,
                    updatedProjectMembers: teamMembers, // 선택된 멤버로 처리
                  });
                  closeModal();
                }}
              >
                {/* 프로젝트명 수정 */}
                <div>
                  <label className="block mb-2 font-medium">프로젝트명</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="프로젝트 이름을 수정하세요"
                    required
                  />
                </div>

                <div className="border rounded max-h-40 overflow-y-auto">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span>{member.name}</span>
                      <button
                        onClick={() => console.log(`${member.name} 추가`)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-700"
                      >
                        추가
                      </button>
                    </div>
                  ))}
                </div>

                {/* 현재 협업자 목록 */}
                <div className="mt-4">
                  <h3 className="font-medium mb-2">현재 협업자 목록</h3>
                  <div className="border rounded max-h-40 overflow-y-auto">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex justify-between items-center p-2"
                      >
                        <span>{member.name}</span>
                        <button
                          onClick={() => console.log(`${member.name} 삭제`)}
                          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-100"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 닫기 및 저장 버튼 */}
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
                    className="px-4 py-2 bg-[#A0C3F7] text-white rounded hover:bg-green-700"
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case "project-invite":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[600px] h-[60vh] p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">협업자 설정</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* 검색 및 추가 */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">협업자 검색</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-full border rounded p-2"
                      placeholder="사용자 이름을 입력하세요"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>

                  {/* 검색 결과 */}
                  {searchQuery && (
                    <div className="mt-3 border rounded p-2">
                      {searchResults.length > 0 ? (
                        searchResults.map((user, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 border-b"
                          >
                            <span>{user.username}</span>
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleAddCollaborator(user)}
                            >
                              선택
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">검색 결과가 없습니다.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 선택된 협업자 목록 */}
                <div>
                  <h3 className="font-medium mb-3">선택된 협업자</h3>
                  <div className="border rounded p-4 max-h-[200px] overflow-y-auto">
                    {selectedCollaborators.length > 0 ? (
                      selectedCollaborators.map((collaborator, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 border rounded mb-2"
                        >
                          <div className="flex items-center">
                            <span className="font-medium">
                              {collaborator.username}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <select
                              className="border rounded p-2 mr-3"
                              value={collaborator.role}
                              onChange={(e) =>
                                handleRoleChange(
                                  collaborator.username,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Admin">Admin</option>
                              <option value="Write">Write</option>
                              <option value="Read">Read</option>
                            </select>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() =>
                                handleRemoveCollaborator(collaborator.username)
                              }
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">선택된 협업자가 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 저장 버튼 */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    console.log(
                      "Selected collaborators:",
                      selectedCollaborators
                    );
                    closeModal();
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  초대
                </button>
              </div>
            </div>
          </div>
        );

      case "state-add":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[500px] h-[39vh] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">새 상태 추가</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddState} className="space-y-4">
                {/* 색상 선택 */}
                <div>
                  <label className="block mb-2 font-medium">상태 색상</label>
                  <input
                    type="color"
                    value={stateColor}
                    onChange={(e) => setStateColor(e.target.value)}
                    className="w-full h-10 border rounded p-1"
                  />
                </div>

                {/* 상태 제목 */}
                <div>
                  <label className="block mb-2 font-medium">상태 제목</label>
                  <input
                    type="text"
                    value={stateTitle}
                    onChange={(e) => setStateTitle(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="상태 이름을 입력하세요"
                    required
                  />
                </div>

                {/* 상태 설명 */}
                <div>
                  <label className="block mb-2 font-medium">상태 설명</label>
                  <textarea
                    value={stateDescription}
                    onChange={(e) => setStateDescription(e.target.value)}
                    className="w-full border rounded p-2"
                    rows="4"
                    placeholder="상태 설명을 입력하세요"
                  />
                </div>

                {/* 저장 버튼 */}
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
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    저장
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
