/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import useModalStore from "../../../store/modalStore";

{
  /*
    날짜 : 2024/11/25(월)
    생성자 : 김민희
    내용 : BoardMain.jsx - 게시판 메인 홈 페이지 화면구현 (인기급상승 게시물, 자료실 레이아웃)

    수정 내역 : 
    2024/12/13(금) - 김민희 : 게시판 화면 간격 안 맞는 거 수정

  */
}

export default function BoardMain() {
  const openModal = useModalStore((state) => state.openModal);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title:
        "안녕하세요. 퇴사하겠습니다. 그럼 이만 총총총 헤헤헤 ^^ 글 잘리나 대표님 저 잘라주세요 글자도 잘라주세여",
      author: "김사원 ",
      date: "2024-11-27",
      views: 9697,
      likes: 1016,
      commentCount: 3,
    },
    {
      id: 2,
      title: "오늘 점심 메뉴 추천 해주세여 - 엽떡이었으면 좋겠다 크크크크크크",
      author: "황사원 ",
      date: "2024-11-27",
      views: 9697,
      likes: 1016,
      commentCount: 3,
    },
    {
      id: 3,
      title: "경고 메시지입니다 자유게시판이지만 너무 자유롭지 마십시오.",
      author: "최사원ᖳ ",
      date: "2024-11-27",
      views: 9697,
      likes: 1016,
      commentCount: 3,
    },
    {
      id: 4,
      title: "안녕하세요. 앤드워크에 관한 모든 비밀을 담은 자료입니다!",
      author: "정사원ᖳ ",
      date: "2024-11-27",
      views: 9697,
      likes: 1016,
      commentCount: 3,
    },
    {
      id: 5,
      title: "안녕하세요. 열람권한이 없는 게시물입니다.",
      author: "강사원ᖳ ",
      date: "2024-11-27",
      views: 9697,
      likes: 1016,
      commentCount: 3,
    },
    {
      id: 6,
      title: "성과면담 및 이의제기 안내",
      author: "하사원ᖳ ",
      date: "2024-11-27",
      views: 9697,
      likes: 1016,
      commentCount: 1000,
    },
  ]);
  // 파일 목록
  const [files, setFiles] = useState([
    { id: 1, name: "지출결의서(경조금지원).pdf", size: "12MB", type: "pdf" },
    { id: 2, name: "연차신청서.hwp", size: "10MB", type: "hwp" },
    { id: 3, name: "게시판 프로젝트 보고서.ppt", size: "1GB", type: "ppt" },
  ]);

  // 파일 삭제 함수
  const handleDelete = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>게시판 홈</h1>
          <p className="!mb-5">게시판 메인 페이지 입니다.</p>

          {/* 게시판 홈(메인) 검색 */}

          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <select className="border border-gray-300 rounded py-2 px-2 mr-2 w-20 cursor-pointer">
                <option>제목</option>
                <option>작성자</option>
                <option>제목 + 작성자</option>
              </select>
              <input
                type="text"
                placeholder="이름 + 이메일 검색"
                className="border border-gray-300 rounded py-2 px-4 mr-2"
              />
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                검색
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">페이지당</span>
              <select className="border border-gray-300 rounded mx-2">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-gray-600">개</span>
            </div>
          </div>

          <section className="main_article flex ">
            <article className="page-list mr-7">
              <div className="content-header">
                <h2 className="!mb-3">🔥 인기급상승 게시물</h2>
                {/* <p className="display !text-[14px]" >인기급상승 게시물입니당</p> */}
              </div>

              <div className="page-grid cursor-pointer">
                {/* 인기급상승 게시물  */}
                <div className="page-card !bg-slate-50">
                  <div className="card-content">
                    <div className="user-info">
                      {/* <img src="/api/placeholder/32/32" alt="profile" className="avatar bg-slate-500"/> */}
                      <div className="user-details w-80">
                        <Link to="/antwork/board/view">
                          <h3 className="!text-[15px] mb-2 truncate text-ellipsis whitespace-nowrap">
                            어제 GPT 서비스 중단 이슈 &#40; 서버 부하 &#41
                          </h3>
                        </Link>
                        <p className="!mt-3 !text-[12px] line-clamp-2">
                        어제와 같은 GPT 서비스 중단 이슈는 중요한 문제입니다. 
                        이를 해결하고 예방하기 위해 서버 부하 관리, 
                        장애 복구 계획 Disaster Recovery Plan, 
                        사용자 커뮤니케이션 방안을 체계적으로 마련해야 합니다.
                        </p>
                        <ul className="mt-4 flex gap-2">
                          <li className="article_create_date w-13 h-7 flex items-center gap-1.5 ">
                            <img
                              className="w-6 h-6"
                              src="../../../public/images/ico/create_date.svg"
                              alt="create_at 작성일"
                            />
                            <span className="article_create_at w-13]">
                              {" "}
                              2024-11-25{" "}
                            </span>
                          </li>

                          <li className="article_view w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="../../../public/images/ico/eye.svg"
                              alt="eye views 조회수"
                            />
                            <span className="view_count"> 1,016 </span>
                          </li>

                          <li className="article_comment w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="../../../public/images/ico/comment.svg"
                              alt="comment 댓글수"
                            />
                            <span className="article_comment_count"> 629 </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <button className="options-btn">⋮</button> */}
                  </div>
                </div>
              </div>

              <div className="page-grid cursor-pointer">
                {/* 인기급상승 게시물  */}
                <div className="page-card !bg-slate-50">
                  <div className="card-content">
                    <div className="user-info">
                      {/* <img src="/api/placeholder/32/32" alt="profile" className="avatar bg-slate-500"/> */}
                      <div className="user-details w-80">
                        <Link to="/antwork/board/view">
                          <h3 className="!text-[15px] mb-2 truncate text-ellipsis whitespace-nowrap">
                            인기급상승 게시물 제목입니다. 회사 신입사원 식탐
                            문제 지적해야할까요?
                          </h3>
                        </Link>
                        <p className="!mt-3 !text-[12px] line-clamp-2">
                          인기급상승 게시물 내용입니다. 팀에 신입이 들어왔는데
                          탕비실에 있는 콘프라이크를 한 봉지 그냥 본인 자리에
                          가져와서 먹습니다 과자면 이해하는데 진짜 그거는 아닌
                          것 같아서 작은거 아니고 큰 거입니다 근데 지적하면
                          사람이 너무 치사해보일것같아서 고민하고 있었습니다
                          어제 옆팀 사람이 조심스럽게 팀원이 그렇게 먹는거
                          아냐고 물어보는데 할 말이 없었습니다 이거 제가
                          말해야하는게 맞을까요? 물론 이거 하나가지고 식탐이라고
                          할 수 없다면 할 말 없지만 단체 생활의 예의아닐까요?
                        </p>
                        <ul className="mt-4 flex gap-2">
                          <li className="article_create_date w-13 h-7 flex items-center gap-1.5 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/create_date.svg"
                              alt="create_at 작성일"
                            />
                            <span className="article_create_at w-13]">
                              {" "}
                              2024-11-25{" "}
                            </span>
                          </li>

                          <li className="article_view w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/eye.svg"
                              alt="eye views 조회수"
                            />
                            <span className="view_count"> 1,016 </span>
                          </li>

                          <li className="article_comment w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/comment.svg"
                              alt="comment 댓글수"
                            />
                            <span className="article_comment_count"> 629 </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <button className="options-btn">⋮</button> */}
                  </div>
                </div>
                {/* 인기게시물 끝 2*/}
              </div>
            </article>

            {/* 2. 자료실  */}
            <article className="page-list">
              <div className="content-header grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                <Link to="/antwork/board/dataRoom">
                  {" "}
                  <h1 className="!mb-3 ">📑 자료실</h1>
                </Link>

                {/* <p> 자료실 설명글입니다. </p> */}
              </div>

              <div className="p-6 bg-gray-100 rounded-lg w-full max-w-lg mx-auto">
                <div>
                  <div className="flex justify-between items-center mb-2 cursor-pointer">
                    <span className="text-sm font-medium">첨부</span>
                    <span className="text-sm text-gray-500">{`${
                      files.length
                    }개 (${files.reduce(
                      (acc, file) => acc + parseInt(file.size),
                      0
                    )}MB)`}</span>
                  </div>

                  <Link to="/antwork/board/boardDataRoom">
                    <div>
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between bg-white p-3 mb-2 rounded-lg shadow cursor-pointer"
                        >
                          <div className="flex items-center cursor-pointer">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-3 cursor-pointer">
                              {file.type === "video" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  className="w-5 h-5 text-blue-500 cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6.75L19.5 12l-3.75 5.25M4.5 12h15"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  className="w-5 h-5 text-slate-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 19V5l12-1.5v14.25"
                                  />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="!text-[14px] font-medium">
                                {file.name}
                              </p>
                              <p className="!text-[12px] text-gray-500">
                                {file.size}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </Link>
                </div>
              </div>
            </article>
            {/* 자료실 끝 */}

            <article className="page-list ml-7">
              <div className="content-header">
                <h2 className="!mb-3"># 억울한 일 🥹</h2>
                {/* <p className="display !text-[14px]" >인기급상승 게시물입니당</p> */}
              </div>

              <div className="page-grid cursor-pointer">
                {/* 인기급상승 게시물  */}
                <div className="page-card !bg-slate-50">
                  <div className="card-content">
                    <div className="user-info">
                      {/* <img src="/api/placeholder/32/32" alt="profile" className="avatar bg-slate-500"/> */}
                      <div className="user-details w-80">
                        <h3 className="!text-[15px] mb-2 truncate text-ellipsis whitespace-nowrap">
                          👔 억울합니다..
                        </h3>
                        <p className="!mt-3 !text-[12px] line-clamp-2">
                          입사 1시간만에 짤린 썰,,, 대기업이라고 다 대기업
                          아니더만요 ㅋㅋㅋㅋㅋㅋㅋ 나 참 오자마자 청소를 시키질
                          않나
                        </p>
                        <ul className="mt-4 flex gap-2">
                          <li className="article_create_date w-13 h-7 flex items-center gap-1.5 ">
                            <img
                              className="w-6 h-6"
                              src="../../../public/images/ico/create_date.svg"
                              alt="create_at 작성일"
                            />
                            <span className="article_create_at w-13]">
                              {" "}
                              2024-11-25{" "}
                            </span>
                          </li>

                          <li className="article_view w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="../../../public/images/ico/eye.svg"
                              alt="eye views 조회수"
                            />
                            <span className="view_count"> 1,016 </span>
                          </li>

                          <li className="article_comment w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="../../../public/images/ico/comment.svg"
                              alt="comment 댓글수"
                            />
                            <span className="article_comment_count"> 629 </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            {/* 자료실 끝 */}

            <article className="page-list ml-7">
              <div className="content-header">
                <h2 className="!mb-3"># 억울한 일 🥹</h2>
                {/* <p className="display !text-[14px]" >인기급상승 게시물입니당</p> */}
              </div>

              <div className="page-grid cursor-pointer">
                {/* 인기급상승 게시물  */}
                <div className="page-card !bg-slate-50">
                  <div className="card-content">
                    <div className="user-info">
                      {/* <img src="/api/placeholder/32/32" alt="profile" className="avatar bg-slate-500"/> */}
                      <div className="user-details w-80">
                        <h3 className="!text-[15px] mb-2 truncate text-ellipsis whitespace-nowrap">
                          👔 억울합니다..
                        </h3>
                        <p className="!mt-3 !text-[12px] line-clamp-2">
                          입사 1시간만에 짤린 썰,,, 대기업이라고 다 대기업
                          아니더만요 ㅋㅋㅋㅋㅋㅋㅋ 나 참 오자마자 청소를 시키질
                          않나
                        </p>
                        <ul className="mt-4 flex gap-2">
                          <li className="article_create_date w-13 h-7 flex items-center gap-1.5 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/create_date.svg"
                              alt="create_at 작성일"
                            />
                            <span className="article_create_at w-13]">
                              {" "}
                              2024-11-25{" "}
                            </span>
                          </li>

                          <li className="article_view w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/eye.svg"
                              alt="eye views 조회수"
                            />
                            <span className="view_count"> 1,016 </span>
                          </li>

                          <li className="article_comment w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/comment.svg"
                              alt="comment 댓글수"
                            />
                            <span className="article_comment_count"> 629 </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <button className="options-btn">⋮</button> */}
                  </div>
                </div>
                {/* 인기게시물 끝 */}

                {/* 인기급상승 게시물  2*/}
                <div className="page-card !bg-slate-200">
                  <div className="card-content">
                    <div className="user-info">
                      {/* <img src="/api/placeholder/32/32" alt="profile" className="avatar bg-slate-500"/> */}
                      <div className="user-details w-80">
                        <h3 className="!text-[15px] mb-2 truncate text-ellipsis whitespace-nowrap">
                          위에 글 상사입니다. 제가 더 억울합니다. 제 이야기를
                          먼저 들어보셔야 할 듯
                        </h3>
                        <p className="!mt-3 !text-[12px] line-clamp-2">
                          저 사람은 인간도 아닙니다. 인간이라는 수식어가 붙을
                          수가 없는 어떠한 무언가 입니다. 제가 오죽하면
                          이러겠습니까?
                        </p>
                        <ul className="mt-4 flex gap-2">
                          <li className="article_create_date w-13 h-7 flex items-center gap-1.5 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/create_date.svg"
                              alt="create_at 작성일"
                            />
                            <span className="article_create_at w-13]">
                              {" "}
                              2024-11-25{" "}
                            </span>
                          </li>

                          <li className="article_view w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/eye.svg"
                              alt="eye views 조회수"
                            />
                            <span className="view_count"> 1,016 </span>
                          </li>

                          <li className="article_comment w-13 h-7 flex items-center gap-2 ">
                            <img
                              className="w-6 h-6"
                              src="/images/ico/comment.svg"
                              alt="comment 댓글수"
                            />
                            <span className="article_comment_count"> 629 </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <button className="options-btn">⋮</button> */}
                  </div>
                </div>
                {/* 인기게시물 끝 2*/}
              </div>
            </article>
          </section>

          {/* 게시판 start */}
          <article className="page-list">
            <div className="content-header mx-auto">
              <h1>자유게시판</h1>
              <p className="!mb-5">
                친애하는 Antwork 여러분 마음속 깊은 이야기를 자유롭게 공유해
                주십시오 ^^ !
              </p>
            </div>
            <section className="">
              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  <span>전체 게시 글: </span>
                  <strong>961,011 개</strong>
                </div>
                <div className="">
                  <button className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600">
                    글쓰기
                  </button>
                  <button className="cursor-pointer bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-600">
                    내 글만 보기
                  </button>
                  <button className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600">
                    글 삭제
                  </button>
                  <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                    휴지통
                  </button>
                </div>
              </div>
            </section>
            <section className="h-[800px] overflow-auto">
              <div className="flex justify-between mb-4">
                <div className="flex items-center ">
                  <select className="border border-gray-300 rounded py-2 px-2 mr-2 w-20">
                    <option>제목</option>
                    <option>작성자</option>
                    <option>제목 + 작성자</option>
                  </select>
                  <input
                    type="text"
                    placeholder="검색어를 입력해 주세요."
                    className="border border-gray-300 rounded py-2 px-4 mr-2"
                  />
                  <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                    검색
                  </button>
                </div>

                {/* 페이지 당 */}
                <div className="flex items-center">
                  <span className="text-gray-600">페이지당</span>
                  <select className="border border-gray-300 rounded mx-2">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <span className="text-gray-600">개</span>
                </div>
              </div>
              <table className="w-full bg-white !border border-gray-200 rounded-lg overflow-hidden ml-4 mr-4 ">
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-[10px] text-center">
                  <tr>
                    <th className="py-3 px-6 text-center whitespace-nowrap w-11">
                      번호
                    </th>
                    <th className="py-3 px-6 text-center whitespace-nowrap w-1/2">
                      제목
                    </th>

                    <th className="py-3 px-6 text-center whitespace-nowrap w-1/11">
                      작성자
                    </th>
                    <th className="py-3 px-6 text-center whitespace-nowrap w-1/6">
                      날짜
                    </th>
                    <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">
                      조회
                    </th>
                    <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">
                      좋아요
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light cursor-pointer">
                  {posts.map((post, index) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 w-10 text-center">
                        {index + 1}
                      </td>{" "}
                      {/* 번호 */}
                      <Link
                        to="/antwork/board/view"
                        onClick={(e) => {
                          e.stopPropagation;
                          openModal("boardModal");
                        }}
                      >
                        {" "}
                        {/* 제목 + 작성자 -> 링크 */}
                        <td
                          className="py-3 px-6 w-1/2 text-left text-ellipsis truncate"
                          title={post.title}
                        >
                          {" "}
                          {/* 제목 */}
                          {post.title.length > 30
                            ? `${post.title.slice(0, 30)}...`
                            : post.title}
                          <span className="text-blue-500">
                            {" "}
                            {/* 공백, 댓글수 */}
                            {/* 댓글 아이콘 💬  */}({post.commentCount})
                          </span>
                        </td>
                      </Link>
                      <td className="py-3 px-6 w-1/6 text-center">
                        {" "}
                        {/* 작성자 */}
                        {post.author.charAt(0)}**{post.author.slice(-1)}
                      </td>
                      <td className="py-3 px-6 w-1/10 text-center">
                        {post.date}
                      </td>{" "}
                      {/* 날짜 */}
                      <td className="py-3 px-6 w-1/10 text-center">
                        {post.views.toLocaleString()}
                      </td>{" "}
                      {/* 조회수 */}
                      <td className="py-3 px-6 w-1/10 text-center flex">
                        {" "}
                        {/* 좋아요 */}
                        ❤️ ({post.likes})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center mt-4">
                <button className=" text-gray-700 py-2 px-4 rounded-l hover:bg-gray-100">
                  이전
                </button>
                <Link to="" className="mx-4 text-black-600">
                  1
                </Link>
                <Link to="" className="mx-4 text-gray-600">
                  2
                </Link>
                <Link to="" className="mx-4 text-gray-600">
                  3
                </Link>

                <button className="text-gray-700 py-2 px-4 rounded-r hover:bg-gray-100">
                  다음
                </button>
              </div>
            </section>
          </article>
        </div>
      </article>
    </>
  );
}
export { BoardMain };
