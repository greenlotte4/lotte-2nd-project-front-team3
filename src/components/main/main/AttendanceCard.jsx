import React, { useState, useEffect } from "react";
import useAttendanceStore from "./../../../store/useAttendanceStore";
import useAuthStore from "./../../../store/AuthStore";

const AttendanceCard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [workHours, setWorkHours] = useState("0H");
  const [progressWidth, setProgressWidth] = useState("0%");
  const [currentTime, setCurrentTime] = useState(new Date());
  const MAX_WORK_HOURS = 9; // 하루 근무 시간 기준 9시간

  const user = useAuthStore((state) => state.user);

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

  // 실시간 현재 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 매 초마다 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클린업
  }, []);

  // 근무 시간 및 진행률 계산
  useEffect(() => {
    let interval;

    const parseTime = (time) => {
      if (typeof time === "string" && !isNaN(new Date(time).getTime())) {
        return new Date(time);
      }
      if (typeof time === "string" && time.match(/^\d{2}:\d{2}:\d{2}$/)) {
        const [hours, minutes, seconds] = time.split(":").map(Number);
        const now = new Date();
        now.setHours(hours, minutes, seconds, 0);
        return now;
      }
      return null;
    };

    const startTime = parseTime(checkInTime);
    const endTime = checkOutTime ? parseTime(checkOutTime) : null;

    if (startTime && !endTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsedHours = Math.floor((now - startTime) / 3600000);
        setWorkHours(`${elapsedHours}H`);
        setProgressWidth(
          `${Math.min((elapsedHours / MAX_WORK_HOURS) * 100, 100)}%`
        );
      }, 1000);
    } else if (startTime && endTime) {
      const elapsedHours = Math.floor((endTime - startTime) / 3600000);
      setWorkHours(`${elapsedHours}H`);
      setProgressWidth(
        `${Math.min((elapsedHours / MAX_WORK_HOURS) * 100, 100)}%`
      );
    } else {
      setWorkHours("0H");
      setProgressWidth("0%");
    }

    return () => clearInterval(interval);
  }, [checkInTime, checkOutTime]);

  const handleCheckIn = async () => {
    try {
      await checkIn(user.id);
      alert("출근 처리 완료! 오늘도 좋은 하루 되세요.");
    } catch (err) {
      console.error("출근 처리 실패:", err);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut(user.id);
      alert("퇴근 처리 완료! 수고하셨습니다.");
    } catch (err) {
      console.error("퇴근 처리 실패:", err);
    }
  };

  const handleTaskSelection = async (task) => {
    setCurrentTask(task);
    setIsMenuOpen(false);
    try {
      await updateStatus(user.id, task);
      alert(`상태가 "${task}"(으)로 업데이트되었습니다.`);
    } catch (err) {
      console.error("상태 업데이트 실패:", err);
    }
  };

  return (
    <div className="w-[260px] bg-white rounded-lg shadow-md p-5 mt-5">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">근태관리</h1>
        <p className="text-sm text-gray-500 mt-2">
          {currentTime.toLocaleString()}
        </p>
      </div>

      <section className="mb-6">
        <div className="flex justify-between items-end">
          <span className="text-3xl font-bold text-blue-600">{workHours}</span>
          <span className="text-sm text-gray-500">
            최대 {MAX_WORK_HOURS}시간
          </span>
        </div>
        <div className="relative w-full h-4 bg-gray-200 rounded-full mt-4">
          <div
            className="absolute h-4 bg-blue-500 rounded-full"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between text-gray-700">
          <span>출근시간</span>
          <span>
            {checkInTime && typeof checkInTime === "string"
              ? checkInTime
              : "--:--:--"}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>퇴근시간</span>
          <span>
            {checkOutTime && typeof checkOutTime === "string"
              ? checkOutTime
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
          onClick={handleCheckIn}
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
          onClick={handleCheckOut}
          disabled={status === "CHECKED_OUT" || status === "AVAILABLE"}
        >
          퇴근하기
        </button>
      </section>

      <section className="mt-6 text-center">
        <button
          className={`w-[170px] h-[50px] font-medium rounded-3xl ${
            status === "CHECKED_IN"
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition`}
          onClick={() =>
            status === "CHECKED_IN" && setIsMenuOpen((prev) => !prev)
          }
          disabled={status !== "CHECKED_IN"}
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
