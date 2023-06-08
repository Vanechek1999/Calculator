import Paper from "../../atoms/Paper/Paper";
import Button from "../../atoms/Button/Button";
import Lottie from "lottie-react";

import animationCalc from "../../../lottie/calculator.json";

import "./Header.scss";

const Header = () => {
  return (
    <header className="Header">
      <Paper
        top={{ all: 16 }}
        right={{ all: 32 }}
        bottom={{ all: 16 }}
        left={{ all: 32 }}
        display="flex"
        className="Header-Content"
      >
        <a href="/">
          <Lottie
            style={{ width: "40px", height: "40px" }}
            animationData={animationCalc}
          />
        </a>
      </Paper>
    </header>
  );
};

export default Header;
