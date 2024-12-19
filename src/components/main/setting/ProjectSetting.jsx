import React, { useState, useEffect } from "react";

export default function ProjectSetting() {
  const [priorityName, setPriorityName] = useState("");
  const [taskSizeName, setTaskSizeName] = useState("");
  const [priorities, setPriorities] = useState([]);
  const [taskSizes, setTaskSizes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const priorityData = await getAllPriorities();
      const taskSizeData = await getAllTaskSizes();
      setPriorities(priorityData);
      setTaskSizes(taskSizeData);
    }
    fetchData();
  }, []);

  // 우선순위 추가 핸들러
  const handlePrioritySubmit = async (e) => {
    e.preventDefault();
    try {
      await postPriority({ name: priorityName });
      setPriorityName(""); // 폼 초기화
      alert("우선순위가 추가되었습니다.");
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("우선순위 추가 오류:", error);
    }
  };

  // 작업 크기 추가 핸들러
  const handleTaskSizeSubmit = async (e) => {
    e.preventDefault();
    try {
      await postTaskSize({ name: taskSizeName });
      setTaskSizeName(""); // 폼 초기화
      alert("작업 크기가 추가되었습니다.");
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("작업 크기 추가 오류:", error);
    }
  };

  // 우선순위 수정 핸들러
  const handlePriorityUpdate = async (id, name) => {
    try {
      await updatePriority(id, { name });
      alert("우선순위가 수정되었습니다.");
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("우선순위 수정 오류:", error);
    }
  };

  // 작업 크기 수정 핸들러
  const handleTaskSizeUpdate = async (id, name) => {
    try {
      await updateTaskSize(id, { name });
      alert("작업 크기가 수정되었습니다.");
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("작업 크기 수정 오류:", error);
    }
  };

  // 우선순위 삭제 핸들러
  const handlePriorityDelete = async (id) => {
    try {
      await deletePriority(id);
      alert("우선순위가 삭제되었습니다.");
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("우선순위 삭제 오류:", error);
    }
  };

  // 작업 크기 삭제 핸들러
  const handleTaskSizeDelete = async (id) => {
    try {
      await deleteTaskSize(id);
      alert("작업 크기가 삭제되었습니다.");
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("작업 크기 삭제 오류:", error);
    }
  };

  return (
    <article className="w-[1100px] mx-auto my-10">
      <div className="content-header text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">프로젝트 설정</h1>
        <p className="text-gray-600 text-lg">우선순위 및 작업 크기 관리</p>
      </div>

      {/* 우선순위 추가 섹션 */}
      <div className="p-6 mb-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          우선순위 추가
        </h2>
        <form onSubmit={handlePrioritySubmit} className="flex gap-4 mb-4">
          <input
            type="text"
            value={priorityName}
            onChange={(e) => setPriorityName(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="우선순위 이름을 입력하세요"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            추가
          </button>
        </form>
        <div>
          <h3 className="text-lg font-medium text-gray-700">
            현재 우선순위 목록
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {priorities.map((priority) => (
              <li
                key={priority.id}
                className="text-gray-800 flex justify-between items-center"
              >
                {priority.name}
                <div>
                  <button
                    onClick={() =>
                      handlePriorityUpdate(
                        priority.id,
                        prompt(
                          "수정할 우선순위 이름을 입력하세요:",
                          priority.name
                        )
                      )
                    }
                    className="text-blue-500 hover:text-blue-700 px-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handlePriorityDelete(priority.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 작업 크기 추가 섹션 */}
      <div className="p-6 mb-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          작업 크기 추가
        </h2>
        <form onSubmit={handleTaskSizeSubmit} className="flex gap-4 mb-4">
          <input
            type="text"
            value={taskSizeName}
            onChange={(e) => setTaskSizeName(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="작업 크기 이름을 입력하세요"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            추가
          </button>
        </form>
        <div>
          <h3 className="text-lg font-medium text-gray-700">
            현재 작업 크기 목록
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {taskSizes.map((taskSize) => (
              <li
                key={taskSize.id}
                className="text-gray-800 flex justify-between items-center"
              >
                {taskSize.name}
                <div>
                  <button
                    onClick={() =>
                      handleTaskSizeUpdate(
                        taskSize.id,
                        prompt(
                          "수정할 작업 크기 이름을 입력하세요:",
                          taskSize.name
                        )
                      )
                    }
                    className="text-blue-500 hover:text-blue-700 px-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleTaskSizeDelete(taskSize.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
