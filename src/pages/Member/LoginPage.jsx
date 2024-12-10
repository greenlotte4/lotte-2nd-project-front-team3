import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userAPI";
import axiosInstance from "./../../utils/axiosInstance";

export default function LoginPage() {
  const [uid, setUid] = useState(""); // UID 필드로 변경
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // 자동 로그인 여부
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 로컬 또는 세션 스토리지에서 액세스 토큰 가져오기
  //   const token = getAccessToken();
  //   if (token) {
  //     console.log("Access token found, redirecting to dashboard...");
  //     navigate("/antwork"); // 토큰이 있으면 대시보드로 이동
  //   }
  // }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 기본 동작 막기

    try {
      // 로그인 요청
      const response = await loginUser(uid, password);
      const accessToken = response.accessToken;

      // 토큰 저장 (자동 로그인 여부에 따라)
      if (rememberMe) {
        localStorage.setItem("authToken", accessToken); // 로컬 스토리지
      } else {
        sessionStorage.setItem("authToken", accessToken); // 세션 스토리지
      }

      // axiosInstance의 기본 Authorization 헤더 업데이트
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

      // 로그인 성공 후 대시보드로 이동
      navigate("/antwork");
    } catch (error) {
      // 에러 메시지 설정
      setError(
        error.message ||
          "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    }
  };

  return (
    <div className="member_body">
      <div className="wrapper">
        <div className="content">
          <img
            src="/images/Antwork/member/login.png"
            alt="login_img"
            className="login_img"
          />
          <div className="login-box">
            <h1 className="logo">
              <Link to="/">
                <img
                  src="/images/Landing/antwork_logo.png"
                  alt="antwork 로고"
                  className="ml-[7.5rem] w-[146px] h-[47px]"
                />
              </Link>
            </h1>

            {/* 로그인 폼 */}
            <form className="login_form" onSubmit={handleLogin}>
              <label htmlFor="uid" className="email_lbl">
                UID
              </label>
              <input
                id="uid"
                type="text"
                className="email"
                placeholder="UID를 입력하세요"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              />

              <label htmlFor="password" className="pass_lbl">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">자동 로그인</label>
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="btn">
                로그인
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
