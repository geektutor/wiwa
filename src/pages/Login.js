import {useState} from "react";
import "../assets/css/form.css";
import {Link} from "react-router-dom";

const Login = () => {
  const [inputType, setInputType] = useState("password");

  const handlePasswordType = e => {
    e.target.classList.toggle("fa-eye-slash");
    e.target.classList.toggle("fa-eye");
    e.target.classList.contains("fa-eye-slash")
      ? setInputType("text")
      : setInputType("password");
  };

  return (
    <main className="container align-top">
      <form className="login-form">
        <div className="signup-text">
          <h3 className="logo">wiwa</h3>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            required
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <div className="pwd-wrap">
            <input
              type={inputType}
              id="pwd"
              required
              placeholder="Password"
              minLength="6"
            />
            <i
              onClick={e => handlePasswordType(e)}
              className="fas fa-eye view-pwd"
            ></i>
          </div>
        </div>

        <button type="submit" className="btn">
          Login
        </button>
        <p className="bottom-text" id="forgetpwd">
          <Link to="/forgotpwd"> Forgot Password?</Link>
        </p>

        <p className="bottom-text">
          You don't have an account? <Link to="/signup">Sign Up.</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
