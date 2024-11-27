import LandingLayout from "../../layouts/LandingLayout";
export default function LandingPayPage({ children }) {
  return (
    <LandingLayout>
      <div className="pay-container">
        <div className="content-left">
          <h1 className="title">제품 및 가격안내</h1>
          <img src="../../../public/images/Landing/payyb.png"></img>
          <p className="subtitle">
            규모, 환경, 예산에 맞게 도입할 수 있는 다양한 유형의 제품을 합리적인
            가격으로 제공합니다.
          </p>
          <div className="footer">
            <p className="plan">100% 무료 플랜을 사용해 보세요</p>
            <div className="trial-container">
              <p className="trial-text">
                무료 플랜을 시작하고 한 달에 10번의 조회를 완전 무료로 수행해
                보세요!
              </p>
              <button className="trial-button">무료 체험</button>
            </div>

            <div className="payment-methods">
              <p>결제 수단</p>
              <img
                src="../../../public/images/Landing/payment.png"
                alt="Payment Methods (Visa, Mastercard, etc.)"
              />
              <img
                src="../../../public/images/Landing/paymentbottom.png"
                alt="Payment Methods (Visa, Mastercard, etc.)"
              />
            </div>
          </div>
        </div>

        <div className="plans">
          {/* Basic Plan */}
          <div className="plan-card basic">
            <h2>Basic 요금제</h2>
            <p>개인 및 소규모 팀에게 적합한 요금제입니다.</p>
            <h3>$19</h3>
            <p>월 요금 (1인당)</p>
            <ul>
              <li>
                <span className="icon check">✔</span> 메시지: 팀원 간 채팅 기능
                제공 (최대 5명)
              </li>
              <li>
                <span className="icon check">✔</span> 프로젝트: 프로젝트 2개
                생성 가능
              </li>
              <li>
                <span className="icon check">✔</span> 드라이브: 5GB 스토리지
                제공
              </li>
              <li>
                <span className="icon cross">✘</span> 페이지: 페이지 생성 불가
                (읽기만 가능)
              </li>
              <li>
                <span className="icon cross">✘</span> 게시판: 공지사항 읽기 전용
              </li>
            </ul>
            <button className="trial-button">14일 무료 체험 시작</button>
            <p className="no-credit">신용카드 정보 필요 없음</p>
          </div>

          {/* Professional Plan */}
          <div className="plan-card professional">
            <h2>Professional 요금제</h2>
            <p>중소기업 및 전문 사용자에게 적합한 요금제입니다.</p>
            <h3>$49</h3>
            <p>월 요금 (1인당)</p>
            <ul>
              <li>
                <span className="icon check">✔</span> 메시지: 팀 채팅 및 파일
                첨부 기능 (최대 15명)
              </li>
              <li>
                <span className="icon check">✔</span> 프로젝트: 프로젝트 10개
                생성 가능
              </li>
              <li>
                <span className="icon check">✔</span> 드라이브: 50GB 스토리지
                제공
              </li>
              <li>
                <span className="icon check">✔</span> 페이지: 페이지 5개 생성
                가능
              </li>
              <li>
                <span className="icon check">✔</span> 게시판: 게시판 작성 및
                댓글 가능
              </li>
            </ul>
            <button className="trial-button">14일 무료 체험 시작</button>
            <p className="no-credit">신용카드 정보 필요 없음</p>
          </div>

          {/* Advanced Plan */}
          <div className="plan-card advanced">
            <h2>Advanced 요금제</h2>
            <p>대기업 및 고급 사용자에게 적합한 요금제입니다.</p>
            <h3>$99</h3>
            <p>월 요금 (1인당)</p>
            <ul>
              <li>
                <span className="icon check">✔</span> 메시지: 무제한 팀 채팅 및
                대규모 파일 공유 지원
              </li>
              <li>
                <span className="icon check">✔</span> 프로젝트: 무제한 프로젝트
                생성 가능
              </li>
              <li>
                <span className="icon check">✔</span> 드라이브: 1TB 스토리지
                제공
              </li>
              <li>
                <span className="icon check">✔</span> 페이지: 무제한 페이지 생성
                가능
              </li>
              <li>
                <span className="icon check">✔</span> 게시판: 게시판 작성, 댓글,
                커스터마이징 가능
              </li>
            </ul>
            <button className="trial-button">14일 무료 체험 시작</button>
            <p className="no-credit">신용카드 정보 필요 없음</p>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
