import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 상호작용을 위한 플러그인
import listPlugin from "@fullcalendar/list";
import "../../../styles/calendar.scss";
import axios from "axios";

function MyCalendar() {
  const calendarRef = useRef(null);
  useEffect(() => {
    if (calendarRef.current) {
      console.log("calendarRef.current: ", calendarRef.current);
      const calendarApi = calendarRef.current.getApi(); // getApi()로 FullCalendar API에 접근
      console.log("FullCalendar API:", calendarApi);
    } else {
      console.log("calendarRef.current가 null입니다.");
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번 실행됨

  const customPrevYear = () => {
    console.log("이전 1년 버튼 클릭됨");
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const currentDate = calendarApi.getDate();
      console.log("현재 날짜 (1년 전):", currentDate); // 현재 날짜 확인
      // 현재 날짜를 기준으로 1년을 빼고 새로운 Date 객체를 생성
      const prevYearDate = new Date(
        currentDate.setFullYear(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        )
      );
      console.log("이전 1년 날짜:", prevYearDate);
      calendarApi.gotoDate(prevYearDate); // 새로 생성한 날짜로 이동
    }
  };

  const customNextYear = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const currentDate = calendarApi.getDate();
      // 현재 날짜를 기준으로 1년을 더하고 새로운 Date 객체를 생성
      const nextYearDate = new Date(
        currentDate.setFullYear(currentDate.getFullYear() + 1)
      );
      calendarApi.gotoDate(nextYearDate); // 새로 생성한 날짜로 이동
    }
  };
  const [holidays, setHolidays] = useState([]); // 공휴일 데이터를 저장할 상태

  useEffect(() => {
    const fetchHolidays = async () => {
      const url =
        "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
      const queryParams = `?serviceKey=Ga4qgNx2BToVICIp2Vnj8MeBJELIN1prWSVxT8pKAVTGMdtksMcuNH0avVG4rMFeAwPRp1pmUD58vhdtXIT8oA==&solYear=2024`; // 예시로 2024년 1월의 공휴일을 요청
      const numOfRows = 30;
      try {
        const response = await axios.get(url + queryParams, {
          params: { numOfRows: numOfRows },
        });
        const holidayData = response.data.response.body.items.item;

        // 공휴일 데이터를 FullCalendar에 맞게 변환
        const formattedHolidays = holidayData.map((holiday) => {
          const locdateStr = String(holiday.locdate); // 숫자일 경우 문자열로 변환
          const year = locdateStr.substring(0, 4);
          const month = locdateStr.substring(4, 6);
          const day = locdateStr.substring(6, 8);
          const formattedDate = `${year}-${month}-${day}`;

          return {
            title: holiday.dateName, // 공휴일 이름
            date: formattedDate, // 공휴일 날짜 (YYYYMMDD 형식)
            color: "red", // 공휴일 표시 색상
            textColor: "white", // 공휴일 텍스트 색상
          };
        });

        setHolidays(formattedHolidays); // 상태에 공휴일 데이터 저장
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchHolidays();
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    content_title: "",
    description: "",
    location: "",
    start: "",
    end: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // 수정 모드
  const [currentEventId, setCurrentEventId] = useState(null); // 수정 중인 이벤트의 ID 저장

  // 날짜 클릭 시 모달 띄우기
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr; // 클릭한 날짜
    const formattedDate = clickedDate + "T00:00"; // `datetime-local` 형식에 맞게 변환

    setNewEvent((prevState) => ({
      ...prevState,
      start: formattedDate, // 시작일에 클릭한 날짜 설정
      end: formattedDate, // 종료일에도 클릭한 날짜 설정 (같은 날짜로 초기화)
    }));
    setEditMode(false); // 새 일정 추가이므로 수정 모드 아님
    setShowModal(true); // 모달 띄우기
    setCurrentEventId(null); // 수정 중인 이벤트 없음
  };

  // 일정 클릭 시 수정 모드로 진입
  const handleEventClick = (info) => {
    const event = info.event;
    const startDate = new Date(event.start).toLocaleString("sv-SE"); // 'yyyy-MM-ddTHH:mm' 형식으로 변환
    const endDate = event.end
      ? new Date(event.end).toLocaleString("sv-SE")
      : startDate; // 종료일도 처리
    setNewEvent({
      content_title: event.title.split(" - ")[0], // 제목 분리 (예: "회의 - 설명")
      description: event.title.split(" - ")[1] || "", // 설명 분리
      location: event.extendedProps.location || "",
      start: startDate,
      end: endDate,
    });

    setEditMode(true); // 수정 모드로 설정
    setShowModal(true); // 모달 띄우기
    setCurrentEventId(event.id); // 수정하려는 이벤트의 ID 저장
  };

  const handleSave = () => {
    const event = {
      id: currentEventId || new Date().getTime(), // 고유 ID 설정
      title: `${newEvent.content_title} - ${newEvent.description}`,
      start: newEvent.start,
      end: newEvent.end,
      location: newEvent.location,
    };

    setEvents((prevEvents) => [...prevEvents, event]);

    setNewEvent({
      content_title: "",
      description: "",
      location: "",
      start: "",
      end: "",
    });
    setShowModal(false);
  };

  const allEvents = [...events, ...holidays];

  return (
    <div className="w-full max-h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden border">
      {/* FullCalendar */}
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        events={allEvents}
        locale="ko"
        dateClick={handleDateClick} // 날짜 클릭 시 새 일정 추가
        eventClick={handleEventClick} // 일정 클릭 시 수정
        headerToolbar={{
          start: "prev,next,today", // 이전/다음 버튼
          center: "customPrevYear,title,customNextYear", // 현재 날짜 제목
          end: "dayGridMonth,dayGridWeek,dayGridDay,listMonth", // 뷰 전환 버튼
        }}
        customButtons={{
          customPrevYear: {
            text: "<",
            click: customPrevYear, // 이전 1년 버튼 클릭 시
          },
          customNextYear: {
            text: ">",
            click: customNextYear, // 다음 1년 버튼 클릭 시
          },
        }}
        buttonText={{
          dayGridMonth: "월",
          dayGridWeek: "주",
          dayGridDay: "일",
        }}
      />

      {/* 모달 및 오버레이 */}
      {showModal && (
        <>
          {/* 어두운 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] "
            onClick={() => setShowModal(false)} // 배경 클릭 시 모달 닫기
          ></div>

          {/* 모달 창 */}
          <div className="fixed inset-0 flex items-center justify-center z-[101]">
            <div className="w-[700px] h-[700px] bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">
                {editMode ? "일정 수정" : "일정 추가"}
              </h3>

              {/* 제목 입력 */}
              <input
                type="text"
                className="w-full p-2 mb-4 border rounded outline-none"
                placeholder="제목"
                value={newEvent.content_title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, content_title: e.target.value })
                }
              />

              {/* 설명 입력 */}
              <textarea
                className="w-full p-2 mb-4 border rounded outline-none"
                placeholder="설명"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              ></textarea>

              {/* 시작일 입력 */}
              <input
                type="datetime-local"
                className="w-full p-2 mb-4 border rounded outline-none"
                value={newEvent.start}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: e.target.value })
                }
              />

              {/* 종료일 입력 */}
              <input
                type="datetime-local"
                className="w-full p-2 mb-4 border rounded outline-none"
                value={newEvent.end}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: e.target.value })
                }
              />

              {/* 버튼들 */}
              <div className="flex justify-end space-x-2 outline-none">
                <button
                  className="bg-[#A0C3F7] text-white px-4 py-2 rounded hover:bg-blue-400 outline-none"
                  onClick={handleSave}
                >
                  {editMode ? "수정" : "저장"}
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 outline-none"
                  onClick={() => setShowModal(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyCalendar;
