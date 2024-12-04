import { useEffect, useState } from "react";
import useModalStore from "./../../../store/modalStore";
import AdminModal from "./../../common/modal/adminModal";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import useAuthStore from "./../../../store/AuthStore";
import { fetchDepartmentsByCompanyId } from "../../../api/departmentAPI";

export default function AdminDepartment() {
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const { openModal } = useModalStore();

  // 회사 데이터 초기화
  const [companies, setCompanies] = useState([
    {
      id: user?.company || 0,
      name: user?.companyName || "알 수 없는 회사",
      isExpanded: false,
      departments: [], // 초기 상태
    },
  ]);

  const [selectedCompany, setSelectedCompany] = useState(companies[0] || null); // 초기 선택된 회사
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const fetchDepartmentsForCompany = async (companyId) => {
    try {
      const departments = await fetchDepartmentsByCompanyId(companyId);
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === companyId
            ? { ...company, departments } // 부서를 해당 회사의 departments 배열에 추가
            : company
        )
      );
    } catch (error) {
      console.error("부서 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (companies.length > 0 && companies[0]?.id) {
      fetchDepartmentsForCompany(companies[0].id); // 첫 번째 회사의 부서 데이터를 초기화
    }
  }, [companies]);

  const toggleExpand = (company) => {
    company.isExpanded = !company.isExpanded;
    setCompanies([...companies]);

    // 확장 시 부서 데이터를 불러오기
    if (company.isExpanded && company.departments.length === 0) {
      fetchDepartmentsForCompany(company.id);
    }
  };

  const handleAddDepartment = () => {
    if (!selectedCompany) {
      alert("회사를 선택하세요.");
      return;
    }

    openModal("add-department", {
      id: user.company, // 선택된 회사 ID 전달
      onCreate: (newDepartmentName) => {
        const newDepartment = {
          id: Date.now(),
          name: newDepartmentName,
          isExpanded: false,
          users: [],
        };
        selectedCompany.departments.push(newDepartment);
        setCompanies([...companies]);
      },
    });
  };

  const handleDeleteDepartment = () => {
    if (!selectedDepartment) {
      alert("삭제할 부서를 선택하세요.");
      return;
    }

    selectedCompany.departments = selectedCompany.departments.filter(
      (dept) => dept.id !== selectedDepartment.id
    );
    setSelectedDepartment(null);
    setCompanies([...companies]);
  };

  const handleAddUser = () => {
    if (!selectedDepartment) {
      alert("사용자를 추가할 부서를 선택하세요.");
      return;
    }

    const newUser = `새 사용자 ${Date.now()}`;
    selectedDepartment.users.push(newUser);
    setCompanies([...companies]);
  };

  const renderTree = () => {
    const handleCompanyToggle = (company) => {
      company.isExpanded = !company.isExpanded;
      setCompanies([...companies]);

      // 회사 확장 시 부서 데이터 로드
      if (company.isExpanded && company.departments.length === 0) {
        fetchDepartmentsForCompany(company.id); // API 호출
      }
    };

    const handleDepartmentToggle = (department) => {
      department.isExpanded = !department.isExpanded;
      setCompanies([...companies]);
    };

    return (
      <ul className="ml-4">
        {companies.map((company) => (
          <li key={company.id} className="mb-4">
            {/* 회사 레벨 */}
            <div className="flex items-center cursor-pointer group">
              <button
                onClick={() => handleCompanyToggle(company)}
                className="mr-2 w-4 h-4 flex items-center justify-center border border-gray-300 rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                {company.isExpanded ? "-" : "+"}
              </button>
              <span
                onClick={() => {
                  setSelectedCompany(company);
                  setSelectedDepartment(null);
                }}
                className={`flex-1 px-2 py-1 rounded ${
                  selectedCompany?.id === company.id
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                {company.name}
              </span>
            </div>
            {company.isExpanded && (
              <ul className="ml-4 border-l border-gray-300">
                {company.departments.map((department) => (
                  <li key={department.id} className="mb-2">
                    {/* 부서 레벨 */}
                    <div className="flex items-center cursor-pointer group">
                      <button
                        onClick={() => handleDepartmentToggle(department)}
                        className="mr-2 w-4 h-4 flex items-center justify-center border border-gray-300 rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        {department.isExpanded ? "-" : "+"}
                      </button>
                      <span
                        onClick={() => setSelectedDepartment(department)}
                        className={`flex-1 px-2 py-1 rounded ${
                          selectedDepartment?.id === department.id
                            ? "bg-gray-200 font-bold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {department.name}
                      </span>
                    </div>
                    {department.isExpanded && (
                      <ul className="ml-4 list-disc text-gray-700">
                        {department.users.map((user, index) => (
                          <li key={index}>{user}</li>
                        ))}
                        <button
                          onClick={handleAddUser}
                          className="ml-4 mt-2 text-blue-500 hover:underline text-sm"
                        >
                          + 사용자 추가
                        </button>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {/* 왼쪽: 조직도 */}
      <div className="w-1/3 bg-white shadow-md rounded-lg p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 text-gray-700">조직도</h2>
        <div className="mb-4 flex space-x-2">
          {/* 부서 추가 버튼 */}
          <button
            onClick={handleAddDepartment}
            className="w-full flex items-center justify-center text-black px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            <AiOutlinePlus className="mr-2" />
            부서 추가
          </button>
          {/* 부서 삭제 버튼 */}
          <button
            onClick={handleDeleteDepartment}
            className="w-full flex items-center justify-center text-black px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            <AiOutlineDelete className="mr-2" />
            부서 삭제
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{renderTree()}</div>
      </div>

      {/* 오른쪽: 세부 정보 */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6 ml-4">
        {selectedDepartment ? (
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              {selectedDepartment.name} 정보
            </h2>
            <div>
              <span className="text-gray-500">소속 회사: </span>
              <span className="text-gray-800 font-medium">
                {selectedCompany?.name}
              </span>
            </div>
            <div className="mt-4">
              <span className="text-gray-500">사용자 목록:</span>
              <ul className="ml-4 list-disc text-gray-700">
                {selectedDepartment.users.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">부서를 선택하세요.</p>
        )}
      </div>

      {/* 모달 통합 */}
      <AdminModal />
    </div>
  );
}
