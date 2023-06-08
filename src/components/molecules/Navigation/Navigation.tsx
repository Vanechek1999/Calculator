import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import userStore from "../../../stores/user-store";

import classNames from "classnames/dedupe";

import SvgImage from "../../atoms/SvgImage/SvgImage";
import Paper from "../../atoms/Paper/Paper";
import Typography from "../../atoms/Typography/Typography";
import Preloader from "../Preloader/Preloader";

import "./Navigation.scss";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { storeUser } = userStore;
  useEffect(() => {
    if (!storeUser.login) {
      navigate("/login");
    } else {
      setIsAuth(true);
    }
  }, [storeUser.login]);
  const updateUserName = (userName: string | undefined) => {
    if (userName) {
      const parts = userName.split("@");
      const firstPart = parts[0]
      const secondPart = parts[1]
      const secondPartFirstSymbol = secondPart[0]
      const dom = secondPart.slice(1).split(".");      
      const name = firstPart + "@" + secondPartFirstSymbol + dom[0].replace(/./g, "*") + "." + dom[1];
      
      return name[0].toUpperCase() + name.slice(1);
    }
  };

  return (
    <>
      {isAuth && (
        <>
          <Paper
            top={{ desktop: 16 }}
            left={{ desktop: 32 }}
            className="Navigation-ShowOrHideMenu"
            onClick={() => setShowMenu(!showMenu)}
          >
            <SvgImage type="menu" />
          </Paper>
          <Paper
            className={classNames(
              "Navigation",
              showMenu && "Navigation_active"
            )}
            top={{ all: 40 }}
            right={{ all: 20 }}
            left={{ desktop: 32, mobile: 16 }}
          >
            <Typography>Hello {updateUserName(storeUser.login)}</Typography>
            <Paper top={{ all: 20 }}>
              <Typography>
                На этой странице ты можешь делать сложение чисел
              </Typography>
            </Paper>
          </Paper>
        </>
      )}
      <Preloader size="400px" loading={isAuth ? "hide" : "loading"} inForm />
    </>
  );
};

export default Navigation;
