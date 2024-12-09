import axios from "axios";
import {
  DRIVE_FILES_INSERT_URI,
  DRIVE_FOLDER_FILE_INSERT_URI,
  DRIVE_FOLDER_INSERT_URI,
  MY_DRIVE_FILE_DOWNLOAD,
  MY_DRIVE_SELECT_URI,
  MY_DRIVE_URI,
} from "./_URI";

//드라이브 폴더 등록
export const driveFolderInsert = async (data) => {
  try {
    const response = await axios.post(`${DRIVE_FOLDER_INSERT_URI}`, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//드라이브 파일 등록
export const driveFilesInsert = async (formData) => {
  try {
    const response = await axios.post(`${DRIVE_FILES_INSERT_URI}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//드라이브 폴더 등록
export const driveFolderFileInsert = async (formData) => {
  try {
    const response = await axios.post(`${DRIVE_FOLDER_FILE_INSERT_URI}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const driveFileDownload = async (driveFileId) => {
  try {
    const response = await axios.get(`${MY_DRIVE_FILE_DOWNLOAD}`, {
      params: { driveFileId }, //id전달
      responseType: "blob", // 바이너리 데이터로 응답 받음
    });

    console.log("파일 다운로드 응답:", response);
    return response;
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};


//마이 드라이브 전체보기
export const MyDriveView = async () => {
  try {
    const response = await axios.get(`${MY_DRIVE_URI}`);
    console.log("Email verification response:", response.data);
    return response;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};

// 마이 드라이브 선택보기
export const MyDriveSelectView = async (driveFolderId) => {
  try {
    const response = await axios.get(`${MY_DRIVE_SELECT_URI}/${driveFolderId}`);
    console.log("마이 드라이브 선택보기:", response.data);
    return response;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};
