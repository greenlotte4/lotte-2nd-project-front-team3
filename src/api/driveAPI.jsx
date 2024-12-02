import axios from "axios";
import { DRIVE_FOLDER_INSERT_URI, MY_DRIVE_FOLDERS_URI } from "./_URI";

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

//드라이브 폴더 등록
export const MyDriveFoldersView = async () => {
  try {
    const response = await axios.get(`${MY_DRIVE_FOLDERS_URI}`);
    console.log("Email verification response:", response.data);
    return response;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};
