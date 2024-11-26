/* eslint-disable react/prop-types */
import { useState } from "react";

import Header from "../components/common/header";
import Navigator from "../components/common/navigator";
import ChattingAside from "./../components/common/chattingAside";

const AntWorkLayout = ({ children }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const toggleAside = () => {
    setIsAsideVisible((prev) => !prev);
  };

  return (
    <div id="main-container">
      <Header onToggleAside={toggleAside} />
      <main>
        <Navigator />
        <ChattingAside />
        <section className="main-content">{children}</section>
      </main>
    </div>
  );
};

export default AntWorkLayout;
