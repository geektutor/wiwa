import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/signUp";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ForgotPassword from "./pages/forgotpassWord";
import Otp from "./pages/Otp";

function App() {
  return (
    <Router>
      <div className="App">
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
