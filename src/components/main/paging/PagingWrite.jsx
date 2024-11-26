import { Link } from "react-router-dom";

export default function PagingWrite() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>New Page</h1>
        </div>
        <article className="page-list !mt-5 !border-none">
          <div className="content-header ">
            <input
              className="text-[30px] text-gray-500 !border-none"
              placeholder="새 페이지"
            ></input>
          </div>
          <section className="sharedDB content !h-[800px] !mt-14">
            <input
              className="text-[20px] text-gray-500 !ml-3"
              placeholder="내용을 입력해주세요"
            ></input>
          </section>
        </article>
      </article>
    </>
  );
}
