import {useState} from "react";
import "../assets/form.css";
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
        <div class="signup-text">
          {/* <h1 className="logo">wiwa</h1> */}
          <h3>Login</h3>
        </div>
        <div className="form-group">
          <label htmlFor="email">Username / Email</label>
          <input
            type="text"
            id="email"
            required
            placeholder="Username / Email"
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
              minlength="6"
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
          <a href="./forgetpassword.html"> Forgot Password?</a>
        </p>

        <p className="bottom-text">
          You don't have an account? <Link to="/signup">Login.</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
