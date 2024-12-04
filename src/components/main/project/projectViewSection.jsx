import { useEffect, useState } from "react";
import ProjectModal from "../../common/modal/projectModal";
import useModalStore from "../../../store/modalStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../../api/projectAPI";

export default function ProjectViewSection() {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  console.log("id : " + id);

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

  const [states, setStates] = useState([]);
  const [currentStateId, setCurrentStateId] = useState(null);
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

  const handleAddItem = (stateId, newItem) => {
    setStates((prevStates) =>
      prevStates.map((state) =>
        state.id === stateId
          ? {
              ...state,
              items: [
                ...state.items,
                { ...newItem, id: Date.now().toString() },
              ],
            }
          : state
      )
    );
  };

  const handleEditItem = (stateId, updatedItem) => {
    setStates((prevStates) =>
      prevStates.map((state) =>
        state.id === stateId
          ? {
              ...state,
              items: state.items.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              ),
            }
          : state
      )
    );
    setCurrentTask(null);
  };

  const openTaskCreateModal = (stateId) => {
    setCurrentStateId(stateId);
    setCurrentTask(null);
    openModal("task-create");
  };

  const openTaskEditModal = (stateId, task) => {
    setCurrentStateId(stateId);
    setCurrentTask(task);
    openModal("task-edit");
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceState = states.find((state) => state.id === source.droppableId);
    const destinationState = states.find(
      (state) => state.id === destination.droppableId
    );

    if (!sourceState || !destinationState) return;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(sourceState.items);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      setStates((prevStates) =>
        prevStates.map((state) =>
          state.id === sourceState.id ? { ...state, items } : state
        )
      );
    } else {
      const sourceItems = Array.from(sourceState.items);
      const destinationItems = Array.from(destinationState.items);

      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      setStates((prevStates) =>
        prevStates.map((state) => {
          if (state.id === sourceState.id)
            return { ...state, items: sourceItems };
          if (state.id === destinationState.id)
            return { ...state, items: destinationItems };
          return state;
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ProjectModal
        onAddState={handleAddState}
        onAddItem={(newItem) => handleAddItem(currentStateId, newItem)}
        onEditItem={handleEditItem}
        currentStateId={currentStateId}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
      />
      {project ? (
        <article className="page-list">
          <div className="content-header">
            <div className="max-w-9xl mx-auto p-2">
              <div className="mb-3 text-center">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center space-x-3">
                    <h1 className="text-4xl font-bold tracking-wide text-blue-700">
                      {project.projectName}
                    </h1>
                    <p>
                      Status:{" "}
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
                {states.map((state) => (
                  <Droppable key={state.id} droppableId={state.id}>
                    {(provided) => (
                      <article
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-shrink-0 w-96 rounded-lg bg-white border border-blue-200 max-h-[800px]"
                      >
                        <div className="p-3 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xl"
                                style={{ color: state.color }}
                              >
                                ●
                              </span>
                              <h2 className="font-semibold text-2xl">
                                {state.title}
                              </h2>
                              <span className="text-sm text-gray-500 bg-gray-50 rounded-full px-2">
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
                            {state.items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
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
                                    <h3 className="text-xl mb-2">
                                      {item.title}
                                    </h3>
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
                                        {item.priority}
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
                    className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 h-10 transition-colors"
                    style={{ backgroundColor: "#D9E8FF" }}
                    onClick={() => openModal("state-add")}
                  >
                    <svg
                      className="w-6 h-6"
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
