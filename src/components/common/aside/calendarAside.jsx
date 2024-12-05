import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCalendar,
  insertCalendar,
  updateCalendar,
  deleteCalendar,
  getSchedule,
} from "../../../api/calendarAPI";
import useAuthStore from "../../../store/AuthStore";

export default function CalendarAside({ asideVisible, setListMonth }) {
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기
  const uid = user?.uid;

  const [isMyOpen, setIsMyOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const handleButtonClick = () => {
    console.log("버튼 클릭!");
    setListMonth("listWeek"); // listMonth 값 업데이트
  };
  const handleButtonClick2 = () => {
    console.log("버튼 클릭!");
    setListMonth("listMonth"); // listMonth 값 업데이트
  };
  const [calendars, setCalendars] = useState([]);
  const [editingId, setEditingId] = useState(null); // 수정 중인 캘린더 ID
  const [newName, setNewName] = useState(""); // 수정 중인 이름
  // 새 캘린더 추가 함수
  const addCalendar = async (e) => {
    e.preventDefault();
    if (confirm("캘린더를 추가 하시겠습니까?")) {
      const newCalendar = {
        no: calendars.length,
        name: `새 캘린더`, // 기본 이름
        user_id: uid,
      };
      setCalendars([...calendars, newCalendar]); // 상태 업데이트
      await insertCalendar(newCalendar);
      window.location.reload(); // 페이지 새로 고침
    }
  };

  const startEditing = (no, currentName) => {
    setEditingId(no);
    setNewName(currentName); // 기존 이름 설정
  };

  // 이름 저장
  const saveName = (no) => {
    const fetchData = async () => {
      await updateCalendar(no, newName);
    };

    fetchData();
    setEditingId(null); // 수정 모드 종료
    setNewName(""); // 입력 초기화
    window.location.reload(); // 페이지 새로 고침
  };

  // 수정 취소
  const cancelEditing = () => {
    setEditingId(null);
    setNewName("");
  };

  // 캘린더 삭제
  const deleteCal = (no) => {
    const fetchData = async () => {
      await deleteCalendar(no);
    };
    fetchData();
    window.location.reload(); // 페이지 새로 고침
  };

  const [data, setData] = useState([]);
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    const currentTime = new Date();
    const fetchData = async () => {
      const data = await getCalendar(uid);
      const data2 = await getSchedule(uid);

      const updatedData = data2.filter((item) => {
        const endTime = new Date(item.end);
        return endTime > currentTime; // endTime이 현재 시간보다 큰 경우만 남김
      });

      setData(data);
      setSchedule(updatedData);
    };

    fetchData();
  }, [uid]);

  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""}`}>
        <div className="logo !border-b-0">
          <span className="sub-title">My Schedule</span>

          <span className="title">Calendar</span>
          <Link
            to="/antwork/schedule"
            className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 mt-6 h-14"
            style={{ backgroundColor: "#D9E8FF" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-xl">New Schedule</span>
          </Link>
        </div>
        <ul className="a mt-20">
          <li className="">
            <div>
              <button
                type="button"
                className="w-[195px] h-[40px] flex items-center border-b border-[#d9d9d9] mb-[15px]"
                onClick={() => setIsMyOpen(!isMyOpen)}
              >
                <span className="m-[3px] cursor-pointer">
                  <img
                    src={
                      isMyOpen
                        ? "/images/Antwork/main/drive/위화살표.png"
                        : "/images/Antwork/main/drive/아래화살표.png"
                    }
                    alt="화살표 아이콘"
                    className="w-4 h-4"
                  />
                </span>

                <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                  <img
                    src="/images/ico/event_available_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="main-cate">캘린더</span>
              </button>
            </div>
            <div
              className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                isMyOpen ? "max-h-screen" : "max-h-0"
              } pl-8`}
            >
              <ul>
                {data.map((item) => (
                  <li key={item.calendarId}>
                    <div className="flex items-center mb-2 space-x-4">
                      <img
                        src="/images/Antwork/calendar/캘린더.svg"
                        alt="캘린더"
                        className="w-7 h-7"
                      />

                      {/* 이름 표시 또는 수정 필드 */}
                      {editingId === item.calendarId ? (
                        <div>
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border rounded-md w-[150px] px-2 py-1"
                          />
                          <button
                            onClick={() => saveName(item.calendarId)}
                            className="ml-2 text-green-500"
                          >
                            저장
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="ml-2 text-red-500"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <span>{item.name}</span>
                      )}

                      {/* 이름 수정 버튼 */}
                      {editingId !== item.calendarId && (
                        <button
                          onClick={() =>
                            startEditing(item.calendarId, item.name)
                          }
                          className="ml-2 text-blue-500"
                        >
                          수정
                        </button>
                      )}

                      {/* 캘린더 삭제 버튼 */}
                      {editingId !== item.calendarId && (
                        <button
                          onClick={() => deleteCal(item.calendarId)}
                          className="ml-2 text-red-500"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </li>
                ))}

                {/* 새 캘린더 추가 버튼 */}
                <li>
                  <button onClick={addCalendar} className="text-blue-500">
                    + 캘린더 추가
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li className="">
            <div>
              <button
                type="button"
                className="w-[195px] h-[40px] flex items-center border-b border-[#d9d9d9] mb-[15px]"
                onClick={() => setIsShareOpen(!isShareOpen)}
              >
                <span className="m-[3px] cursor-pointer">
                  <img
                    src={
                      isShareOpen
                        ? "/images/Antwork/main/drive/위화살표.png"
                        : "/images/Antwork/main/drive/아래화살표.png"
                    }
                    alt="화살표 아이콘"
                    className="w-4 h-4"
                  />
                </span>

                <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                  <img
                    src="/images/Antwork/calendar/스케쥴.svg"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="main-cate">내 일정</span>
              </button>
            </div>
            <div
              className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                isShareOpen ? "max-h-screen" : "max-h-0"
              } pl-8`}
            >
              <ul>
                {schedule.map((item, index) => (
                  <li key={index}>
                    <a href="#">
                      <div className="flex items-start items-center mb-2 space-x-4 text-center">
                        <img
                          src="/images/Antwork/calendar/일정 아이콘.svg"
                          alt="#"
                          className="w-7 h-7"
                        />
                        <span>{item.title}</span>
                      </div>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4">
                      <button onClick={handleButtonClick2}>- 월간보기</button>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4">
                      <button onClick={handleButtonClick}>- 주간보기</button>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
