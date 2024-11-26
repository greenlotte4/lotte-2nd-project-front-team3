import { Link } from "react-router-dom";


{
  /*
    날짜 : 2024/11/26(화)
    생성자 : 김민희
    내용 : LendingMainPage.jsx - footer 레이아웃 구현

    수정 내역 : 
    예시) 2024/12/01 - 강은경 : ~~~ 를 위해 ~~~ 추가
    
  */
}

export default function LendingMainPage() {
  return (
    <div id="wrap">
      <header id="header z-1000 bg-white">
        <div className="headerIn">
          <h1 className="logo">
            <Link to="#">
              <img src="#" alt="" />
              Antwork
            </Link>
          </h1>

          {/* 메뉴 */}
          <nav className="gnb">
            <ul className="">
              <li>
                <Link to="#" className="home cursor-pointer">
                  <img
                    src="../../../public/images/Lending/home.svg"
                    alt="home ico"
                  />
                </Link>
              </li>
              <li>
                <Link to="#" className="cursor-pointer"> 
                  서비스 소개
                  <img src="../../../public/images/ico/arrow_drop_down.svg" alt="arrow_drop_down 🔽" />
                </Link>
              </li>
              <li>
                <Link to="#" className="cursor-pointer">
                  가격 및 혜택
                  <img src="../../../public/images/ico/arrow_drop_down.svg" alt="arrow_drop_down 🔽" />
                </Link>
              </li>
              <li>
                <Link to="#" className="cursor-pointer">
                체험 및 도입 
                <img src="../../../public/images/ico/arrow_drop_down.svg" alt="arrow_drop_down 🔽" />
                </Link>
              </li>
            </ul>

            {/* util */}
            <div className="headerBtn">
              <Link to="/login" className="login cursor-pointer">
                로그인
              </Link>
              <Link to className="register cursor-pointer">회원가입</Link>
            </div>

          </nav>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 ---------------------------------------------------------------------------------------*/}
      <div id="mainSlider">
        <div className="slider">
          <img src="../../../public/images/Lending/main_img(1920x815).jpg" alt="메인페이지 1" />
        </div>

        <ul>
          <li className="s1">
            <Link to="#"></Link>
          </li>
          <li className="s2">
            <Link to="#"></Link>
          </li>
          <li className="s3">
            <Link to="#"></Link>
          </li>
        </ul>
        <div className="text z-8">
          <p className="tit z-8">일개미가 되다.</p>

          <p className="des line-clamp-4">
            안녕하세요! 저희 회사는 효율적인 업무 환경과 원활한 협업을 위한
            최첨단 그룹웨어 솔루
            <br />
            션을 제공하는 기업입니다. 최고의 기술력과 노하우를 바탕으로, 조직의
            커뮤니케이션 활<br />
            성화, 문서 관리 간소화, 프로젝트 관리 강화를 목표로 하고 있습니다.
            <br />
            앞으로도 고객과 함께 성장하며, 혁신적인 IT 기술로 더 나은 내일을
            만들어 가겠습니다.
          </p>


          <p className="more">
            <Link to="#">
              무료로 이용하기
              <i></i>
              <span></span>
            </Link>
          </p>
        </div>

        <div className="btn">
          <Link to="#" className="btnL"></Link>
          <Link to="#" className="btnR"></Link>
        </div>
      </div>
      <main id="container">
        <section className="cont1">
          <div className="inner">
            <h3>
              {/* cont1 */}
            </h3>
          </div>
        </section>
        <section className="cont2">
          <div className="inner"></div>
        </section>
      </main>

      {/* 푸터 영역 */}
      <footer id="footer" className="flex w-full h-300 bg-white border-t border-slate-200">
        <div className="footerIn flex justify-start h-200 bg-white p-20">


          <div className="flogo flex items-start gap-15 pt-30">
            <Link to="#" className="cursor-pointer">
              <img className="bg-slate-500 w-40 h-20 gap-8" 
                    src="../../../public/images/Lending/logo.svg" 
                    alt="Antwork footer logo" />
            </Link>
          </div>

          <div className="finfo flex items-start ml-20 mt-30 mb-20">

            <div className="left items-start !gap-60">
              <ul className="dep flex gap-20">

                {/* dep1-1 서비스 소개 start */}
                <li className="dep1-2 w-500 cursor-pointer">
                  <a href="#" className="cursor-pointer !text-[15px] mb-2 block text-slate-700 font-semibold">서비스 소개</a> 

                    <ul className="dep2">
                      <li className="dep2-1">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">기능 소개서</a>
                      </li>
                      <li className="dep2-2">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">서비스 소개</a>
                      </li>
                      <li className="dep2-3">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">주요 기능</a>
                      </li>
                    </ul>

                </li>
                {/* dep1-1 서비스 소개 end */}

                {/* dep1-2 가격 및 혜택 start */}
                <li className="dep1-2 w-500 cursor-pointer">
                  <a href="#" className="cursor-pointer !text-[15px] font-semibold text-slate-700 mb-2 block">가격 및 혜택</a> 

                    <ul className="dep2">
                      <li className="dep2-1">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">가격 안내</a>
                      </li>
                      <li className="dep2-2">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">혜택 소개</a>
                      </li>
                      <li className="dep2-3">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">무료 체험</a>
                      </li>
                      <li className="dep2-4">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">10인 이하</a>
                      </li>
                      <li className="dep2-5">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">도입 문의</a>
                      </li>
                      <li className="dep2-6">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">견적서 요청</a>
                      </li>
                    </ul>

                </li>
                {/* dep1-2 가격 및 혜택 end */}

                {/* dep1-3 체험 및 도입 start */}
                <li className="dep1-2 w-500 cursor-pointer ">
                  <a href="#" className="cursor-pointer !text-[14.5px] mb-2 block font-semibold text-slate-700">체험 및 도입</a> 

                    <ul className="dep2">
                      <li className="dep2-1">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">고객센터</a>
                      </li>
                      <li className="dep2-2">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">매뉴얼</a>
                      </li>
                      <li className="dep2-3">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">상세 가이드</a>
                      </li>
                      <li className="dep2-4">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">다운로드</a>
                      </li>
                      <li className="dep2-5">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">공지사항</a>
                      </li>
                      <li className="dep2-6">
                        <a href="#" className="cursor-pointer !text-[13.5px] leading-8 text-slate-500">도입상담</a>
                      </li>
                    </ul>

                </li>
                {/* dep1-1 서비스 소개 end */}


                

                
              </ul>
            </div>


          </div>


          <div className="right flex row-auto items-start  !w-300 !h-auto">
            <div className="sns">
              <img className="!w-145 !h-auto" src="../../../public/images/Lending/sns.png" alt="sns - 트위터, 인스타그램, 유튜브, LinkedIn" />
            </div>
          </div>
          
        </div>
      </footer>



    </div>
  );
}
