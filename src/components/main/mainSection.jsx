import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import MyCalendar from "../main/Calendar/MyCalendar";
import { Link } from "react-router-dom";

export default function MainSection() {
  const [toggles, toggleSection] = useToggle({});
  const [isMyOpen, setIsMyOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [buttonText, setButtonText] = useState("업무");
  const handleToggle = () => {
    toggleSection("showMenu");
  };
  const handleMenuClick = (text) => {
    setButtonText(text); // 버튼 텍스트를 클릭한 항목으로 변경
    toggleSection("showMenu"); // 메뉴를 닫음
  };
  return (
    <>
      <main className="gap-[20px] min-w-[1820px] max-w-[2150px] h-auto mb-5 p-[20px] rounded-lg bg-white flex mx-auto">
        <div className="w-[258px] min-h-[1150px] ">
          <article className="w-[258px] h-[300px] bg-[#eaf0f9] rounded-lg p-[20px]">
            <div className="relative">
              <img
                src="../images/pngegg.png"
                alt="프로필 사진"
                className="w-[82px] h-[82px] mx-auto bg-white rounded-full "
              />
              <span className="absolute bottom-0 right-[70px] w-3 h-3 bg-green-400 rounded-full"></span>
            </div>
            <div className="text-center mt-[20px]">
              <h1 className="text-3xl">OOO 님 환영합니다.</h1>
              <span className=" opacity-60">OO 그룹 대리</span>
            </div>
            <ul className="mt-[20px]">
              <li className="flex mt-[10px]">
                <a className="flex justify-between w-full">
                  <span className=" ">오늘의 일정</span>
                  <span className="opacity-60">0</span>
                </a>
              </li>
              <li className="flex mt-[10px]">
                <a className="flex justify-between w-full">
                  <span className="">오늘의 일정</span>
                  <span className="opacity-60 ">0</span>
                </a>
              </li>
              <li className="flex mt-[10px]">
                <a className="flex justify-between w-full">
                  <span className="">오늘의 일정</span>
                  <span className="opacity-60">0</span>
                </a>
              </li>
            </ul>
          </article>
          <article className="w-[258px] h-[500px] bg-[#eaf0f9] rounded-lg p-[20px] mt-[20px]">
            <span className=" text-2xl block">근태관리</span>
            <span className=" block mt-[10px]">
              2024년 11월 26일 (화) 17:37:18
            </span>
            <div className="flex justify-between items-end mt-[10px]">
              <span className="text-4xl"> 5H 21M</span>
              <span className="">최대 52시간</span>
            </div>
            <div className=" flex w-[220px] h-[50px] rounded-lg border border-white mt-[20px]">
              <div className="w-[100px] h-[50px] -mt-px -ml-px rounded-lg border border-whites bg-white"></div>
            </div>
            <div className="mt-[60px] flex justify-between">
              <span className="text-[15px]">출근시간</span>
              <span>11:11:11</span>
            </div>
            <div className="mt-[10px] flex justify-between">
              <span className="text-[15px]">퇴근시간</span>
              <span>22:22:22</span>
            </div>
            <div className="border-t border-dashed border-white w-[258px] -ml-[20px] mt-[20px]"></div>
            <div className="flex mt-[30px] justify-between">
              <button className="w-[100px] h-[50px] rounded-3xl   bg-white">
                출근하기
              </button>
              <button className="w-[100px] h-[50px] rounded-3xl   bg-white">
                퇴근하기
              </button>
            </div>
            <div className="w-[180px] flex mx-auto mt-[20px] text-[17px]">
              <button
                className="w-[170px] h-[50px] rounded-3xl  bg-white"
                onClick={handleToggle}
              >
                {buttonText}
              </button>
            </div>
            <div>
              {toggles.showMenu && (
                <div className="mt-2 w-[200px] h-[100px] bg-white text-black rounded-md shadow-md p-2 overflow-y-scroll absolute z-10">
                  <ul className="flex flex-col gap-2">
                    {[
                      "반차",
                      "휴가",
                      "출장",
                      "교육",
                      "회의",
                      "기타",
                      "업무",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="hover:bg-gray-200 px-2 py-1 cursor-pointer rounded"
                        onClick={() => handleMenuClick(item)} // 클릭 핸들러
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-[258px] h-[300px] bg-[#eaf0f9] rounded-lg p-[20px] mt-[70px] -ml-[20px]">
              <span>알림부분</span>
            </div>
          </article>
        </div>
        {/* main 게시판 시작 */}
        <article
          className="w-full max-w-[1450px] h-auto bg-[#eaf0f9] p-[30px] rounded-lg flex  "
          style={{ height: "fit-content" }}
        >
          <div className="flex mx-auto">
            <section className="w-[450px] mt-[15px] ">
              <article className="page-list mr-7">
                <div className="content-header">
                  <h1 className="!mb-3 ">🔥 인기급상승 게시물</h1>
                  <p className="">인기급상승 게시물입니당</p>
                </div>

                <div className="page-grid cursor-pointer h">
                  {/* 인기급상승 게시물  */}
                  <div className="page-card !bg-slate-50">
                    <div className="card-content">
                      <div className="user-info">
                        {/* <img src="/api/placeholder/32/32" alt="profile" className="avatar bg-slate-500"/> */}
                        <div className="user-details w-80">
                          <h3 className="!text-[15px] mb-2 truncate text-ellipsis whitespace-nowrap">
                            인기급상승 게시물 제목입니다. 회사 신입사원 식탐
                            문제 지적해야할까요?
                          </h3>
                          <p className="!mt-3 !text-[12px] line-clamp-2">
                            인기급상승 게시물 내용입니다. 팀에 신입이 들어왔는데
                            탕비실에 있는 콘프라이크를 한 봉지 그냥 본인 자리에
                            가져와서 먹습니다 과자면 이해하는데 진짜 그거는 아닌
                            것 같아서 작은거 아니고 큰 거입니다 근데 지적하면
                            사람이 너무 치사해보일것같아서 고민하고 있었습니다
                            어제 옆팀 사람이 조심스럽게 팀원이 그렇게 먹는거
                            아냐고 물어보는데 할 말이 없었습니다 이거 제가
                            말해야하는게 맞을까요? 물론 이거 하나가지고
                            식탐이라고 할 수 없다면 할 말 없지만 단체 생활의
                            예의아닐까요?
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
                              <span className="article_comment_count">
                                {" "}
                                629{" "}
                              </span>
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
                            인기급상승 게시물 제목입니다. 회사 신입사원 식탐
                            문제 지적해야할까요?
                          </h3>
                          <p className="!mt-3 !text-[12px] line-clamp-2">
                            인기급상승 게시물 내용입니다. 팀에 신입이 들어왔는데
                            탕비실에 있는 콘프라이크를 한 봉지 그냥 본인 자리에
                            가져와서 먹습니다 과자면 이해하는데 진짜 그거는 아닌
                            것 같아서 작은거 아니고 큰 거입니다 근데 지적하면
                            사람이 너무 치사해보일것같아서 고민하고 있었습니다
                            어제 옆팀 사람이 조심스럽게 팀원이 그렇게 먹는거
                            아냐고 물어보는데 할 말이 없었습니다 이거 제가
                            말해야하는게 맞을까요? 물론 이거 하나가지고
                            식탐이라고 할 수 없다면 할 말 없지만 단체 생활의
                            예의아닐까요?
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
                              <span className="article_comment_count">
                                {" "}
                                629{" "}
                              </span>
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
              <article className="page-list mr-7">
                <div className="content-header grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                  <h1 className="!mb-3 ">📑 자료실</h1>
                  <p> 자료실 설명글입니다. </p>
                  <div className="page-card !h-80">
                    <span>자료실 </span>
                  </div>
                </div>
              </article>

              {/* 자료실 끝 */}
            </section>
            <section className="">
              <div className="w-[700px] h-[800px] bg-white rounded-lg p-4 shadow-sm mx-auto overflow-y-auto">
                <MyCalendar />
              </div>
            </section>
          </div>
        </article>

        {/* 3번째 section */}
        <div
          className="w-[350px]  rounded-lg bg-[#eaf0f9] p-[10px] box-border"
          style={{ height: "fit-content" }}
        >
          {/* home 오른쪽 Page 부분 시작 */}
          <div className="bg-white rounded-lg p-[20px] shadow-sm mx-auto">
            <span className="text-[20px]">My Page</span>
            <li className="list-none mt-[20px]">
              {/* 개인 페이지 토글 */}
              <div
                className="cursor-pointer "
                onClick={() => toggleSection("personalPages")}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                  개인 페이지{" "}
                  <img
                    src={
                      toggles.personalPages
                        ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.personalPages && (
                <ol>
                  <li>
                    <Link to="/antwork/page/view">🌹&nbsp;&nbsp;업무일지</Link>
                  </li>
                  <li>
                    <a href="#">✔&nbsp;&nbsp;CheckList</a>
                  </li>
                  <li>
                    <a href="#">❓&nbsp;&nbsp;Question</a>
                  </li>
                  <li>
                    <a href="#">🎞 &nbsp;&nbsp;Movie review</a>
                  </li>
                  <li>
                    <a href="#">👗 &nbsp;&nbsp;Shopping List</a>
                  </li>
                </ol>
              )}

              {/* 개인 페이지 토글 */}
              <div
                className="cursor-pointer "
                onClick={() => toggleSection("sharedPages")}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex !mt-[12px] ">
                  공유중인 페이지{" "}
                  <img
                    src={
                      toggles.sharedPages
                        ? "/images/ico/page_dropup_20_999999.svg" // 열렸을 때 이미지
                        : "/images/ico/page_dropdown_20_999999.svg" // 닫혔을 때 이미지
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.sharedPages && (
                <ol>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;OO병원 사이트맵</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;OO학교 사이트맵</a>
                  </li>
                </ol>
              )}
            </li>
          </div>
          {/* home 오른쪽 Project 부분 시작 */}
          <div className="bg-white rounded-lg p-[20px] shadow-sm mx-auto mt-[20px]">
            <span className="text-[20px]">My Project</span>
            <li className="lnb-item !h-auto list-none mt-[15px]">
              <div
                className="lnb-header cursor-pointer"
                onClick={() => toggleSection("ongoingProjects")}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex ">
                  진행중인 프로젝트{" "}
                  <img
                    src={
                      toggles.ongoingProjects
                        ? "/images/ico/page_dropup_20_999999.svg"
                        : "/images/ico/page_dropdown_20_999999.svg"
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.ongoingProjects && (
                <ol>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;갓생살기 프로젝트</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;갓생살기 프로젝트</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;갓생살기 프로젝트</a>
                  </li>
                </ol>
              )}
            </li>
            <li className="lnb-item !mt-[15px]border-b border-[#ddd] list-none">
              <div
                className="lnb-header cursor-pointer"
                onClick={() => toggleSection("completedProjects")}
              >
                <span className="main-cate !text-[14px] text-[#757575] cursor-pointer !inline-flex !mt-[12px] ">
                  완료된 프로젝트{" "}
                  <img
                    src={
                      toggles.completedProjects
                        ? "/images/ico/page_dropup_20_999999.svg"
                        : "/images/ico/page_dropdown_20_999999.svg"
                    }
                    alt="toggle"
                  />
                </span>
              </div>
              {toggles.completedProjects && (
                <ol>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;갓생살기 프로젝트</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;갓생살기 프로젝트</a>
                  </li>
                  <li>
                    <a href="#">📃&nbsp;&nbsp;갓생살기 프로젝트</a>
                  </li>
                </ol>
              )}
            </li>
          </div>
          {/* home 오른쪽 Drive 부분 시작 */}
          <div className="bg-white rounded-lg p-[20px] shadow-sm mx-auto mt-[20px]">
            <span className="text-[20px]">My Drive</span>
            <li className="list-none">
              <div>
                <a
                  href="#"
                  className="w-auto h-[40px] flex items-center border-b border-[#d9d9d9] mb-[15px]"
                >
                  <span
                    className="m-[3px] cursor-pointer"
                    onClick={() => setIsMyOpen(!isMyOpen)}
                  >
                    <img
                      src={
                        isMyOpen
                          ? "/images/Antwork/main/drive/위화살표.png"
                          : "/images/Antwork/main/drive/아래화살표.png"
                      }
                      alt="화살표 아이콘"
                      className="w-4 h-4"
                    />
                  </span>

                  <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                    <img
                      src="/images/Antwork/main/drive/내드라이브.png"
                      alt="Description"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="main-cate">내 드라이브</span>
                </a>
              </div>
              <div
                className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                  isMyOpen ? "max-h-screen" : "max-h-0"
                } pl-8`}
              >
                <ul>
                  <li>
                    <a href="#">
                      <div className="flex items-start items-center mb-2 space-x-4 text-center">
                        <img
                          src="/images/Antwork/main/drive/폴더.png"
                          alt="#"
                          className="w-7 h-7"
                        />
                        <span>안녕</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="flex items-start items-center mb-2 space-x-4 text-center">
                        <img
                          src="/images/Antwork/main/drive/폴더.png"
                          alt="#"
                          className="w-7 h-7"
                        />
                        <span>안녕</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="list-none">
              <div>
                <a
                  href="#"
                  className="w-auto h-[40px] flex items-center border-b border-[#d9d9d9] mb-[15px]"
                >
                  <span
                    className="m-[3px] cursor-pointer"
                    onClick={() => setIsShareOpen(!isShareOpen)}
                  >
                    <img
                      src={
                        isShareOpen
                          ? "/images/Antwork/main/drive/위화살표.png"
                          : "/images/Antwork/main/drive/아래화살표.png"
                      }
                      alt="화살표 아이콘"
                      className="w-4 h-4"
                    />
                  </span>

                  <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                    <img
                      src="/images/Antwork/main/drive/공유드라이브.png"
                      alt="Description"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="main-cate">공유 드라이브</span>
                </a>
              </div>
              <div
                className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                  isShareOpen ? "max-h-screen" : "max-h-0"
                } pl-8`}
              >
                <ul>
                  <li>
                    <a href="#">
                      <div className="flex items-start items-center mb-2 space-x-4 text-center">
                        <img
                          src="/images/Antwork/main/drive/폴더.png"
                          alt="#"
                          className="w-7 h-7"
                        />
                        <span>안녕</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="flex items-start items-center mb-2 space-x-4">
                        <img
                          src="/images/Antwork/main/drive/폴더.png"
                          alt="#"
                          className="w-7 h-7"
                        />
                        <span>안녕</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </div>
          {/* home 오른쪽 chatting 부분 시작 */}
          <div className="bg-white rounded-lg p-[20px] shadow-sm mx-auto mt-[20px]">
            <span className="text-[20px]">My Chatting</span>
            <div className="mt-4">
              <div
                className="flex items-center justify-between cursor-pointer mb-3 bg-white-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
                onClick={() => toggleSection("isPersonalOpen")}
              >
                <span className="text-lg font-semibold text-black">
                  👤 개인 채팅
                </span>
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-transform ${
                    toggles.isPersonalOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  toggles.isPersonalOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="space-y-4">
                  <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
                    <img
                      src="path/to/avatar1.jpg"
                      alt="User"
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg text-gray-800">
                        강은경
                        <span className="ml-2 w-3 h-3 bg-green-400 rounded-full inline-block"></span>
                      </p>
                      <p className="text-sm text-gray-500">
                        새로운 메시지가 있습니다.
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">11:30</span>
                  </li>
                  <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
                    <img
                      src="./path/to/avatar2.jpg"
                      alt="User"
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg text-gray-800">
                        김민희
                        <span className="ml-2 w-3 h-3 bg-gray-400 rounded-full inline-block"></span>
                      </p>
                      <p className="text-sm text-gray-500">
                        "잠시 후 회의 시작..."
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">10:15</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 채널 섹션 */}
            <div className="mt-6">
              <div
                className="flex items-center justify-between cursor-pointer mb-3 bg-white-100 px-3 py-2 rounded-lg hover:bg-blue-200 transition"
                onClick={() => toggleSection("isChannelOpen")}
              >
                <span className="text-lg font-semibold text-black">
                  📢 채널 (단체 채팅)
                </span>
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-transform ${
                    toggles.isChannelOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  toggles.isChannelOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="space-y-4">
                  <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
                    <img
                      src="path/to/group-icon.svg"
                      alt="Group"
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg text-gray-800">
                        팀 프로젝트
                      </p>
                    </div>
                    <div className="ml-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                      3
                    </div>
                  </li>
                  <li className="flex items-center p-3 rounded-lg bg-white hover:bg-blue-100 cursor-pointer transition">
                    <img
                      src="path/to/group-icon.svg"
                      alt="Group"
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-lg text-gray-800">
                        마케팅 팀
                      </p>
                    </div>
                    <div className="ml-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                      5
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
