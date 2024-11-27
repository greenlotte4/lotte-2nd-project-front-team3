import { Link } from "react-router-dom";

export default function AdminMain() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>관리자 메인</h1>
          <p className="!mb-5">관리자 메인 페이지 입니다.</p>
        </div>
        <section className="mb-4 mx-4 h-[800px]">
          <p className="!mb-5">현재 작업완료한 페이지 : 멤버 관리</p>
        </section>
      </article>
    </>
  );
}
