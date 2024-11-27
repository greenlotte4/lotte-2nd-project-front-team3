import LendingFooter from "../components/landing/Lendingfooter";
import LendingHeader from "../components/landing/Lendingheader";

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
