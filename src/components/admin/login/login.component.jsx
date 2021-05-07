
import "./login.style.scss";
import {Link} from "react-router-dom";
import { useState } from "react";

const LoginAdmin = () => {

    const [open, setOpen] = useState('password')

    const handlePassword=(e)=>{
        e.target.classList.toggle("fa-eye-slash");
        e.target.classList.toggle("fa-eye");
        e.target.classList.contains("fa-eye-slash") ? setOpen("text"): setOpen("password");

    }

  return (
    <main className="container align-top">
      <form className="login-form">
        <div class="signup-text">
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
              type={open}
              id="pwd"
              required
              placeholder="Password"
              minlength="6"
            />
            <i
            //   onClick={e => handlePasswordType(e)}

              onClick={(e)=>{handlePassword(e)}}
            
              className="fas fa-eye view-pwd"
            ></i>
          </div>
        </div>

        <button type="submit" className="btn">
          Login
        </button>
        <p className="bottom-text" id="forgetpwd">
          <Link to="/admin/forgotpwd"> Forgot Password?</Link>
        </p>

      
      </form>
    </main>
  );
};

export default LoginAdmin;
