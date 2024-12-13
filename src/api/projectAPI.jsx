import axios from "axios";
import {
  PROJECT_ADD_URI,
  PROJECT_LIST_URI,
  PROJECT_DETAIL_URI,
  PROJECT_STATE_INSERT_URI,
  PROJECT_STATE_SELECT_URI,
  PROJECT_TASK_INSERT_URI,
  PROJECT_TASK_SELECT_URI,
  PROJECT_TASK_UPDATE_URI,
  PROJECT_TASK_DELETE_URI,
  PROJECT_TASK_UPDATE_POSITION_URI,
  PROJECT_STATE_UPDATE_URI,
  PROJECT_STATE_DELETE_URI,
  PROJECT_UPDATE_URI,
  PROJECT_COLLABORATOR_INSERT_URI,
  PROJECT_COLLABORATOR_SELECT_URI,
  PROJECT_COLLABORATOR_DELETE_URI,
} from "./_URI";

// 프로젝트 등록
export const postProject = async (project, uid) => {
  try {
    // 프로젝트 객체에 uid를 추가해서 전송
    const projectWithUid = { ...project, uid }; // project와 uid를 합쳐서 전송
    console.log("projectWithUid:", projectWithUid);

    // 요청 본문에 JSON 데이터 전송
    const response = await axios.post(PROJECT_ADD_URI, projectWithUid, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error submitting project:", error);
    throw error;
  }
};

// 프로젝트 조회
export const getProjects = async (uid) => {
  try {
    console.log("백으로 가는 uid : " + uid);
    const response = await axios.get(`${PROJECT_LIST_URI}/${uid}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Fetched Projects:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error.response || error);
    throw error;
  }
};

// 프로젝트id로 상세 조회
export const getProjectById = async (id) => {
  console.log("Project Id로 프로젝트 조회 API");
  try {
    const response = await axios.get(`${PROJECT_DETAIL_URI}/${id}`, {
      headers: {
        "Content-Type": "application/json", // json 형식으로 보냄
      },
    });
    console.log("response.data:", response.data);
    return response.data; // 프로젝트 데이터 반환
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

// 프로젝트 상태 등록
export const postProjectState = async (stateData) => {
  console.log("프로젝트 상태 등록 API 들어옴");
  console.log("API 요청 데이터:", stateData); // 디버깅용
  try {
    const response = await axios.post(
      `${PROJECT_STATE_INSERT_URI}`,
      stateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // 서버에서 반환된 상태 DTO
  } catch (error) {
    console.error("Error adding project state:", error);
    throw error;
  }
};

// 프로젝트 상태 조회
export const getProjectStates = async (id) => {
  console.log("projectState 조회 API");
  try {
    const response = await axios.get(`${PROJECT_STATE_SELECT_URI}/${id}`);
    return response.data; // 서버에서 반환된 전체 상태
  } catch (error) {
    console.error("Error fetching project states:", error);
    throw error;
  }
};

// 프로젝트 작업 생성
export const createTask = async (taskData) => {
  console.log("전달되는 taskData:", taskData); // 디버깅용
  try {
    const response = await axios.post(`${PROJECT_TASK_INSERT_URI}`, taskData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("서버 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "작업 생성 중 오류 발생:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 프로젝트 작업 조회
export async function getTasksByStateId(stateId) {
  console.log("프로젝트 작업조회 API 들어옴");
  console.log("stateId : " + stateId);
  const response = await fetch(`${PROJECT_TASK_SELECT_URI}/${stateId}`);
  console.log("프로젝트 작업조회 API 반환되는 값 : " + response);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

// 프로젝트 작업 수정
export const updateTask = async (taskId, updatedTask) => {
  console.log("수정 요청 데이터:", taskId, updatedTask);
  try {
    const response = await axios.put(
      `${PROJECT_TASK_UPDATE_URI}/${taskId}`,
      updatedTask,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // 서버에서 반환된 상태 DTO
  } catch (error) {
    console.error("Error adding project state:", error);
    throw error;
  }
};

// 프로젝트 작업 개별 삭제
export const deleteTask = async (taskId) => {
  console.log("taskId : " + taskId);
  try {
    const response = await axios.delete(
      `${PROJECT_TASK_DELETE_URI}/${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // 삭제 성공 시 반환값 (필요 없으면 생략 가능)
  } catch (error) {
    console.error(
      "Task 삭제 중 오류 발생:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 드래그앤드랍시 작업 위치 update
export const updateTaskPosition = async (taskId, stateId, position) => {
  console.log(
    "백엔드로 들어오는 taskId, newStateId, newPosition : " + taskId,
    stateId,
    position
  );
  return await fetch(`${PROJECT_TASK_UPDATE_POSITION_URI}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stateId, position }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

// 프로젝트 작업상태 수정
export const updateProjectState = async (stateId, updatedState) => {
  console.log(
    "백엔드로 들어오는 stateId, updatedState : " + stateId,
    updatedState
  );
  try {
    const response = await fetch(`${PROJECT_STATE_UPDATE_URI}/${stateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedState),
    });

    if (!response.ok) {
      throw new Error("Failed to update state");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 프로젝트 작업상태 삭제
export const deleteProjectState = async (stateId) => {
  try {
    await axios.delete(`${PROJECT_STATE_DELETE_URI}/${stateId}`);
  } catch (error) {
    console.error("Error deleting project state:", error);
    throw error;
  }
};

// 프로젝트 수정
export const updateProject = async (projectId, projectData) => {
  console.log(
    "백엔드로 들어오는 projectId, projectData : " + projectId,
    projectData
  );
  try {
    const response = await axios.put(
      `${PROJECT_UPDATE_URI}/${projectId}`,
      projectData
    );
    console.log("백엔드에서 반환된 데이터 : " + response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error; // 오류를 호출한 곳으로 전달
  }
};

// 프로젝트별 협업자 초대
export const addProjectCollaborators = async (projectId, userIds) => {
  console.log("백엔드로 가는 projectId, userIds : " + projectId, userIds);

  try {
    const response = await axios.post(
      `${PROJECT_COLLABORATOR_INSERT_URI}/${projectId}`,
      userIds
    );

    console.log("response.data : " + response.data);

    return response.data;
  } catch (error) {
    console.error("협업자 추가 실패:", error);
    throw error;
  }
};

// 프로젝트별 협업자 조회
export const getProjectCollaborators = async (projectId) => {
  console.log("백엔드로 들어오는 협업자조회 projectId :" + projectId);
  try {
    const response = await axios.get(
      `${PROJECT_COLLABORATOR_SELECT_URI}/${projectId}`
    );

    console.log("백엔드에서 나온 response.data : " + response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching project collaborators:", error);
    throw error;
  }
};

// 프로젝트별 협업자 삭제
export const removeProjectCollaborator = async (projectId, userId) => {
  console.log(
    "백엔드로 가는 협업자 삭제 projectId, userId : " + projectId,
    userId
  );
  try {
    const response = await axios.delete(
      `${PROJECT_COLLABORATOR_DELETE_URI}/${projectId}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing collaborator:", error);
    throw error;
  }
};
