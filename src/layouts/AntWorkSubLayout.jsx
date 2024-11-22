import Header from "./../components/common/header";
import Navigator from "./../components/common/navigator";
// eslint-disable-next-line react/prop-types
const AntWorkLayout = ({ children }) => {
  return (
    <div id="main_container">
      <Header />
      <main>
        <Navigator />
        {children}
      </main>
    </div>
  );
};

export default AntWorkLayout;
