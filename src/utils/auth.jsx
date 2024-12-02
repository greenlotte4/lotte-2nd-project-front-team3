// 로그인 토큰
export const getAccessToken = () => {
  return (
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
};
