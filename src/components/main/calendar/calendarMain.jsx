import MyCalendar from "../../../MyCalendar";

export default function CalendarMain({ currentView }) {
  return (
    <>
      <section className="cal">
        <MyCalendar currentView={currentView} />
      </section>
    </>
  );
}
