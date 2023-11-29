import { useState } from "react";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });

  return <SignUpForm signUpForm={signUpForm} setSignUpForm={setSignUpForm} />;
};

export default SignUpPage;
