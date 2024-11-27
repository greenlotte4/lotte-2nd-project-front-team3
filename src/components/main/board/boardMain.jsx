{
  /*
    날짜 : 2024/11/25(월)
    생성자 : 김민희
    내용 : BoardMain.jsx - 게시판 메인 홈 페이지 화면구현 (인기급상승 게시물, 자료실 레이아웃)

    수정 내역 : 
  */
}

export default function BoardMain() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>자유게시판</h1>
          <p className="!mb-5">여러분의 이야기를 자유롭게 공유해 보세요.</p>

          
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
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
                      <h3 className="!text-[15px] mb-2 truncate text-ellipsis whitespace-nowrap">
                        인기급상승 게시물 제목입니다. 회사 신입사원 식탐 문제 지적해야할까요?
                      </h3>
                      <p className="!mt-3 !text-[12px] line-clamp-2">
                        인기급상승 게시물 내용입니다.
                        팀에 신입이 들어왔는데 탕비실에 있는 콘프라이크를 한 봉지 그냥 본인 자리에 가져와서 먹습니다 과자면 이해하는데 
                        진짜 그거는 아닌 것 같아서 작은거 아니고 큰 거입니다 근데 지적하면 사람이 너무 치사해보일것같아서 고민하고 있었습니다 
                        어제 옆팀 사람이 조심스럽게 팀원이 그렇게 먹는거 아냐고 물어보는데 할 말이 없었습니다 이거 제가 말해야하는게 맞을까요? 
                        물론 이거 하나가지고 식탐이라고 할 수 없다면 할 말 없지만 단체 생활의 예의아닐까요?
                      </p>
                      <ul className="mt-4 flex gap-2">

                        <li className="article_create_date w-13 h-7 flex items-center gap-1.5 ">
                          <img className="w-6 h-6"  src="../../../public/images/ico/create_date.svg" alt="create_at 작성일" />
                          <span className="article_create_at w-13]"> 2024-11-25 </span>
                        </li>


                        <li className="article_view w-13 h-7 flex items-center gap-2 ">
                          <img className="w-6 h-6"  src="../../../public/images/ico/eye.svg" alt="eye views 조회수" />
                          <span className="view_count"> 1,016 </span>
                        </li>


                        <li className="article_comment w-13 h-7 flex items-center gap-2 ">
                          <img className="w-6 h-6"  src="../../../public/images/ico/comment.svg" alt="comment 댓글수" />
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
                        인기급상승 게시물 제목입니다. 회사 신입사원 식탐 문제 지적해야할까요?
                      </h3>
                      <p className="!mt-3 !text-[12px] line-clamp-2">
                        인기급상승 게시물 내용입니다.
                        팀에 신입이 들어왔는데 탕비실에 있는 콘프라이크를 한 봉지 그냥 본인 자리에 가져와서 먹습니다 과자면 이해하는데 
                        진짜 그거는 아닌 것 같아서 작은거 아니고 큰 거입니다 근데 지적하면 사람이 너무 치사해보일것같아서 고민하고 있었습니다 
                        어제 옆팀 사람이 조심스럽게 팀원이 그렇게 먹는거 아냐고 물어보는데 할 말이 없었습니다 이거 제가 말해야하는게 맞을까요? 
                        물론 이거 하나가지고 식탐이라고 할 수 없다면 할 말 없지만 단체 생활의 예의아닐까요?
                      </p>
                      <ul className="mt-4 flex gap-2">

                        <li className="article_create_date w-13 h-7 flex items-center gap-1.5 ">
                          <img className="w-6 h-6"  src="../../../public/images/ico/create_date.svg" alt="create_at 작성일" />
                          <span className="article_create_at w-13]"> 2024-11-25 </span>
                        </li>


                        <li className="article_view w-13 h-7 flex items-center gap-2 ">
                          <img className="w-6 h-6"  src="../../../public/images/ico/eye.svg" alt="eye views 조회수" />
                          <span className="view_count"> 1,016 </span>
                        </li>


                        <li className="article_comment w-13 h-7 flex items-center gap-2 ">
                          <img className="w-6 h-6"  src="../../../public/images/ico/comment.svg" alt="comment 댓글수" />
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
              <h1 className="!mb-3 ">📑 자료실</h1>
              {/* <p> 자료실 설명글입니다. </p> */}

              {/* <div className="page-card !h-80">
                <span>자료실 </span>
              </div> */}


              {/* 자료실 컨텐츠 1 */}
              <div className="page-card bg-slate-500">
                <div className="card-content">

                  {/* tab */}
                  

                  <div className="user-details ">
                    <h3 className="!text-[15px] !mb-3 !font-normal">
                      OO학교 CheckList
                    </h3>
                    <div className="user-info !ml-3">
                      <img
                        src="/api/placeholder/32/32"
                        alt="profile"
                        className="avatar"
                      />
                      <p className="!text-[13px]">황수빈</p>
                    </div>
                  </div>
                  <button className="options-btn">⋮</button>
                </div>
              </div>



            </div>
          </article>
          {/* 자료실 끝 */}



          </section>

          

          







        </div>
      </article>
    </>
  );
}
