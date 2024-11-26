export default function MainSection() {
  return (
    <>
      <main className="flex gap-[40px]">
        <article className="w-[258px] h-[300px] bg-[#25bad6] rounded-lg p-[20px]">
          <div className="relative">
            <img
              src="../images/pngegg.png"
              alt="프로필 사진"
              className="w-[82px] h-[82px] mx-auto bg-white rounded-full"
            />
            <span className="absolute bottom-0 right-[70px] w-3 h-3 bg-green-400 rounded-full"></span>
          </div>
          <div className="text-center mt-[20px]">
            <h1 className="text-3xl text-white">OOO 님 환영합니다.</h1>
            <span className=" opacity-60 text-white">OO 그룹 대리</span>
          </div>
          <ul className="mt-[20px]">
            <li className="flex mt-[10px]">
              <a className="flex justify-between w-full">
                <span className=" text-white">오늘의 일정</span>
                <span className="opacity-60 text-white">0</span>
              </a>
            </li>
            <li className="flex mt-[10px]">
              <a className="flex justify-between w-full">
                <span className=" text-white">오늘의 일정</span>
                <span className="opacity-60 text-white">0</span>
              </a>
            </li>
            <li className="flex mt-[10px]">
              <a className="flex justify-between w-full">
                <span className=" text-white">오늘의 일정</span>
                <span className="opacity-60 text-white">0</span>
              </a>
            </li>
          </ul>
        </article>

        <article className="w-[765px] h-[344px] bg-white p-[20px] rounded-lg">
          <h1 className="text-4xl">최근 게시판</h1>

          <div className="w-[720px] h-[50px]  flex mt-[10px]">
            <ul className="flex w-[700px] h-full ">
              <div className="h-full w-1/5 flex items-end justify-center hover:bg-blue-700">
                <li className="">
                  <a href="#" className="bg-transparent text-[18px] ">
                    자료실
                  </a>
                </li>
              </div>
              <div className="h-full w-1/5 flex items-end justify-center hover:bg-blue-700">
                <li className="">
                  <a href="#" className="bg-transparent text-[18px] ">
                    최근 게시판
                  </a>
                </li>
              </div>
              <div className="h-full w-1/5 flex items-end justify-center hover:bg-blue-700">
                <li className="">
                  <a href="#" className="bg-transparent text-[18px] ">
                    인기 게시판
                  </a>
                </li>
              </div>
              <div className="h-full w-1/5 flex items-end justify-center hover:bg-blue-700">
                <li className="">
                  <a href="#" className="bg-transparent text-[18px] ">
                    공지사항
                  </a>
                </li>
              </div>
            </ul>
            <div>
              <button>&lt;</button>
              <button>&gt;</button>
            </div>
          </div>
          <div className="-ml-[20px] border-b border-black border-solid w-[765px] h-1"></div>
        </article>
      </main>
    </>
  );
}

{
  /* <article className="page-list">
            <div className="content-header">
              <h1>Calendar</h1>
              <p>나의 페이지 목록입니다.</p>
            </div>
            <div className="page-grid">
              <div className="page-card">
                <div className="card-content">
                  <div className="user-info">
                    <img
                      src="/api/placeholder/32/32"
                      alt="profile"
                      className="avatar"
                    />
                    <div className="user-details">
                      <h3>페이지 예시1</h3>
                      <p>관리자</p>
                    </div>
                  </div>
                  <button className="options-btn">⋮</button>
                </div>
              </div>
            </div>
          </article> */
}
