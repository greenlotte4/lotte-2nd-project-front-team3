import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  checkInAPI,
  checkOutAPI,
  getAttendanceStatusAPI,
} from "@/api/attendanceAPI";

const AttendanceCard = ({ userId }) => {
  const [status, setStatus] = useState("AVAILABLE");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_WORK_HOURS = 9;
  const [workHours, setWorkHours] = useState("0H");
  const [progressWidth, setProgressWidth] = useState("0%");

  // API를 사용하여 초기 상태 동기화
  useEffect(() => {
    const fetchAttendanceStatus = async () => {
      setIsLoading(true);
      try {
        const data = await getAttendanceStatusAPI(userId);
        setStatus(data.status);
        setCheckInTime(data.checkInTime);
        setCheckOutTime(data.checkOutTime);
        setError(null);
      } catch (err) {
        console.error("출퇴근 상태를 가져오는 중 오류 발생:", err);
        setError("출퇴근 상태를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchAttendanceStatus();
    }
  }, [userId]);

  // 현재 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 근무 시간 계산
  useEffect(() => {
    const calculateWorkProgress = () => {
      const startTime = checkInTime ? new Date(checkInTime) : null;
      const endTime = checkOutTime ? new Date(checkOutTime) : null;

      if (startTime && !endTime) {
        const now = new Date();
        const elapsedHours = Math.floor((now - startTime) / 3600000);
        setWorkHours(`${elapsedHours}H`);
        setProgressWidth(
          `${Math.min((elapsedHours / MAX_WORK_HOURS) * 100, 100)}%`
        );
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
    };

    calculateWorkProgress();
  }, [checkInTime, checkOutTime]);

  const handleCheckIn = async () => {
    if (checkInTime || checkOutTime) {
      alert("이미 출근 처리되었습니다.");
      return;
    }

    try {
      const response = await checkInAPI(userId); // API 호출
      setCheckInTime(response.checkInTime); // API에서 반환된 checkInTime 설정
      setStatus("WORKING");
      alert(`출근 완료: ${formatDateTime(response.checkInTime)}`);
    } catch (error) {
      console.error("출근 처리 실패:", error);
      setError(error.message || "출근 처리 중 오류가 발생했습니다.");
    }
  };

  const handleCheckOut = async () => {
    if (!checkInTime || checkOutTime) {
      alert("퇴근 처리할 수 없는 상태입니다.");
      return;
    }

    try {
      const response = await checkOutAPI(userId); // API 호출
      setCheckOutTime(response.checkOutTime); // API에서 반환된 checkOutTime 설정
      setStatus("COMPLETED");
      alert(`퇴근 완료: ${formatDateTime(response.checkOutTime)}`);
    } catch (error) {
      console.error("퇴근 처리 실패:", error);
      setError(error.message || "퇴근 처리 중 오류가 발생했습니다.");
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "--:--:--";
    try {
      return format(new Date(dateTime), "yyyy-MM-dd HH:mm:ss");
    } catch {
      return "--:--:--";
    }
  };

  // 버튼 활성화 조건
  const isCheckInDisabled = !!checkInTime || !!checkOutTime;
  const isCheckOutDisabled = !!checkOutTime || !checkInTime;

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
            {status === "AVAILABLE" || !checkInTime
              ? "기록 없음"
              : formatDateTime(checkInTime)}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>퇴근시간</span>
          <span>
            {status === "AVAILABLE" || !checkOutTime
              ? "기록 없음"
              : formatDateTime(checkOutTime)}
          </span>
        </div>
      </section>

      <hr className="border-t border-dashed border-gray-300 my-6" />

      <section className="flex justify-between">
        <button
          className={`w-[100px] h-[50px] font-medium rounded-3xl transition ${
            isCheckInDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handleCheckIn}
          disabled={isCheckInDisabled}
        >
          출근하기
        </button>
        <button
          className={`w-[100px] h-[50px] font-medium rounded-3xl transition ${
            isCheckOutDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          onClick={handleCheckOut}
          disabled={isCheckOutDisabled}
        >
          퇴근하기
        </button>
      </section>

      {isLoading && (
        <p className="text-center text-blue-500 mt-4">처리 중...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AttendanceCard;
