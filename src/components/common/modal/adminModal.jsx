import { useEffect, useState } from "react";
import useModalStore from "../../../store/modalStore";
import { inviteUser } from "../../../api/userAPI";
import {
  fetchDepartmentsByCompanyId,
  insertDepartment,
} from "../../../api/departmentAPI";
import useAuthStore from "./../../../store/AuthStore";

const AdminModal = () => {
  const { isOpen, type, props, closeModal } = useModalStore();

  // 공통 상태 관리
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPositon] = useState("");
  const [role, setRole] = useState("USER"); // 기본값: 'USER'
  const [note, setNote] = useState("");
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const [departments, setDepartments] = useState([]); // 부서 목록 상태 추가

  // 모달 열릴 때 부서 목록 가져오기
  useEffect(() => {
    if (isOpen && type === "member-invite") {
      const loadDepartments = async () => {
        try {
          const data = await fetchDepartmentsByCompanyId(user?.company); // 회사 ID로 부서 목록 가져오기
          setDepartments(data);
        } catch (error) {
          console.error("부서 목록 가져오기 실패:", error);
          setDepartments([]); // 실패 시 빈 배열
        }
      };

      loadDepartments();
    }
  }, [isOpen, type, user?.company.id]);

  if (!isOpen) return null;

  // 멤버 초대 핸들러
  const handleInviteUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name,
        email: mail,
        department,
        position,
        role,
        note,
      };

      const response = await inviteUser(payload);
      console.log("초대 성공:", response);
      alert("초대가 성공적으로 완료되었습니다!");
      closeModal();
    } catch (err) {
      console.error("초대 실패:", err);
      setError("초대에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 부서 생성 핸들러
  const handleAddDepartment = async () => {
    if (!newDepartmentName.trim()) {
      alert("부서명을 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      // 서버에 부서 생성 요청
      const newDepartment = await insertDepartment(
        newDepartmentName,
        user.company
      );

      // 생성된 부서 데이터를 부모 컴포넌트로 전달
      if (props?.onCreate) {
        props.onCreate({
          id: newDepartment.id,
          name: newDepartment.name,
          users: newDepartment.users || [],
          createdAt: newDepartment.createdAt,
          updatedAt: newDepartment.updatedAt,
        });
      }

      alert("부서 생성이 완료되었습니다!");
      setNewDepartmentName(""); // 입력 필드 초기화
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("부서 생성 실패:", error);
      alert(error.message || "부서 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "member-invite":
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[500px] h-auto p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-gray-800">멤버 초대</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleInviteUser}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mail"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      이메일
                    </label>
                    <input
                      type="email"
                      id="mail"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="example@domain.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="department"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      부서
                    </label>
                    <select
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                      <option value="">부서를 선택하세요</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="position"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      직급
                    </label>
                    <input
                      type="text"
                      id="position"
                      value={position}
                      onChange={(e) => setPositon(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      역할
                    </label>
                    <select
                      id="role"
                      value={role} // 상태값과 연결
                      onChange={(e) => {
                        console.log("Selected Role:", e.target.value); // 선택된 값 확인
                        setRole(e.target.value); // 상태 업데이트
                      }}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                      <option value="USER">직원</option>
                      <option value="ADMIN">관리자</option>
                      <option value="SUPER_ADMIN">슈퍼 관리자</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="note"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      초대 메모 (선택)
                    </label>
                    <textarea
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="초대와 관련된 메모를 추가하세요."
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mr-2"
                    disabled={loading}
                  >
                    {loading ? "초대 중..." : "초대하기"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
                    onClick={closeModal}
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case "add-department":
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-1/3">
              <h2 className="text-lg font-bold mb-4 text-gray-700">
                부서 생성
              </h2>
              <input
                type="text"
                placeholder="부서명"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  onClick={handleAddDepartment}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  생성
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default AdminModal;
