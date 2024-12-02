import axios from "axios";
import { PROJECT_ADD_URI } from "./_URI";

export const postProject = async (project) => {
  try {
    // JSON 데이터로 전송
    const response = await axios.post(PROJECT_ADD_URI, project, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    console.log("Project Created Successfully:", response.data);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error submitting project:", error);
    throw error; // 에러를 상위 호출로 전달
  }
};

// export const getProduct = async (pg) => {
//   try {
//     const response = await axios.get(`${PRODUCT_URI}/${pg}`);
//     console.log(response.data);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// };
