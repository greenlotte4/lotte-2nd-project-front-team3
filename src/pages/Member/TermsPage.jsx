import TermsModal from "../../components/common/modal/termsModal";
import useModalStore from "./../../store/modalStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TermsPage() {
  const openModal = useModalStore((state) => state.openModal);
  const navigate = useNavigate();

  // 체크박스 상태 관리
  const [checkedItems, setCheckedItems] = useState({
    agreeAll: false,
    agree1: false,
    agree2: false,
    agree3: false,
  });

  // 전문 동의 처리
  const handleAgree = (type) => {
    setCheckedItems((prev) => {
      const updatedState = { ...prev, [type]: true };

      // 전체 동의 상태 갱신
      const allSelected =
        updatedState.agree1 && updatedState.agree2 && updatedState.agree3;
      updatedState.agreeAll = allSelected;

      return updatedState;
    });
  };

  // 전체 선택/해제
  const handleAllCheck = () => {
    const allChecked = !checkedItems.agreeAll;
    setCheckedItems({
      agreeAll: allChecked,
      agree1: allChecked,
      agree2: allChecked,
      agree3: allChecked,
    });
  };

  // 개별 체크박스 상태 변경
  const handleItemCheck = (key) => {
    setCheckedItems((prevState) => {
      const updatedState = { ...prevState, [key]: !prevState[key] };

      // 전체 선택 상태 갱신
      const allSelected =
        updatedState.agree1 && updatedState.agree2 && updatedState.agree3;
      updatedState.agreeAll = allSelected;

      return updatedState;
    });
  };

  // 'Next' 버튼 클릭 시 검증
  const handleNextClick = () => {
    if (!checkedItems.agree1 || !checkedItems.agree2) {
      alert("모든 필수 항목에 동의해야 합니다.");
      return;
    }
    navigate("/register");
  };

  return (
    <div className="member_body">
      <div className="terms-container">
        <div id="main">
          <img id="womanImg" src="images/Antwork/member/woman.png" alt="여자" />
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
                      onAgree: () => handleAgree("agree3"),
                    })
                  }
                >
                  전문 &gt;
                </button>
              </div>
            </div>
            <div className="footer">
              <Link to="/login" className="back-btn">
                Prev
              </Link>
              <button onClick={handleNextClick} className="next-btn">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <TermsModal />
    </div>
  );
}
