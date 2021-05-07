import {Link} from "react-router-dom";

const ForgotPassword = () => {
  return (
    <main className="container align-top">
      <form className="login-form">
        <div className="signup-text">
          <h3 className="logo">wiwa</h3>
          {/* <h4 style={{textAlign: "center"}}>Enter Email Address</h4> */}
          <p style={{fontSize: "1rem", textAlign: "center", color: "black"}}>
            Enter the email address used for registration
          </p>
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

        <button type="submit" className="btn">
          Submit
        </button>

        <p className="bottom-text">
          Return to <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default ForgotPassword;
