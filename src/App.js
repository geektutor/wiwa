import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/signUp";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ForgotPassword from "./pages/forgotpassWord";
import Otp from "./pages/Otp";
import UserList from "./components/admin/user-list/user-list.component";
import UserProfile from "./components/admin/user-profile/user-profile.component";
import Support from "./components/admin/support/support.component";
import SupportProfile from "./components/admin/support-message/support-message.component";
import Settings from "./components/admin/settings/settings.component";
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
          
          <Route exact path="/admin">
            <UserList/>
          </Route>
          <Route path="/admin/userprofile">
            <UserProfile/>
          </Route>
          <Route exact path="/admin/support">
            <Support/>
          </Route>
          <Route path="/admin/supportmessage">
            <SupportProfile/>
          </Route>
          <Route path="/admin/settings" >
            <Settings/>
          </Route>
         
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/user/details/:id">
            <UserDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
