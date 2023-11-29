import { useState } from "react";
import axios from "axios";
import EmployeesPage from "./pages/EmployeePage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LogOutPage from "./pages/LogOutPage";
import RequireAuth from "./components/RequireAuth";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
function App() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul> */}
        {loggedIn && <Link to="/logout">Log out</Link>}
        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <EmployeesPage
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/logout"
            element={
              <LogOutPage setIsAdmin={setIsAdmin} setLoggedIn={setLoggedIn} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
