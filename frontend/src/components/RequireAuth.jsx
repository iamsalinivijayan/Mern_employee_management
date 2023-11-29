import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
const RequireAuth = (props) => {
  console.log("require auth logged in", props);
  const { loggedIn, setLoggedIn, setIsAdmin } = props.children.props;
  const checkAuth = async () => {
    try {
      const resp = await axios.get("/checkauth", { withCredentials: true });
      console.log("resp", resp);
      setLoggedIn(true);
      setIsAdmin(resp.data.isAdmin);
    } catch (error) {
      console.log("error", error);
      setLoggedIn(false);
    }
  };
  // useEffect(async () => {
  //   if (loggedIn === null) {
  //     await checkAuth();
  //   }
  // }, []);
  useEffect(() => {
    async function fetchData() {
      if (loggedIn === null) {
        await checkAuth();
      }
    }
    fetchData();
  });
  if (loggedIn === false) {
    return <Navigate to="/login" />;
  }
  return <div>{props.children}</div>;
};

export default RequireAuth;
