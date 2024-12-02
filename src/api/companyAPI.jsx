import { COMPANY_INSERT_URI } from "./_URI";
import axios from "axios";

/**
 * 회사 추가 API
 * @param {Object} companyData - 회사 정보 객체
 * @returns {Promise} - API 호출 결과
 */
export const addCompany = async (companyData) => {
  try {
    const response = await axios.post(COMPANY_INSERT_URI, companyData);

    if (response.data.success) {
      console.log("Company added successfully:", response.data);
      return response.data;
    } else {
      throw new Error(
        response.data.message || "회사 정보 저장에 실패했습니다."
      );
    }
  } catch (error) {
    console.error("Error adding company:", error);
    throw error; // 예외를 호출한 쪽으로 전달
  }
};
