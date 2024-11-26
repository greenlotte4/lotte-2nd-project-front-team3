import { useState } from "react";
import { Link } from "react-router-dom";

export default function CalendarAside({ asideVisible }) {
  const [isMyOpen, setIsMyOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
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
            <span className="text-xl">New Calendar</span>
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
                        ? "../../../public/images/Antwork/main/drive/위화살표.png"
                        : "../../../public/images/Antwork/main/drive/아래화살표.png"
                    }
                    alt="화살표 아이콘"
                    className="w-4 h-4"
                  />
                </span>

                <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                  <img
                    src="../../../public/images/ico/event_available_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
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
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4 text-center">
                      <img
                        src="../../../public/images/Antwork/calendar/캘린더.svg"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <Link to="/antwork/calendar">내 캘린더</Link>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4 text-center">
                      <img
                        src="../../../public/images/Antwork/calendar/캘린더.svg"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <span>팀 캘린더</span>
                    </div>
                  </a>
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
                        ? "../../../public/images/Antwork/main/drive/위화살표.png"
                        : "../../../public/images/Antwork/main/drive/아래화살표.png"
                    }
                    alt="화살표 아이콘"
                    className="w-4 h-4"
                  />
                </span>

                <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                  <img
                    src="../../../public/images/Antwork/calendar/스케쥴.svg"
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
                        src="../../../public/images/Antwork/calendar/일정 아이콘.svg"
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
                        src="../../../public/images/Antwork/calendar/일정 아이콘.svg"
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
                      <Link to="/antwork/scheduleList">+ 전체보기</Link>
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
