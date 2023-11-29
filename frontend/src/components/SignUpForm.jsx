import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUpForm = ({ signUpForm, setSignUpForm }) => {
  const navigate = useNavigate();
  const updateSignUpForm = (e) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };
  const signUp = async (e) => {
    e.preventDefault();
    const adminUser = { ...signUpForm };
    adminUser.isAdmin = true;

    try {
      const resp = await axios.post("/admin/signup", adminUser, {
        withCredentials: true,
      });
      console.log("response of signup", resp);
      if (resp.status === 200) {
        // navigate to login
        navigate("/login");
      }
      
    } catch (error) {
      
      console.log(error)
      alert("User already registered.")
    }
  };
  return (
    <div >
      <h2>Sign up</h2>
      <form onSubmit={signUp}>
        <input
          type="text"
          name="email"
          value={signUpForm.email}
          placeholder="email"
          onChange={updateSignUpForm}
        />
        <input
          type="password"
          name="password"
          value={signUpForm.password}
          placeholder="password"
          onChange={updateSignUpForm}
        />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUpForm;
