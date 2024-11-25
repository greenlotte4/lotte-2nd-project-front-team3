export default function CalendarAside({ asideVisible }) {
  return (
    <>
      <aside className={`sidebar`}>
        <div className="logo">
          <span className="sub-title">My Schedule</span>
          <img
            className="w-[24px] h-[24px] float-right mt-[10px] mr-[10px]"
            src="../../../public/images/ico/event_available_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
          />
          <span className="title">Calendar</span>
        </div>
        <div className="w-[195px] h-[25px] mb-[15px]">
          <span className="main-cate">+ 새 캘린더 만들기</span>
        </div>
        <ul className="a">
          <li className="">
            <div className="w-[195px] h-[25px] mb-[15px]">
              <span className="main-cate">캘린더 1</span>
            </div>
          </li>
          <li className="">
            <div className="w-[195px] h-[40px] border-b border-#d9d9d9 mb-[15px]">
              <span className="main-cate">캘린더 2</span>
            </div>
          </li>
          <li className="lnb-item">
            <div className="lnb-header">
              <img
                src="../../../public/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                className="cate-icon"
              />
              <span className="main-cate">나의 일정</span>
            </div>
            <a href="#" className="flex ml-[10px] mb-[5px]">
              <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
              일정 1
            </a>
            <a href="#" className="flex ml-[10px] mb-[5px]">
              <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
              일정 2
            </a>
            <a href="#" className="flex ml-[10px] mb-[5px]">
              + 전체 보기
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
