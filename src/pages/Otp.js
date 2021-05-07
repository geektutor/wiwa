import {Link} from "react-router-dom";

const Otp = () => {
  return (
    <main className="container align-top">
      <form className="login-form">
        <div className="signup-text">
          <h3 className="logo">wiwa</h3>
          <h4 style={{textAlign: "center"}}>Enter OTP</h4>
        </div>
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="number"
            id="otp"
            required
            placeholder="Enter the otp sent"
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

export default Otp;
