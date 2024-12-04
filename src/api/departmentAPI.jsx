import axios from "axios";
import { DEPARTMENT_INSERT_URI, DEPARTMENT_SELECT_URI } from "./_URI";
import axiosInstance from "./../utils/axiosInstance";

// 부서 생성 함수
export const insertDepartment = async (departmentName, companyId) => {
  try {
    // 서버로 전송할 데이터
    const payload = {
      name: departmentName, // 부서 이름
      company_id: companyId, // 회사 ID
    };

    // 인증된 요청
    const response = await axiosInstance.post(DEPARTMENT_INSERT_URI, payload, {
      headers: {
        "Content-Type": "application/json", // JSON MIME 타입 설정
      },
    });

    console.log("부서 생성 성공:", response.data);

    return response.data; // 성공 응답 반환
  } catch (error) {
    console.error("부서 생성 요청 실패:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "부서 생성 요청에 실패했습니다."
    );
  }
};

// 부서 조회
export const fetchDepartmentsByCompanyId = async (companyId) => {
  try {
    const response = await axiosInstance.get(
      `${DEPARTMENT_SELECT_URI}/${companyId}`
    );
    return response.data; // 부서 데이터 반환
  } catch (error) {
    console.error("부서 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};
