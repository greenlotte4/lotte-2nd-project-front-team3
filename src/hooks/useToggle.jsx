import { useState } from "react";

function useToggle(initialStates) {
  const [toggleStates, setToggleStates] = useState(initialStates);

  const toggleState = (key) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return [toggleStates, toggleState];
}

export default useToggle;
