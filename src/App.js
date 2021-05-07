import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/signUp";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ForgotPassword from "./pages/forgotpassWord";
import Otp from "./pages/Otp";
import Profile from "./pages/Profile";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <Router>
      <div
        style={{background: "var(--bg-color)", width: "100vw"}}
        className="App"
      >
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/forgotpwd">
            <ForgotPassword />
          </Route>
          <Route path="/otp">
            <Otp />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/user/details">
            <UserDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
