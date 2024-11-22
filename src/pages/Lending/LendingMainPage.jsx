import { Link } from "react-router-dom";

export default function LendingMainPage() {
  return (
    <div id="wrap">
      <header id="header">
        <div className="headerIn">
          <h1 className="logo">
            <a href="#">
              <img src="#" alt="" />
              Antwork
            </a>
          </h1>

          <nav className="gnb">
            <ul>
              <li>
                <a href="#">
                  <img
                    src="../../../public/images/Lending/home.svg"
                    alt="home ico"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  서비스 소개<span></span>
                </a>
              </li>
              <li>
                <a href="#">가격 및 혜택</a>
              </li>
              <li>
                <a href="#">체험 및 도입 </a>
              </li>
              <li>
                <a href="#">고객센터</a>
              </li>
            </ul>
            <div className="headerBtn">
              <Link to="/login" className="login">
                로그인
              </Link>
              <a className="register">회원가입</a>
            </div>
          </nav>
        </div>
      </header>
      <div id="mainSlider">
        <div className="slider">
          <img
            src="../../../public/images/Lending/main_img(1920x815).jpg"
            alt="메인페이지 1"
          />
        </div>

        <ul>
          <li className="s1">
            <a href="#"></a>
          </li>
          <li className="s2">
            <a href="#"></a>
          </li>
          <li className="s3">
            <a href="#"></a>
          </li>
        </ul>
        <div className="text">
          <p className="tit">일개미가 되다.</p>

          <p className="des">
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
            <a href="#">
              무료로 이용하기
              <i></i>
              <span></span>
            </a>
          </p>
        </div>

        <div className="btn">
          <a href="#" className="btnL"></a>
          <a href="#" className="btnR"></a>
        </div>
      </div>
      <main id="container">
        <section className="cont1">
          <div className="inner">
            <h3>제목</h3>
          </div>
        </section>
        <section className="cont2">
          <div className="inner"></div>
        </section>
      </main>
      <footer id="footer">
        <div id="footerIn">
          <div className="flogo">Antwork</div>
          <div className="finfo">
            <p className="contant">Contant us</p>
            <p className="fm1">
              <a href="#"> 이용약관 </a>
            </p>
            <p className="fm2">
              <a href="#"> 이메일무단수집거부 </a>
            </p>
            <p className="copy">2024 &copy;</p>
          </div>
          <div className="fmenu">
            <p className="fm3">
              <a href="#"> 개인정보처리방침 </a>
            </p>
            <p className="family">
              <a href="#">
                FAMILY SITE
                <span></span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
