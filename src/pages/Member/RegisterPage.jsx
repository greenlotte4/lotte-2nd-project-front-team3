import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TermsModal from "../../components/common/modal/termsModal";
import { checkDuplicateId, verifyInviteToken } from "../../api/userAPI";
import useModalStore from "../../store/modalStore";
import axios from "axios";

export default function RegisterPage() {
  const openModal = useModalStore((state) => state.openModal);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // URL에서 token 읽기
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDuplicateId, setIsDuplicateId] = useState(null);
  const [passwordError, setPasswordError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    password: "",
    nick: "",
    phoneNumber: "",
    email: "",
    role: "",
    profileImageUrl: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 프로필 이미지 변경 핸들러
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result); // 미리보기 URL 설정
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 변환
    }
  };

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
          console.log("data" + data.name);
          console.log("data" + data.department);
          setUserData(data); // 사용자 정보 설정
          setIsTokenValid(true);
          console.log("asdfa" + setUserData(data));
        } catch (error) {
          setErrorMessage(error.message || "초대 토큰이 유효하지 않습니다.");
          setIsTokenValid(false);
        }
      };
      validateToken();

      if (formData.password && confirmPassword) {
        setPasswordError(formData.password !== confirmPassword);
      }
    }
  }, [currentStep, token, formData.password, confirmPassword]);

  // 약관 동의 처리
  const handleAgree = (type) => {
    setCheckedItems((prev) => {
      const updatedState = { ...prev, [type]: true };
      updatedState.agreeAll =
        updatedState.agree1 && updatedState.agree2 && updatedState.agree3;
      return updatedState;
    });
  };
  // 약관 전체 체크 핸들러
  const handleAllCheck = () => {
    const allChecked = !checkedItems.agreeAll;
    setCheckedItems({
      agreeAll: allChecked,
      agree1: allChecked,
      agree2: allChecked,
      agree3: allChecked,
    });
  };

  // 약관 체크 검증 핸들러
  const handleItemCheck = (key) => {
    setCheckedItems((prev) => {
      const updatedState = { ...prev, [key]: !prev[key] };
      updatedState.agreeAll =
        updatedState.agree1 && updatedState.agree2 && updatedState.agree3;
      return updatedState;
    });
  };

  // 아이디 중복 확인 핸들러
  const handleCheckDuplicateId = async (
    formData,
    setIsDuplicateId,
    setErrors
  ) => {
    try {
      // checkDuplicateId 호출
      const response = await checkDuplicateId(formData);
      const { isAvailable } = response; // checkDuplicateId의 결과 데이터에서 isAvailable 필드 추출

      if (isAvailable) {
        // 중복이 아닌 경우
        setIsDuplicateId(false);
        setErrors((prevErrors) => ({ ...prevErrors, uid: null })); // 에러 메시지 초기화
      } else {
        // 중복인 경우
        setIsDuplicateId(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          uid: "이미 사용 중인 아이디입니다.", // 중복 에러 메시지 설정
        }));
      }
    } catch (error) {
      console.error("중복 확인 처리 실패:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        uid: "중복 확인 실패", // 일반적인 에러 메시지 표시
      }));
    }
  };

  // 사용자 입력값 검증 유틸리티 함수
  const validateInput = (input) => {
    if (!input || input.trim() === "") {
      return "아이디를 입력해 주세요."; // 빈 입력값 처리
    }
    if (input.length < 3 || input.length > 20) {
      return "아이디는 3자 이상, 20자 이하로 입력해 주세요."; // 길이 제한
    }
    if (!/^[a-zA-Z0-9_]+$/.test(input)) {
      return "아이디는 영문자, 숫자, 밑줄(_)만 포함할 수 있습니다."; // 허용된 문자 패턴
    }
    return null; // 유효성 검증 성공
  };

  const handleSubmit = async () => {
    // 사용자 입력값 검증
    const validationError = validateInput(formData.uid);
    if (validationError) {
      setErrors((prevErrors) => ({ ...prevErrors, uid: validationError }));
      return; // 유효하지 않은 입력값이면 종료
    }

    // 중복 확인 처리
    await handleCheckDuplicateId(formData, setIsDuplicateId, setErrors);
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
      <div
        id="container"
        className="min-h-screen flex items-center justify-center py-10 px-4"
      >
        <div
          id="register_div"
          className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 space-y-8"
        >
          {/* 로고 및 소개 */}
          <div className="text-center">
            <img
              id="register_img"
              src="images/Antwork/member/register.png"
              alt="Register"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h1 className="text-3xl font-extrabold text-gray-800">Register</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="register_form space-y-6">
            {/* 프로필 사진 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                프로필이미지
              </label>
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-md"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <input
                type="file"
                id="profileImage"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                name="profileImage"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>

            {/* 입력 필드 */}
            {/* 아이디 */}
            <div className="mb-6">
              <label
                htmlFor="uid"
                className="block text-gray-700 font-semibold mb-2"
              >
                아이디
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="uid"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                  name="uid"
                  placeholder="아이디를 입력하세요"
                  value={formData.uid || ""}
                  onChange={(e) => {
                    const input = e.target.value;
                    setFormData((prevData) => ({ ...prevData, uid: input }));

                    // 유효성 검사
                    const validationError = validateInput(input);
                    if (validationError) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        uid: validationError,
                      }));
                    } else {
                      setErrors((prevErrors) => ({ ...prevErrors, uid: null }));
                    }
                  }}
                />
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 w-40 text-white font-semibold h-10 py-2 px-4 rounded-md ml-2"
                  onClick={async () => {
                    if (!formData.uid || errors.uid) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        uid: errors.uid || "아이디를 먼저 입력해 주세요.",
                      }));
                      return;
                    }
                    await handleCheckDuplicateId(
                      { uid: formData.uid },
                      setIsDuplicateId,
                      setErrors
                    );
                  }}
                >
                  중복확인
                </button>
              </div>
              {errors.uid && (
                <p className="text-red-500 text-sm mt-1">{errors.uid}</p>
              )}
              {isDuplicateId === false && (
                <p className="text-green-500 text-sm mt-1">
                  사용 가능한 아이디입니다.
                </p>
              )}
              {isDuplicateId === true && (
                <p className="text-red-500 text-sm mt-1">
                  이미 사용 중인 아이디입니다.
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                name="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            <div className="gap-6 sm:grid-cols-2">
              {/* 이름 */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>

              {/* 닉네임 */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  닉네임
                </label>
                <input
                  type="text"
                  id="nick"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                  name="nick"
                  placeholder="Enter your nickname"
                />
              </div>

              {/* 전화번호 */}
              <div className="sm:col-span-2 mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  휴대폰번호
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-300 focus:outline-none"
                  name="phoneNumber"
                  placeholder="Enter your phoneNumber"
                />
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-8 rounded-lg transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
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
