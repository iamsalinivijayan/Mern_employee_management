import { useState } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = ({ isAdmin, setIsAdmin, loggedIn, setLoggedIn }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  return (
    <LoginForm
      loginForm={loginForm}
      setLoginForm={setLoginForm}
      isAdmin={isAdmin}
      setIsAdmin={setIsAdmin}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
    />
  );
};

export default LoginPage;
