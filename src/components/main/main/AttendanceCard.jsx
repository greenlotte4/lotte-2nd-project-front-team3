import React, { useState } from "react";
import useAttendanceStore from "./../../../store/useAttendanceStore";
import useAuthStore from "./../../../store/AuthStore";

const AttendanceCard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기

  const {
    status,
    checkInTime,
    checkOutTime,
    isLoading,
    error,
    checkIn,
    checkOut,
    updateStatus,
  } = useAttendanceStore();

  const handleCheckIn = async () => {
    const userId = user.id; // Zustand 또는 AuthStore에서 가져오기
    try {
      await checkIn(userId); // 출근 API 호출
      alert("출근처리완료! 오늘도 개미처럼 일하세염");
    } catch (err) {
      console.error("출근 처리 실패:", err);
    }
  };

  const handleCheckOut = async () => {
    const userId = user.id;
    try {
      await checkOut(userId); // 퇴근 API 호출
      alert("퇴근처리완료! 오늘도 개미처럼 일하셨져?");
    } catch (err) {
      console.error("퇴근 처리 실패:", err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleTaskSelection = async (task) => {
    const userId = user.id;
    setCurrentTask(task); // 선택한 업무 설정
    setIsMenuOpen(false); // 메뉴 닫기

    try {
      await updateStatus(userId, task); // 상태 업데이트 API 호출
      alert("열나게 일하고 계시죠? 상태변경완료~");
    } catch (err) {
      console.error("업무 상태 업데이트 실패:", err);
    }
  };

  return (
    <div className="w-[260px] bg-white rounded-lg shadow-md p-5 mt-5">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">근태관리</h1>
        <p className="text-sm text-gray-500 mt-2">
          {new Date().toLocaleString()}
        </p>
      </div>

      <section className="mb-6">
        <div className="flex justify-between items-end">
          <span className="text-3xl font-bold text-blue-600">
            {/* 근무 시간 표시 */}
          </span>
          <span className="text-sm text-gray-500">최대 52시간</span>
        </div>
        <div className="relative w-full h-4 bg-gray-200 rounded-full mt-4">
          <div
            className="absolute h-4 bg-blue-500 rounded-full"
            style={{ width: "50%" }} // 동적 비율로 변경 가능
          ></div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between text-gray-700">
          <span>출근시간</span>
          <span>
            {checkInTime
              ? new Date(checkInTime).toLocaleTimeString()
              : "--:--:--"}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>퇴근시간</span>
          <span>
            {checkOutTime
              ? new Date(checkOutTime).toLocaleTimeString()
              : "--:--:--"}
          </span>
        </div>
      </section>

      <hr className="border-t border-dashed border-gray-300 my-6" />

      <section className="flex justify-between">
        <button
          className={`w-[100px] h-[50px] font-medium rounded-3xl transition ${
            status === "CHECKED_IN"
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={status !== "CHECKED_IN" ? handleCheckIn : null}
          disabled={status === "CHECKED_IN"}
        >
          출근하기
        </button>
        <button
          className={`w-[100px] h-[50px] font-medium rounded-3xl transition ${
            status === "CHECKED_OUT"
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          onClick={status === "CHECKED_IN" ? handleCheckOut : null}
          disabled={status === "CHECKED_OUT" || status === "AVAILABLE"}
        >
          퇴근하기
        </button>
      </section>

      <section className="mt-6 text-center">
        <button
          className="w-[170px] h-[50px] bg-gray-200 text-gray-700 font-medium rounded-3xl hover:bg-gray-300 transition"
          onClick={toggleMenu}
        >
          {currentTask || "업무 선택"}
        </button>
        {isMenuOpen && (
          <div className="mt-4 w-[200px] bg-white text-gray-700 rounded-lg shadow-lg p-3 absolute z-10">
            <ul className="space-y-2">
              {["반차", "휴가", "출장", "교육", "회의", "기타", "업무"].map(
                (item) => (
                  <li
                    key={item}
                    className="cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md"
                    onClick={() => handleTaskSelection(item)}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </section>

      {isLoading && (
        <p className="text-center text-blue-500 mt-4">처리 중...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AttendanceCard;
