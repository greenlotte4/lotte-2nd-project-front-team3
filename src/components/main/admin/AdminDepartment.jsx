import { useEffect, useState } from "react";
import useModalStore from "./../../../store/modalStore";
import AdminModal from "./../../common/modal/adminModal";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import useAuthStore from "./../../../store/AuthStore";
import { fetchDepartmentsByCompanyId } from "../../../api/departmentAPI";

export default function AdminDepartment() {
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const { openModal } = useModalStore();

  // 상태 관리
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);

  // 부서 데이터 로드
  const fetchDepartments = async () => {
    if (!user?.company) return;

    try {
      const data = await fetchDepartmentsByCompanyId(user.company);
      setDepartments(data); // API에서 부서 데이터를 받아서 설정
    } catch (error) {
      console.error("부서 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 사용자 및 부서 초기화
  useEffect(() => {
    fetchDepartments();
  }, [user]);

  // 부서 추가 핸들러
  const handleAddDepartment = () => {
    if (!user?.company) {
      alert("회사를 선택하세요.");
      return;
    }

    openModal("add-department", {
      id: user.company, // 회사 ID 전달
      onCreate: (newDepartment) => {
        // 새로운 부서 데이터를 부모 상태에 추가
        setDepartments((prevDepartments) => [
          ...prevDepartments,
          newDepartment,
        ]);
      },
    });
  };

  // 부서 삭제 핸들러
  const handleDeleteDepartment = () => {
    if (!selectedDepartment) {
      alert("삭제할 부서를 선택하세요.");
      return;
    }

    setDepartments(
      departments.filter((dept) => dept.id !== selectedDepartment.id)
    );
    setSelectedDepartment(null);
  };

  const renderTree = () => (
    <ul className="ml-4 border-l border-gray-300">
      {departments.map((department) => (
        <li key={department.id} className="mb-2">
          <div className="flex items-center cursor-pointer group">
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
          <ul className="ml-4 list-disc text-gray-700">
            {department.users.map((user, index) => (
              <li key={index}>{user.name || "Unknown User"}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );

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
                {user?.companyName}
              </span>
            </div>
            <div className="mt-4">
              <span className="text-gray-500">사용자 목록:</span>
              <ul className="ml-4 list-disc text-gray-700">
                {selectedDepartment.users.map((user, index) => (
                  <li key={index}>{user.name || "Unknown User"}</li>
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
