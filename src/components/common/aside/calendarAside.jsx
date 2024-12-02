import { useState } from "react";

export default function CalendarAside({ asideVisible, setListMonth }) {
  const [isMyOpen, setIsMyOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const handleButtonClick = () => {
    console.log("버튼 클릭!");
    setListMonth("listWeek"); // listMonth 값 업데이트
  };

  const [calendars, setCalendars] = useState([
    { id: 1, name: "팀 캘린더" }, // 기본 항목
  ]);
  const [editingId, setEditingId] = useState(null); // 수정 중인 캘린더 ID
  const [newName, setNewName] = useState(""); // 수정 중인 이름
  // 새 캘린더 추가 함수
  const addCalendar = () => {
    const newCalendar = {
      id: calendars.length + 1, // 고유 ID
      name: `새 캘린더 ${calendars.length + 1}`, // 기본 이름
    };
    setCalendars([...calendars, newCalendar]); // 상태 업데이트
  };
  const startEditing = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName); // 기존 이름 설정
  };

  // 이름 저장
  const saveName = (id) => {
    setCalendars(
      calendars.map((calendar) =>
        calendar.id === id ? { ...calendar, name: newName } : calendar
      )
    );
    setEditingId(null); // 수정 모드 종료
    setNewName(""); // 입력 초기화
  };

  // 수정 취소
  const cancelEditing = () => {
    setEditingId(null);
    setNewName("");
  };
  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""}`}>
        <div className="logo !border-b-0">
          <span className="sub-title">My Schedule</span>

          <span className="title">Calendar</span>
          <button
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
          </button>
        </div>
        <ul className="a mt-20">
          <li className="">
            <div>
              <a
                href="#"
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
              </a>
            </div>
            <div
              className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                isMyOpen ? "max-h-screen" : "max-h-0"
              } pl-8`}
            >
              <ul>
                {calendars.map((calendar) => (
                  <li key={calendar.id}>
                    <div className="flex items-center mb-2 space-x-4">
                      <img
                        src="/images/Antwork/calendar/캘린더.svg"
                        alt="캘린더"
                        className="w-7 h-7"
                      />

                      {/* 이름 표시 또는 수정 필드 */}
                      {editingId === calendar.id ? (
                        <div>
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border rounded-md px-2 py-1"
                          />
                          <button
                            onClick={() => saveName(calendar.id)}
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
                        <span>{calendar.name}</span>
                      )}

                      {/* 이름 수정 버튼 */}
                      {editingId !== calendar.id && (
                        <button
                          onClick={() =>
                            startEditing(calendar.id, calendar.name)
                          }
                          className="ml-2 text-blue-500"
                        >
                          수정
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
              <a
                href="#"
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
              </a>
            </div>
            <div
              className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                isShareOpen ? "max-h-screen" : "max-h-0"
              } pl-8`}
            >
              <ul>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4 text-center">
                      <img
                        src="/images/Antwork/calendar/일정 아이콘.svg"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <span>나의 일정 1</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4">
                      <img
                        src="/images/Antwork/calendar/일정 아이콘.svg"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <span>나의 일정 2</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4">
                      <button onClick={handleButtonClick}>+ 전체보기</button>
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
