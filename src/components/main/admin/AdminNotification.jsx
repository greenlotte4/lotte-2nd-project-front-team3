import React, { useState, useEffect } from "react";
import useAuthStore from "./../../../store/AuthStore";
import { fetchDepartmentsByCompanyId } from "@/api/departmentAPI";
import { fetchUsersByDepartmentId } from "@/api/userAPI";
import { sendNotification } from "./../../../api/notificationAPI";

export default function AdminNotification() {
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState("전체"); // 대상 유형
  const [departments, setDepartments] = useState([]); // 부서 목록
  const [users, setUsers] = useState([]); // 사용자 목록
  const [selectedDepartment, setSelectedDepartment] = useState(""); // 선택된 부서 ID
  const [selectedUser, setSelectedUser] = useState(""); // 선택된 사용자 ID
  const [isSending, setIsSending] = useState(false); // 전송 중 상태

  // 부서 데이터 로드
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartmentsByCompanyId(user.company);
        setDepartments(data);
      } catch (error) {
        console.error("부서 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (user.company) {
      loadDepartments(); // 회사 정보가 있을 때만 부서 목록 로드
    }
  }, [user.company]); // user.company가 변경될 때만 실행

  // 사용자 데이터 로드
  const loadUsersByDepartment = async (departmentId) => {
    try {
      const data = await fetchUsersByDepartmentId(departmentId);
      setUsers(data); // 사용자 목록 저장
    } catch (error) {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 부서 선택 시 사용자 목록 업데이트
  const handleDepartmentChange = (departmentId) => {
    setSelectedDepartment(departmentId);
    setSelectedUser(""); // 사용자 선택 초기화
    if (departmentId) {
      loadUsersByDepartment(departmentId);
    } else {
      setUsers([]); // 부서가 선택되지 않으면 사용자 목록 초기화
    }
  };

  const sendHandler = async () => {
    if (isSending) return; // 중복 실행 방지
    setIsSending(true); // 실행 상태 업데이트

    try {
      if (!message.trim()) {
        alert("메시지를 입력해주세요!");
        return;
      }

      let targetId;
      if (targetType === "전체") {
        targetId = null; // 회사 전체 대상
      } else if (targetType === "부서" && selectedDepartment) {
        targetId = selectedDepartment; // 특정 부서 대상
      } else if (targetType === "사용자" && selectedUser) {
        targetId = selectedUser; // 특정 사용자 대상
      } else {
        alert("대상을 선택해주세요!");
        return;
      }

      const payload = {
        targetType,
        targetId,
        message,
        metadata: {
          projectId: 456, // 테스트 데이터
          projectName: "테스트 프로젝트", // 테스트 데이터
        },
      };

      console.log("전송 데이터:", payload);

      await sendNotification(payload);

      alert("알림이 성공적으로 전송되었습니다!");
      setMessage(""); // 입력 초기화
    } catch (error) {
      alert(error.message || "알림 전송에 실패했습니다.");
    } finally {
      setIsSending(false); // 실행 상태 해제
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">알림 관리</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">알림 작성</h2>
        {/* 대상 선택 */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">대상 선택</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
          >
            <option value="전체">전체 회사</option>
            <option value="부서">특정 부서</option>
            <option value="사용자">특정 사용자</option>
          </select>
        </div>
        {/* 부서 선택 */}
        {(targetType === "부서" || targetType === "사용자") && (
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">부서 선택</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDepartment}
              onChange={(e) => handleDepartmentChange(e.target.value)}
            >
              <option value="">부서를 선택하세요</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* 사용자 선택 */}
        {targetType === "사용자" && (
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">사용자 선택</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={!selectedDepartment} // 부서 선택 전에는 비활성화
            >
              <option value="">사용자를 선택하세요</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <textarea
          className="w-full h-28 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="알림 메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className={`bg-blue-500 text-white py-2 px-6 rounded-md mt-4 ${
            isSending ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={() => sendHandler()}
          disabled={isSending}
        >
          {isSending ? "전송 중..." : "전송하기"}
        </button>
      </div>
    </div>
  );
}
