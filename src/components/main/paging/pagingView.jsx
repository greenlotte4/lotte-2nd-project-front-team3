import { Link } from "react-router-dom";

export default function PagingView() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>My Page</h1>
          <p> Page View </p>
        </div>
        <article className="page-list !mt-5">
          <div className="content-header">
            <h1 className="!text-[19px] !ml">📘 업무일지</h1>{" "}
          </div>
          <section className="sharedDB content !h-[800px]">
            <p className="text-[15px]">
              페이지 기술요약 : mongoDB , editor.js , WebSocket, Operational
              Transformation 또는 Conflict-Free Replicated Data Types
            </p>
            <span className="text-[14px]">
              editor.js 를 이용하여 작성하면 자동으로 태그화 됩니다. 이걸 JSON
              으로 mongoDB에 넣어두고 웹소켓을 이용하여 실시간으로 조회하고
              수정할 수 있도록 해야합니다. 그에 필요한 기술 요약이 상위에
              기재되어 있습니다.
              <br />
              <br />
            </span>
            <img src="/images/Antwork/Page/movieExample.png"></img>
            <span className="text-[14px]">
              표도 들어가야할 거 같구요 뭐 등등 다양하게 들어가야될 거 같아요
              editor.js에서 제공하는 기능을 이용할 겁니다 근데 하위의 하위
              페이지가 될까요 ? 그걸 고민해봐야겠다 . <br></br>참고 사이트 :
              https://github.com/Jaeppetto/FEDC5-5_Project_Notion_VanillaJS
              https://jaewoong.dev/entry/JS-%EB%82%98%EB%A7%8C%EC%9D%98-Notion-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9B%85%EC%8B%9C%EB%94%94%EC%96%B8-1-%EA%B5%AC%ED%98%84-%ED%8E%B8#1.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A4%80%EB%B9%84-1
              <br />
              <br />
            </span>
          </section>
        </article>
      </article>
    </>
  );
}
