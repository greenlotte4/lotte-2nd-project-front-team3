import AntWorkLayout from "../../../layouts/AntWorkLayout";
import MyCalendar from "../../../components/main/Calendar/MyCalendar";
import { useState } from "react";
// import ScheduleList from "../../../components/main/Calendar/ScheduleList";

export default function CalendarPage() {
  const [listMonth, setListMonth] = useState(null); // 상태 관리
  if (listMonth == null) {
    setListMonth("dayGridMonth");
  }
  return (
    <>
      <AntWorkLayout setListMonth={setListMonth}>
        <MyCalendar listMonth={listMonth} setListMonth={setListMonth} />
      </AntWorkLayout>
    </>
  );
}
