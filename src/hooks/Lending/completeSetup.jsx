import { addUser } from "../../api/userAPI";
import { addCompany } from "./../../api/companyAPI";

export const completeSetup = async (state, dispatch) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });

    // 회사 정보 저장
    const companyData = {
      name: state.companyName,
      description: state.companyDescription,
      foundationDate: state.foundationDate,
      startTime: state.startTime,
      endTime: state.endTime,
      address: state.address,
      businessNumber: state.businessNumber,
      logo: state.logo,
    };

    const companyResponse = await addCompany(companyData);

    const companyId = companyResponse.companyId; // 저장된 회사 ID

    // 사용자 정보 저장
    const userData = {
      username: state.adminId,
      password: state.adminPassword,
      email: state.adminEmail,
      companyId,
    };

    await addUser(userData);

    // 성공 시 상태 초기화 및 메시지 출력
    dispatch({ type: "RESET" });
    alert("설정이 완료되었습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/login";
  } catch (error) {
    console.error("설정 완료 중 오류:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};
