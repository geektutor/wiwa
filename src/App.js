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
import {TokenProvider} from "./contexts/TokenContext";
import Questions from "./pages/Questions";
import ContactSupport from "./pages/contactSupport";
// import {storage} from "./config";

function App() {
  return (
    <Router>
      <TokenProvider>
        <div
          style={{
            background: "var(--bg-color)",
            width: "100vw",
          }}
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
              <UserList />
            </Route>
            <Route path="/admin/userprofile/:id">
              <UserProfile />
            </Route>
            <Route exact path="/admin/support">
              <Support />
            </Route>
            <Route path="/admin/supportmessage/:id">
              <SupportProfile />
            </Route>
            <Route path="/admin/settings">
              <Settings />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/user/:username">
              <UserDetail />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/contact">
              <ContactSupport />
            </Route>
          </Switch>
        </div>
      </TokenProvider>
    </Router>
  );
}
require("dotenv").config();
export default App;
