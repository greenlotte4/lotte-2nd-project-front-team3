/* eslint-disable react/prop-types */
import { useState } from "react";

import Aside from "../components/common/aside";
import Header from "../components/common/header";
import Navigator from "../components/common/navigator";

const AntWorkLayout = ({ children }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(true);

  const toggleAside = () => {
    setIsAsideVisible((prev) => !prev);
  };

  return (
    <div id="main-container">
      <Header onToggleAside={toggleAside} />
      <main>
        <Navigator />
        <Aside asideVisible={isAsideVisible} />
        <section className="main-content">{children}</section>
      </main>
    </div>
  );
};

export default AntWorkLayout;
