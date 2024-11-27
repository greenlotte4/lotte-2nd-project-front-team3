import LendingFooter from "../components/landing/Lendingfooter";
import LendingHeader from "../components/landing/Lendingheader";
{
  /*
    날짜 : 2024/11/27(수)
    생성자 : 최준혁
    내용 : LendingLayout 추가

  */
}
const LendingLayout = ({ children }) => {
  return (
    <div id="wrap">
      <LendingHeader />
      {children}
      <LendingFooter />
    </div>
  );
};

export default LendingLayout;
