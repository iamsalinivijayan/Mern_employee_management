import axios from "axios";
import { useNavigate } from "react-router-dom";
const LogOutPage = ({ setIsAdmin, setLoggedIn }) => {
  const navigate = useNavigate();
  const logOut = async () => {
    const resp = await axios.get("/logout", { withCredentials: true });
    if (resp.status === 200) {
      setLoggedIn(null);
      setIsAdmin(null);
      navigate("/login");
    }
  };
  return (
    <div>
      <h3>Are you sure you want to log out?</h3>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
export default LogOutPage;
