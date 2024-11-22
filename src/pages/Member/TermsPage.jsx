export default function TermsPage() {
  return (
    <div className="member_body">
      <div className="terms-container">
        <div id="main">
          <img
            id="womanImg"
            src="../../../public/images/Antwork/member/woman.png"
            alt="여자"
          />
          <img
            id="manImg"
            src="../../../public/images/Antwork/member/man.png"
            alt="남자"
          />
          <div className="info-box">
            <div className="header">
              <h1>
                약관 및 개인정보 수집, 이용 안내에 <br />
                동의해주세요.
              </h1>
              <p>
                Ant Work 플랫폼 이용을 위해 약관 및 개인정보 수집 및 이용 안내
                동의가 필요합니다.
              </p>
            </div>
            <div className="terms-content">
              <div className="agreement-all">
                <input type="checkbox" id="agreeAll" />
                <label>전체 동의</label>
              </div>
              <div className="agreement-item">
                <input type="checkbox" id="agree1" />
                <label>
                  <em className="em">[필수]</em> 서비스 이용 약관
                </label>
                <button className="detail-btn">전문 &gt;</button>
                <div id="termsModal" className="modal">
                  <div className="modal-content">
                    <span id="closeModalBtn" className="close">
                      &times;
                    </span>
                    <h2>서비스 이용 약관</h2>
                    <div id="modal_main">
                      알려진 바와 같이 당신의 개인정보 네트워크와 내용입니다.
                      당신의 이름과 연락처 정보가 포함되어 있습니다. 당신의
                      개인정보는 안전하게 보호됩니다.알려진 바와 같이 당신의
                      개인정보 네트워크와 내용입니다. 알려진 바와 같이 당신의
                      개인정보 네트워크와 내용입니다. 당신의 이름과 연락처
                      정보가 포함되어 있습니다. 당신의 개인정보는 안전하게
                      보호됩니다.알려진 바와 같이 당신의 개인정보 네트워크와
                      내용입니다. 알려진 바와 같이 당신의 개인정보 네트워크와
                      내용입니다. 당신의 이름과 연락처 정보가 포함되어 있습니다.
                      당신의 개인정보는 안전하게 보호됩니다.알려진 바와 같이
                      당신의 개인정보 네트워크와 내용입니다.
                    </div>
                    <button className="modal_check">
                      <i>&#x2713;&nbsp;&nbsp;</i> 동의하기
                    </button>
                  </div>
                </div>
              </div>
              <div className="agreement-item">
                <input type="checkbox" id="agree2" />
                <label>
                  <em className="em">[필수]</em> 개인 정보 수집 및 이용 안내
                </label>
                <button className="detail-btn">전문 &gt;</button>
              </div>
              <div className="agreement-item">
                <input type="checkbox" id="agree3" />
                <label>[선택] 광고성 정보 수신</label>
                <button className="detail-btn">전문 &gt;</button>
              </div>
            </div>
            <div className="footer">
              <button className="back-btn">Prev</button>
              <button className="next-btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
