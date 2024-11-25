/* eslint-disable react/prop-types */
import { useState } from "react";

import Header from "../components/common/header";
import Navigator from "../components/common/navigator";
import Aside from "./../components/common/aside";

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
        <Aside />
        <section className="main-content">{children}</section>
      </main>
    </div>
  );
};

export default AntWorkLayout;
