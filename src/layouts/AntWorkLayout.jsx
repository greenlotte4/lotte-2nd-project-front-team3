/* eslint-disable react/prop-types */
import { useState } from "react";

import Header from "../components/common/header";
import Navigator from "../components/common/navigator";
import ChattingAside from "../components/common/aside/chattingAside";
import Aside from "../components/common/aside/aside";

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
