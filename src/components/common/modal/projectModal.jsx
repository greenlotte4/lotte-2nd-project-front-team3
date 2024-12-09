import React, { useState, useEffect } from "react";
import useModalStore from "../../../store/modalStore";
import {
  postProject,
  postProjectState,
  updateProjectState,
} from "../../../api/projectAPI";

import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/AuthStore";
import { getAllUser } from "@/api/userAPI";
import { fetchDepartmentsByCompanyId } from "@/api/departmentAPI";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function ProjectModal({
  projectId,
  onAddState,
  onAddItem,
  onEditItem,
  currentStateId,
  currentTask,
  setCurrentTask,
  onEditState,
  currentState,
}) {
  const { isOpen, type, closeModal } = useModalStore();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const [departments, setDepartments] = useState([]);
  const [expandedDepartments, setExpandedDepartments] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (user?.company) {
          const data = await fetchDepartmentsByCompanyId(user.company);
          setDepartments(data);
        }
      } catch (error) {
        console.error("부서 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchDepartments();
  }, [user]);

  // 초대 가능한 사용자와 선택된 사용자 상태
  const [selectedUsers, setSelectedUsers] = useState([]); // 선택된 사용자

  // 부서 확장/축소 토글
  const toggleDepartment = (departmentId) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [departmentId]: !prev[departmentId],
    }));
  };

  // 2. 초대 가능한 사용자 추가
  const handleInvite = (user) => {
    if (!selectedUsers.some((selected) => selected.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]); // 선택된 사용자 추가
    }
  };

  // 3. 선택된 사용자 제거
  const handleRemove = (user) => {
    setSelectedUsers((prev) =>
      prev.filter((selected) => selected.id !== user.id)
    );
  };

  // 4. 초대 버튼 클릭 시 호출
  const handleSendInvite = async () => {
    if (selectedUsers.length === 0) {
      alert("초대할 사용자를 선택하세요.");
      return;
    }

    try {
      console.log("초대 버튼 클릭 - 채널 ID:", channelId); // *** 채널 ID 로그 출력 ***

      // 사용자 ID 배열 전송
      const userIds = selectedUsers.map((user) => user.id);
      const response = await addChannelMember(channelId, userIds);
      alert("멤버가 성공적으로 추가되었습니다!");
      setSelectedUsers([]); // 선택된 사용자 초기화
    } catch (error) {
      console.error("멤버 추가 실패:", error);
      alert("멤버 초대에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    console.log("사용자 정보:", user);
  }, [user]);

  // 작업 수정 effect
  useEffect(() => {
    if (type === "task-create") {
      // 작업 추가 시 상태 초기화
      setTaskData({ title: "", content: "", priority: "2", size: "M" });
    } else if (type === "task-edit" && currentTask) {
      // 작업 수정 시 현재 작업 데이터를 로드
      setTaskData({
        title: currentTask.title || "",
        content: currentTask.content || "",
        priority:
          currentTask.priority !== undefined && currentTask.priority !== null
            ? String(currentTask.priority)
            : "2", // 숫자를 문자열로 변환
        size: currentTask.size || "M",
      });
    }
  }, [type, currentTask]);

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
      // 프로젝트 추가 전 확인 알림창
      if (!window.confirm("프로젝트를 생성하시겠습니까?")) {
        return;
      }

      // 프로젝트 객체와 함께 uid를 전송
      const result = await postProject(project, user.uid);

      // 상태 초기화 및 모달 닫기
      console.log("Project Created:", result);
      setProject({ projectName: "", status: 0 });
      closeModal();

      alert("프로젝트가 생성되었습니다. 상세 등록 화면으로 이동합니다.");

      // 프로젝트 생성 후 view 화면으로 이동
      navigate(`/antwork/project/view?id=${result.id}`);
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("프로젝트 생성 중 문제가 발생했습니다.");
    }
  };

  // 프로젝트 작업 상태 관리
  const [stateData, setStateData] = useState({
    title: "",
    description: "",
    color: "#00FF00", // 기본 색상
    projectId: projectId, // projectId 기본값
  });

  // 프로젝트 상태 changeHandler
  const projectStateChangeHandler = (e) => {
    const { name, value } = e.target;
    setStateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 프로젝트 작업 상태 추가 핸들러
  const handleAddState = async (e) => {
    e.preventDefault();

    try {
      // 서버로 전송
      const addedState = await postProjectState(stateData); // API 호출
      console.log("추가된 상태:", addedState);

      if (onAddState) {
        onAddState(addedState); // 부모 컴포넌트에 상태 추가 알림
      }

      alert("상태가 성공적으로 추가되었습니다!");
      closeModal();
      setStateData({
        title: "",
        description: "",
        color: "#00FF00",
        projectId: projectId, // 초기화 시에도 projectId 유지
      }); // 초기화
    } catch (error) {
      console.error("Error adding state:", error);
      alert("상태 추가 중 문제가 발생했습니다.");
    }
  };

  // 프로젝트 작업 상태 수정
  useEffect(() => {
    if (type === "state-edit" && currentState) {
      setStateData({
        title: currentState.title || "",
        description: currentState.description || "",
        color: currentState.color || "#00FF00",
        projectId: projectId,
      });
    } else if (type === "state-add") {
      setStateData({
        title: "",
        description: "",
        color: "#00FF00",
        projectId: projectId,
      });
    }
  }, [type, currentState, projectId]);

  // 프로젝트 작업 상태 수정 핸들러
  const handleEditState = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "백엔드로 갈 currentState.id, stateData : " + currentState.id,
        stateData
      );
      const updatedStateFromServer = await updateProjectState(
        currentState.id,
        stateData
      );

      // 기존 items를 유지하면서 상태 업데이트
      const updatedState = {
        ...updatedStateFromServer,
        items: currentState.items || [], // 기존 items를 유지
      };

      console.log("updatedState : " + updatedState);

      // 부모 컴포넌트에 상태 수정 알림
      onEditState(updatedState);
      alert("상태가 성공적으로 수정되었습니다!");
      closeModal();
    } catch (error) {
      console.error("Error editing state:", error);
      alert("상태 수정 중 문제가 발생했습니다.");
    }
  };

  // 작업데이터 상태 관리
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    priority: "2",
    size: "M",
  });

  // 작업 changeHandler(사용자가 입력한 데이터를 taskData에 업데이트)
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 작업 추가 핸들러
  const handleAddTask = (e) => {
    e.preventDefault();

    if (!currentStateId || !onAddItem) {
      console.error("currentStateId or onAddItem is missing!");
      return;
    }

    const newTask = {
      title: taskData.title,
      content: taskData.content,
      priority: taskData.priority,
      size: taskData.size,
      stateId: currentStateId,
      status: 0,
    };

    console.log("newTask:", newTask);

    onAddItem(newTask);

    alert("작업이 등록되었습니다!");
    setTaskData({ title: "", content: "", priority: "2", size: "M" });
    closeModal();
  };

  // 작업 수정 핸들러
  const handleEditTask = async (e) => {
    e.preventDefault();

    if (!currentStateId || !onEditItem) {
      console.error("currentStateId 또는 onEditItem이 누락되었습니다!");
      return;
    }

    // 수정된 작업 데이터 생성
    const updatedTask = {
      id: currentTask?.id || null, // 기존 작업의 ID 유지
      title: taskData.title,
      content: taskData.content,
      priority: taskData.priority,
      size: taskData.size,
      stateId: currentStateId,
      status: currentTask?.status || 0, // 기존 상태 유지
    };

    console.log("updatedTask : " + updatedTask);

    try {
      // 부모 컴포넌트로 업데이트된 작업 데이터 전달
      onEditItem(currentStateId, updatedTask);

      alert("작업이 수정되었습니다!");
      setTaskData({ title: "", content: "", priority: "2", size: "M" }); // 초기화
      closeModal();
    } catch (error) {
      console.error("작업 수정 중 오류 발생:", error.message || error);
      alert("작업 수정 중 문제가 발생했습니다.");
    }
  };

  // 프로젝트 이름 상태 추가
  const [projectName, setProjectName] = useState("");

  // 협업자 관련 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  // useEffect(() => {
  //   if (currentTask) {
  //     setTaskTitle(currentTask.title);
  //     setTaskContent(currentTask.content);
  //     setPriority(currentTask.priority);
  //     setSize(currentTask.size);

  //     // 선택된 담당자 설정
  //     if (currentTask.assignees) {
  //       setSelectedCollaborators(currentTask.assignees); // 담당자 설정
  //     }
  //   } else {
  //     setTaskTitle("");
  //     setTaskContent("");
  //     setPriority("P2");
  //     setSize("M");

  //     // 담당자 상태 초기화
  //     setSearchQuery("");
  //     setSearchResults([]);
  //     setSelectedCollaborators([]);
  //   }
  // }, [currentTask]);

  // const handleSaveTask = (e) => {
  //   e.preventDefault();

  //   const taskData = {
  //     id: currentTask?.id || Date.now(), // 수정 시 기존 ID 유지
  //     title: taskTitle,
  //     content: taskContent,
  //     priority,
  //     size,
  //     assignees: selectedCollaborators, // 선택된 담당자 추가
  //   };

  //   console.log("Task Data to Save:", taskData);

  //   if (type === "task-create") {
  //     onAddItem(currentStateId, taskData);
  //   } else if (type === "task-edit") {
  //     console.log("Calling onEditItem with:", currentStateId, taskData);
  //     onEditItem(currentStateId, taskData);
  //   }

  //   closeModal();
  //   setTimeout(() => {
  //     setCurrentTask(null);
  //   }, 0); // 상태 업데이트 후 초기화
  // };

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
      case "task-edit":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[500px] h-[79vh] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {type === "task-create" ? "새 작업 추가" : "작업 수정"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={
                  type === "task-create" ? handleAddTask : handleEditTask
                }
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 font-medium">작업명</label>
                  <input
                    type="text"
                    name="title"
                    value={taskData.title || currentTask?.title || ""}
                    onChange={handleTaskChange}
                    className="w-full border rounded p-2"
                    placeholder="작업 제목을 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">작업 내용</label>
                  <textarea
                    name="content"
                    value={taskData.content || currentTask?.content || ""}
                    onChange={handleTaskChange}
                    className="w-full border rounded p-2"
                    rows="4"
                    placeholder="작업 내용을 설명해주세요"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">우선순위</label>
                  <select
                    name="priority"
                    value={taskData.priority || currentTask?.priority || "2"}
                    onChange={handleTaskChange}
                    className="w-full border rounded p-2"
                  >
                    <option value="0">P0 - 최우선</option>
                    <option value="1">P1 - 높음</option>
                    <option value="2">P2 - 보통</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium">작업 크기</label>
                  <select
                    name="size"
                    value={taskData.size || currentTask?.size || "M"}
                    onChange={handleTaskChange}
                    className="w-full border rounded p-2"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                {/* 담당자 검색 및 선택 */}
                {/* <div>
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
                </div> */}

                {/* 선택된 담당자 목록 */}
                {/* <div>
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
                </div> */}

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
                    {type === "task-create" ? "추가" : "수정"}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[700px] h-[570px] p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-4">협업자 초대</h2>

              <div className="flex h-[86%]">
                {/* 부서별 사용자 트리 */}
                <div className="w-1/2 border rounded-lg p-4 overflow-y-auto mr-4">
                  {departments.length > 0 ? (
                    <ul>
                      {departments.map((department) => (
                        <li key={department.id} className="mb-3">
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => toggleDepartment(department.id)}
                          >
                            {expandedDepartments[department.id] ? (
                              <AiOutlineMinus className="mr-2" />
                            ) : (
                              <AiOutlinePlus className="mr-2" />
                            )}
                            <span className="font-semibold text-gray-700">
                              {department.name}
                            </span>
                          </div>

                          {/* 부서 확장 시 사용자 목록 표시 */}
                          {expandedDepartments[department.id] && (
                            <ul className="ml-6 mt-2 border-l-2 border-gray-300 pl-2">
                              {department.users &&
                              department.users.length > 0 ? (
                                department.users.map((user) => (
                                  <li
                                    key={user.id}
                                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <span className="text-gray-800 font-medium">
                                        {user.position}
                                      </span>
                                      <span className="text-gray-800">
                                        {user.name}
                                      </span>
                                    </div>

                                    {!selectedUsers.some(
                                      (selected) => selected.id === user.id
                                    ) && (
                                      <button
                                        onClick={() => handleInvite(user)}
                                        className="text-blue-500 hover:underline"
                                      >
                                        추가
                                      </button>
                                    )}
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-500 ml-4">
                                  이 부서에 사용자가 없습니다.
                                </li>
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      부서 데이터를 불러오는 중...
                    </p>
                  )}
                </div>

                {/* 선택된 협업자 목록 */}
                <div className="w-1/2 border rounded-lg p-4 overflow-y-auto">
                  <h3 className="font-semibold text-lg mb-2">선택된 협업자</h3>
                  {selectedUsers.length > 0 ? (
                    <ul>
                      {selectedUsers.map((user) => (
                        <li
                          key={user.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                        >
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-800 font-medium">
                              {user.position}
                            </span>
                            <span className="text-gray-800">{user.name}</span>
                          </div>

                          <button
                            onClick={() => handleRemove(user)}
                            className="text-red-500 hover:underline"
                          >
                            삭제
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">선택된 사용자가 없습니다.</p>
                  )}
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handleSendInvite}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                  초대
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        );

      case "state-add":
      case "state-edit":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-white rounded-lg w-[500px] h-[39vh] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {" "}
                  {type === "state-add" ? "새 작업상태 추가" : "작업상태 수정"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={
                  type === "state-add" ? handleAddState : handleEditState
                }
                className="space-y-4"
              >
                {/* 색상 선택 */}
                <div>
                  <label className="block mb-2 font-medium">
                    작업상태 색상
                  </label>
                  <input
                    type="color"
                    name="color"
                    value={stateData.color}
                    onChange={projectStateChangeHandler}
                    className="w-full h-10 border rounded p-1"
                  />
                </div>

                {/* 상태 제목 */}
                <div>
                  <label className="block mb-2 font-medium">
                    작업상태 제목
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={stateData.title}
                    onChange={projectStateChangeHandler}
                    className="w-full border rounded p-2"
                    placeholder="상태 이름을 입력하세요"
                    required
                  />
                </div>

                {/* 상태 설명 */}
                <div>
                  <label className="block mb-2 font-medium">
                    작업상태 설명
                  </label>
                  <textarea
                    name="description"
                    value={stateData.description}
                    onChange={projectStateChangeHandler}
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
                    className="px-4 py-2 bg-[#A0C3F7] text-white rounded hover:bg-blue-700"
                  >
                    {type === "state-add" ? "추가" : "수정"}
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
