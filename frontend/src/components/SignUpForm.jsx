import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box"
import { Avatar, Grid } from "@mui/material";
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
    <Box 
    sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify:"center"
          }}>
    <Grid container spacing={2} justifyContent={"center"}>
    <Grid item justifyItems={"center"}>
      <h2>Sign up</h2>
      </Grid>
      <Grid item justifyItems={"center"} >
    <Avatar sx={{ m: 2, bgcolor: 'limegreen', justifyitems: 'center'}}>
    </Avatar>
    </Grid>
    </Grid>
    <Grid sx={{m: 2, justifyContent: 'center'}}>
    <Grid item>
      <form onSubmit={signUp}>
      <Grid item >
        <input
          type="text"
          name="email"
          value={signUpForm.email}
          placeholder="email"
          onChange={updateSignUpForm}
        />
        </Grid>
        <Grid item >
        <input
          type="password"
          name="password"
          value={signUpForm.password}
          placeholder="password"
          onChange={updateSignUpForm}
        />
        </Grid>
        <button type="submit">SignUp</button>
      </form>
      </Grid>
      </Grid>
      </Box>
    </div>
  );
};

export default SignUpForm;
