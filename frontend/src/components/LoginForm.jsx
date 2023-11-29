import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginForm = ({
  loginForm,
  setLoginForm,
  setIsAdmin,
  loggedIn,
  setLoggedIn,
}) => {
  const navigate = useNavigate();
  const updateLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("/login", loginForm, {
        withCredentials: true,
      });
      console.log("response of login", resp);
      if (resp.status === 200) {
        // set log in state
        setLoggedIn(true);
        console.log("logged in state", loggedIn);
        // set admin state
        setIsAdmin(resp.data.isAdmin);
  
        // navigate to employeess page
        navigate("/");
      }
      
    } catch (error) {
      console.log(error)
      alert("Incorrect email or password.")
    }
  };
  return (
    <div> 
      <h2>Login page</h2>
      <form onSubmit={login}>
        <input
          type="text"
          name="email"
          value={loginForm.email}
          placeholder="email"
          onChange={updateLoginForm}
        />
        
        <input
          type="password"
          name="password"
          value={loginForm.password}
          placeholder="password"
          onChange={updateLoginForm}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
