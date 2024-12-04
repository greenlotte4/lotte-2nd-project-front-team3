import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TermsModal from "../../components/common/modal/termsModal";
import { verifyInviteToken } from "../../api/userAPI";
import useModalStore from "../../store/modalStore";

export default function RegisterPage() {
  const openModal = useModalStore((state) => state.openModal);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // URL에서 token 읽기

  // 약관 동의 상태
  const [checkedItems, setCheckedItems] = useState({
    agreeAll: false,
    agree1: false,
    agree2: false,
    agree3: false,
  });

  // 초대 토큰 검증 상태
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 현재 단계 관리 (1: 약관 동의, 2: 회원가입)
  const [currentStep, setCurrentStep] = useState(1);

  // 초대 토큰 검증
  useEffect(() => {
    if (currentStep === 2 && token) {
      const validateToken = async () => {
        try {
          const data = await verifyInviteToken(token);
          setUserData(data); // 사용자 정보 설정
          setIsTokenValid(true);
        } catch (error) {
          setErrorMessage(error.message || "초대 토큰이 유효하지 않습니다.");
          setIsTokenValid(false);
        }
      };
      validateToken();
    }
  }, [currentStep, token]);

  // 약관 동의 처리
  const handleAgree = (type) => {
    setCheckedItems((prev) => {
      const updatedState = { ...prev, [type]: true };
      updatedState.agreeAll =
        updatedState.agree1 && updatedState.agree2 && updatedState.agree3;
      return updatedState;
    });
  };

  const handleAllCheck = () => {
    const allChecked = !checkedItems.agreeAll;
    setCheckedItems({
      agreeAll: allChecked,
      agree1: allChecked,
      agree2: allChecked,
      agree3: allChecked,
    });
  };

  const handleItemCheck = (key) => {
    setCheckedItems((prev) => {
      const updatedState = { ...prev, [key]: !prev[key] };
      updatedState.agreeAll =
        updatedState.agree1 && updatedState.agree2 && updatedState.agree3;
      return updatedState;
    });
  };

  // 'Next' 버튼 클릭 시 검증 및 단계 이동
  const handleNextClick = () => {
    if (!checkedItems.agree1 || !checkedItems.agree2) {
      alert("모든 필수 항목에 동의해야 합니다.");
      return;
    }
    setCurrentStep(2);
  };

  // 회원가입 폼 렌더링
  const renderRegisterForm = () => {
    if (errorMessage) {
      return <p className="error-message">{errorMessage}</p>;
    }

    if (!isTokenValid) {
      return <p>토큰 검증 중...</p>;
    }

    return (
      <form className="register_form">
        <div className="register_one">
          <h1 className="logo">
            <Link to="/">
              <img
                src="/images/Landing/antwork_logo.png"
                alt="antwork 로고"
                className="ml-[7.5rem] w-[146px] h-[47px]"
              />
            </Link>
          </h1>
          <span className="register_title">Register</span>
          <span className="register_logo">회원가입 페이지입니다.</span>

          <p>Name</p>
          <input
            type="text"
            className="register_name"
            name="register_name"
            defaultValue={userData?.name || ""}
          />

          <p>Password</p>
          <input
            type="password"
            className="register_pass"
            name="register_pass"
          />

          <p>Confirm Password</p>
          <input
            type="password"
            className="register_pass2"
            name="register_pass2"
          />

          <p>Email</p>
          <input
            type="email"
            className="register_email"
            name="register_email"
            defaultValue={userData?.email || ""}
            readOnly
          />
        </div>
        <button className="register_sign">Sign Up</button>
      </form>
    );
  };

  return (
    <div className="member_body">
      {currentStep === 1 ? (
        // 약관 동의 단계
        <div className="terms-container">
          <div id="main">
            <img
              id="womanImg"
              src="images/Antwork/member/woman.png"
              alt="여자"
            />
            <img id="manImg" src="images/Antwork/member/man.png" alt="남자" />
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
                  <input
                    type="checkbox"
                    id="agreeAll"
                    checked={checkedItems.agreeAll}
                    onChange={handleAllCheck}
                  />
                  <label htmlFor="agreeAll">전체 동의</label>
                </div>
                <div className="agreement-item">
                  <input
                    type="checkbox"
                    id="agree1"
                    checked={checkedItems.agree1}
                    onChange={() => handleItemCheck("agree1")}
                  />
                  <label htmlFor="agree1">
                    <em className="em">[필수]</em> 서비스 이용 약관
                  </label>
                  <button
                    className="detail-btn"
                    onClick={() =>
                      openModal("terms", {
                        type: "agree1",
                        onAgree: () => handleAgree("agree1"),
                      })
                    }
                  >
                    전문 &gt;
                  </button>
                </div>
                <div className="agreement-item">
                  <input
                    type="checkbox"
                    id="agree2"
                    checked={checkedItems.agree2}
                    onChange={() => handleItemCheck("agree2")}
                  />
                  <label htmlFor="agree2">
                    <em className="em">[필수]</em> 개인 정보 수집 및 이용 안내
                  </label>
                  <button
                    className="detail-btn"
                    onClick={() =>
                      openModal("terms", {
                        type: "agree2",
                        onAgree: () => handleAgree("agree2"),
                      })
                    }
                  >
                    전문 &gt;
                  </button>
                </div>
                <div className="agreement-item">
                  <input
                    type="checkbox"
                    id="agree3"
                    checked={checkedItems.agree3}
                    onChange={() => handleItemCheck("agree3")}
                  />
                  <label htmlFor="agree3">[선택] 광고성 정보 수신</label>
                  <button
                    className="detail-btn"
                    onClick={() =>
                      openModal("terms", {
                        type: "agree3",
                        onAgree: () => handleAgree("agree1"),
                      })
                    }
                  >
                    전문 &gt;
                  </button>
                </div>
              </div>
              <button onClick={handleNextClick} className="next-btn">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        // 회원가입 단계
        renderRegisterForm()
      )}
      <TermsModal />
    </div>
  );
}
