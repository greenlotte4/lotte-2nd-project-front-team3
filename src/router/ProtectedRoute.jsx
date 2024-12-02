import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utils/auth";

export default function ProtectedRoute({ children }) {
  const token = getAccessToken();

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // 보호된 컴포넌트 렌더링
}
