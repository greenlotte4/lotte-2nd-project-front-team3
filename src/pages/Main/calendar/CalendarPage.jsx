import AntWorkLayout from "../../../layouts/AntWorkLayout";
import MyCalendar from "../../../components/main/Calendar/MyCalendar";
// import ScheduleList from "../../../components/main/Calendar/ScheduleList";

export default function CalendarPage() {
  return (
    <>
      <AntWorkLayout>
        {/* <ScheduleList /> */}
        <section className="cal">
          <MyCalendar />
        </section>
      </AntWorkLayout>
    </>
  );
}
