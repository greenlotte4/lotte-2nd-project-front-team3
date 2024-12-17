import useAuthStore from "@/store/AuthStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children; // 보호된 컴포넌트 렌더링
}
