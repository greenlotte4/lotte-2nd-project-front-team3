import { useEffect, useState } from "react";
import ProjectModal from "../../common/modal/projectModal";
import useModalStore from "../../../store/modalStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import {
  createTask,
  deleteTask,
  getProjectById,
  getProjectStates,
  getTasksByStateId,
  updateTask,
} from "../../../api/projectAPI";

export default function ProjectViewSection() {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  console.log("id : " + id);

  const [loadingStates, setLoadingStates] = useState(true); // 상태 로딩 플래그

  const [project, setProject] = useState();

  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    console.log("22id : " + id);
    // 컴포넌트가 렌더링되거나 id가 변경될 때 호출됨
    const fetchProjectDetails = async () => {
      try {
        const projectData = await getProjectById(id); // API 호출
        console.log("projectData : " + projectData);

        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project details:", error);
        alert("프로젝트 데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchProjectDetails(); // 컴포넌트 마운트 시 데이터 로드
  }, [id]);

  // 전체 상태 데이터 가져오기
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statesData = await getProjectStates(id); // API 호출
        console.log("상태 데이터:", statesData);

        // items 속성이 없는 경우 빈 배열로 초기화
        const initializedStates = statesData.map((state) => ({
          ...state,
          items: state.items || [],
        }));

        setStates(initializedStates);
      } catch (error) {
        console.error("Error fetching states:", error.message || error);
      } finally {
        setLoadingStates(false); // 로딩 완료
      }
    };

    fetchStates();
  }, [id]);

  const [states, setStates] = useState([]);

  // 현재 작업이 속한 작업상태의 id 상태관리
  const [currentStateId, setCurrentStateId] = useState(null);
  //수정 중인 작업 데이터 상태관리(작업 수정할 때 기존 데이터를 불러옴)
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    console.log("States after update:", states);
  }, [states]);

  const handleAddState = (newState) => {
    setStates((prevStates) => [
      ...prevStates,
      { id: Date.now().toString(), ...newState, items: [] },
    ]);
  };

  // 작업 추가 핸들러
  const handleAddItem = async (newTask) => {
    try {
      console.log("백엔드로 전달되는 taskData:", newTask);

      const createdTask = await createTask(newTask); // API 호출
      console.log("생성된 작업:", createdTask);

      setStates((prevStates) =>
        prevStates.map((state) =>
          state.id === newTask.stateId // stateId로 매칭
            ? { ...state, items: [...(state.items || []), createdTask] }
            : state
        )
      );
    } catch (error) {
      console.error("작업 추가 중 오류 발생:", error.message || error);
      alert("작업 등록 중 문제가 발생했습니다.");
    }
  };

  // 전체 작업 데이터 가져오기
  useEffect(() => {
    const fetchTasksForStates = async () => {
      try {
        // 여러 비동기 작업(getTasksByStateId)을 동시에 실행하고, 모든 작업이 완료될 때까지 기다림
        const updatedStates = await Promise.all(
          // states 배열의 각 요소에 대해 작업을 처리
          states.map(async (state) => {
            if (!state.items || state.items.length === 0) {
              // 작업이 없는 상태만 요청
              const tasks = await getTasksByStateId(state.id);
              // 기존 속성(...state)을 그대로 유지하고 items 속성을 업데이트
              return { ...state, items: tasks };
            }
            return state;
          })
        );
        setStates(updatedStates);
      } catch (error) {
        console.error("Error fetching tasks for states:", error.message);
      }
    };

    if (states.length > 0) {
      // 상태가 존재할 때만 호출
      fetchTasksForStates();
    }
  }, [states.length]); // 상태 수가 변경될 때만 트리거

  // 작업 수정
  const handleEditItem = async (stateId, updatedTask) => {
    try {
      console.log("수정 요청 taskId:", updatedTask.id);
      console.log("수정 요청 데이터:", updatedTask);

      // 백엔드로 수정 요청
      const updatedTaskFromServer = await updateTask(
        updatedTask.id,
        updatedTask
      ); // taskId를 전달
      console.log("수정 완료된 작업:", updatedTaskFromServer);

      // 상태 업데이트
      setStates((prevStates) =>
        prevStates.map((state) =>
          state.id === stateId
            ? {
                ...state,
                items: state.items.map((item) =>
                  item.id === updatedTaskFromServer.id
                    ? updatedTaskFromServer
                    : item
                ),
              }
            : state
        )
      );
    } catch (error) {
      console.error("작업 수정 중 오류 발생:", error.message || error);
      alert("작업 수정 중 문제가 발생했습니다.");
    }
  };

  // 작업 삭제 핸들러
  const handleDeleteTask = async (stateId, taskId) => {
    console.log("삭제 stateId, taskId : " + stateId, taskId);
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;
    try {
      // 서버에 삭제 요청
      await deleteTask(taskId);
      console.log(`Task ${taskId} 삭제 성공`);

      // State에서 삭제 반영
      setStates((prevStates) =>
        prevStates.map((state) =>
          state.id === stateId
            ? {
                ...state,
                items: state.items.filter((task) => task.id !== taskId),
              }
            : state
        )
      );

      alert("성공적으로 삭제되었습니다!");
    } catch (error) {
      console.error("Task 삭제 중 오류 발생:", error.message || error);
      alert("Task 삭제 중 문제가 발생했습니다.");
    }
  };

  // 작업 등록 모달
  const openTaskCreateModal = (stateId) => {
    console.log("등록모달 열때 stateId : " + stateId);
    setCurrentStateId(stateId);
    setCurrentTask(null);
    openModal("task-create");
  };

  // 작업 수정 모달
  const openTaskEditModal = (stateId, task) => {
    console.log("수정모달 열때 stateId와 task : " + stateId, task);
    setCurrentStateId(stateId);
    setCurrentTask(task);
    openModal("task-edit");
  };

  // 드래그앤드랍 처리
  const handleDragEnd = (result) => {
    // {드래그가 시작된 위치 정보, 드롭된 위치 정보}
    const { source, destination } = result;

    // 드롭 위치가 없거나 동일한 위치면 종료
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    )
      return;

    // 상태 복사본 생성
    const newStates = [...states];

    // source, destination 상태 찾기
    // 데이터 타입이 서로 다를 수 있기 때문에 비교 전에 문자열로 변환
    const sourceStateIndex = newStates.findIndex(
      (state) => String(state.id) === String(source.droppableId)
    );
    const destinationStateIndex = newStates.findIndex(
      (state) => String(state.id) === String(destination.droppableId)
    );

    // 상태를 찾지 못한 경우 처리
    if (sourceStateIndex === -1 || destinationStateIndex === -1) {
      console.error("Source or destination state not found");
      return;
    }

    // source, destination 상태의 items 배열 보장
    const sourceItems = newStates[sourceStateIndex].items || [];
    const destinationItems = newStates[destinationStateIndex].items || [];

    // 동일한 상태 내에서 드래그
    if (source.droppableId === destination.droppableId) {
      const [reorderedItem] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, reorderedItem);

      newStates[sourceStateIndex].items = sourceItems;
    }
    // 다른 상태로 드래그
    else {
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      newStates[sourceStateIndex].items = sourceItems;
      newStates[destinationStateIndex].items = destinationItems;
    }

    // 상태 업데이트
    setStates(newStates);

    // 백엔드 API 호출로 상태 동기화
    try {
      // 서버에 상태 변경 요청
      // updateTaskState(movedItem.id, destination.droppableId);
    } catch (error) {
      console.error("Task 상태 업데이트 중 오류:", error);
    }
  };

  if (loadingStates) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    // handleDragEnd: 드래그 종료 시 호출되는 핸들러로, 소스(source)와 목적지(destination)를 기반으로 데이터를 업데이트
    // onDragEnd가 반드시 정의되어야 하고, 데이터 동기화를 책임짐
    <DragDropContext onDragEnd={handleDragEnd}>
      <ProjectModal
        projectId={id} // 파라미터 id값 넘김
        onAddState={handleAddState} // 상태 추가 핸들러
        onAddItem={handleAddItem} // 작업 추가 핸들러
        onEditItem={handleEditItem} // 작업 수정 핸들러
        currentStateId={currentStateId} // openTaskEditModal에서 설정한 stateId
        currentTask={currentTask} // openTaskEditModal에서 설정한 task
        setCurrentTask={setCurrentTask} // 작업 상태 업데이트 함수
      />
      {project ? (
        <article className="page-list">
          <div className="content-header">
            <div className="max-w-9xl mx-auto p-2">
              <div className="mb-3 text-center">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center space-x-3">
                    <h1 className="text-5xl font-semibold tracking-tight text-blue-800">
                      {project.projectName}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {project.status === 0 ? "In Progress" : "Completed"}
                    </p>
                  </div>

                  <div className="flex items-center">
                    {[...Array(3)].map((_, index) => (
                      <img
                        key={index}
                        src={`/images/Antwork/project/project_profile.png`}
                        alt={`Profile ${index + 1}`}
                        className="w-10 h-10 rounded-full border-2 border-white -ml-2"
                      />
                    ))}
                    <div className="w-10 h-10 bg-gray-200 text-gray-600 font-bold flex items-center justify-center rounded-full border-2 border-white -ml-2">
                      +3
                    </div>
                    <button
                      onClick={() => openModal("project-invite")}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <img
                        src="/images/Antwork/project/project_invite.png"
                        alt="Add More"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <section className="flex gap-4 overflow-x-auto pb-6">
                {/* states 배열이 초기화되기전에 map 메서드가 호출되어 에러발생하는 이슈때문에 states가 배열인지 확인하는 조건 추가 */}
                {Array.isArray(states) &&
                  states.map((state) => (
                    // droppableId는 문자열이어야 함
                    // 드래그 가능한 항목(Draggable)을 포함하는 컨테이너를 정의
                    <Droppable key={state.id} droppableId={String(state.id)}>
                      {(provided) => (
                        <article
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex-shrink-0 w-96 rounded-lg bg-white border border-blue-200 max-h-[800px]"
                        >
                          <div
                            className="p-3 border-b"
                            style={{
                              borderColor: state.color,
                              borderBottomWidth: "2px",
                              marginBottom: "5px",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-xl"
                                  style={{
                                    color: state.color,
                                    display: "inline-block",
                                    marginBottom: "4px",
                                  }}
                                >
                                  ●
                                </span>
                                <h2 className="font-semibold text-2xl">
                                  {state.title}
                                </h2>
                                <span className="text-[12px] text-gray-700 bg-gray-100 rounded-full px-3 mb-1">
                                  {state.items.length}
                                </span>
                              </div>
                            </div>
                            <p className="text-[14px] text-gray-600 mt-3">
                              {state.description}
                            </p>
                          </div>
                          <section className="p-3 bg-blue-50/50 flex flex-col">
                            <div className="flex-1 overflow-y-auto max-h-[641px]">
                              {state?.items?.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={String(item.id)}
                                  index={index}
                                >
                                  {(provided) => (
                                    <article
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                                      onClick={() =>
                                        openTaskEditModal(state.id, item)
                                      }
                                    >
                                      <div className="flex items-center justify-between group mb-3">
                                        <div className="flex items-center space-x-2">
                                          <h3 className="text-xl">
                                            {item.title}
                                          </h3>
                                          <button
                                            className="hidden group-hover:flex items-center text-sm text-gray-400 hover:text-gray-600 p-1 rounded-lg"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteTask(
                                                state.id,
                                                item.id
                                              );
                                            }}
                                          >
                                            <img
                                              src="/images/Antwork/project/project_task_delete.png"
                                              alt="삭제"
                                              className="w-6 h-6"
                                            />
                                          </button>
                                        </div>
                                      </div>

                                      <div className="absolute top-2 right-2 flex -space-x-4">
                                        <img
                                          src="/images/Antwork/project/project_profile.png"
                                          alt="Profile"
                                          className="w-8 h-8 rounded-full border border-gray-300 z-10"
                                        />
                                        <img
                                          src="/images/Antwork/project/project_profile.png"
                                          alt="Profile"
                                          className="w-8 h-8 rounded-full border border-gray-300 z-20"
                                        />
                                        <img
                                          src="/images/Antwork/project/project_profile.png"
                                          alt="Profile"
                                          className="w-8 h-8 rounded-full border border-gray-300 z-30"
                                        />
                                      </div>
                                      <div className="flex gap-1">
                                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                                          {item.priority === 0
                                            ? "P0"
                                            : item.priority === 1
                                            ? "P1"
                                            : item.priority === 2
                                            ? "P2"
                                            : "Unknown"}{" "}
                                        </span>
                                        <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                                          {item.size}
                                        </span>
                                      </div>
                                    </article>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          </section>
                          <div className="pt-3">
                            <button
                              onClick={() => openTaskCreateModal(state.id)}
                              className="w-full flex items-center text-left text-sm text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/30"
                            >
                              <img
                                src="/images/Antwork/project/project_addItem.png"
                                alt="추가"
                                className="w-5 h-5 mr-2"
                              />
                              <p className="text-[13px] text-gray-500">
                                Add item
                              </p>
                            </button>
                          </div>
                        </article>
                      )}
                    </Droppable>
                  ))}
                <div className="text-center">
                  <button
                    className="w-full flex items-center justify-center space-x-2 p-4 rounded-lg text-black font-semibold shadow-md transition-all transform hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor:
                        "rgb(217 232 255 / var(--tw-bg-opacity, 1))",
                      fontSize: "15px",
                      border: "none",
                    }}
                    onClick={() => openModal("state-add")}
                  >
                    New Status
                    <svg
                      className="w-5 h-5 ml-2"
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
                </div>
              </section>
            </div>
          </div>
        </article>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-semibold text-gray-600">Loading...</p>
        </div>
      )}
    </DragDropContext>
  );
}
