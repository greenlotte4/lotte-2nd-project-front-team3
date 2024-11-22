import Header from "../component/common/header";
import Navigator from "../component/common/navigator";
// eslint-disable-next-line react/prop-types
const AntWorkLayout = ({ children }) => {
  return (
    <div id="container">
      <Header />
      <main>
        <Navigator />
        {children}
      </main>
    </div>
  );
};

export default AntWorkLayout;
