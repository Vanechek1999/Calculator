import { useNavigate  }  from "react-router-dom"
import { useState, useEffect } from "react";

import { observer } from "mobx-react-lite";

import userStore from '../../../stores/user-store'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Typography from "../../atoms/Typography/Typography";
import Paper from "../../atoms/Paper/Paper";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import Width from "../../atoms/Width/Width";

import './Login.scss'

const Login = observer(() => {
  const { getStoreUser } = userStore
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [ error, setError ] = useState(false)
  const navigation = useNavigate()

  const handleLogin = () => {
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(({user}) => {
        getStoreUser(String(user.email))        
        navigation('/calculate')
      })
      .catch(() => setError(true));
  };

  return (
    <Width className="Login" size={35} align="center">
      <Paper top={{ all: 32 }} right={{ all: 20 }} left={{ all: 20 }}>
        <Typography sizeDesktop={24} sizeMobile={16} weight={700} display="block" align="center">Log in</Typography>
        <Paper top={{ all: 40 }}>
          <label>
            <Typography sizeDesktop={24} sizeMobile={16}>Your Email</Typography> 
            <Input
              value={emailValue}
              type="email"
              placeholder="Введите email"
              warning={error}
              onChange={(e) => {
                setError(false)
                setEmailValue(e.target.value);
              }}
            />
          </label>
          <Paper top={{ all: 20 }}>
            <label>
            <Typography sizeDesktop={24} sizeMobile={16}>Your Password</Typography> 
              <Input
                value={passwordValue}
                type="password"
                placeholder="Введите пароль"
                warning={error}
                onChange={(e) => {
                  setError(false)
                  setPasswordValue(e.target.value);
                }}
              />
            </label>
          </Paper>
          <Paper className="Login-Button" top={{ all: 20 }} bottom={{ all: 32 }}>
            <Width size={20} align="center">
              <Button warning={error} fullWidth type="submit" color="white" onClick={() => handleLogin()} backGround="blue" xSpace={{ all: 20 }} ySpace={{ all: 12 }}>
                Login
              </Button>
            </Width>
            {error && (
              <Typography className="Login-Warning" size={12} display="block" align="center" color="red">Введены некорректные данные</Typography>
            )}
          </Paper>
        </Paper>
      </Paper>
    </Width>
  );
})

export default Login;
