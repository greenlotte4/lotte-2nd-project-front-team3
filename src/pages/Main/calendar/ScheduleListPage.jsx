import CalendarAside from "../../../components/common/calendarAside";
import AntWorkLayout from "../../../layouts/AntWorkLayout";
import MyCalendar from "../../../components/main/Calendar/MyCalendar";
import ScheduleList from "../../../components/main/Calendar/ScheduleList";

export default function ScheduleListPage() {
  return (
    <>
      <AntWorkLayout>
        <CalendarAside />
        <ScheduleList />
      </AntWorkLayout>
    </>
  );
}
