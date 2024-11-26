import { useState } from "react";
import CalendarAside from "../../../components/common/calendarAside";
import CalendarMain from "../../../components/main/calendar/calendarMain";
import AntWorkLayout from "../../../layouts/AntWorkLayout";

export default function CalendarPage() {
  // listMonth 뷰를 표시할지 여부를 관리하는 상태
  const [view, setView] = useState("dayGridMonth");

  // CalendarAside에서 호출되는 함수
  const handleViewChange = (newView) => {
    setView(newView);
  };
  return (
    <>
      <AntWorkLayout>
        <CalendarAside onViewChange={handleViewChange} />
        <CalendarMain currentView={view} />
      </AntWorkLayout>
    </>
  );
}
