import {useState} from "react";
import {Link} from "react-router-dom";
import "../assets/form.css";
import AccessKey from "../components/AccessKey";

const SignUp = () => {
  const [inputType, setInputType] = useState("password");
  // const [accessKey, setAccessKey] = useState("");
  const [isAuthorized, setisAuthorized] = useState(false);

  const handlePasswordType = e => {
    e.target.classList.toggle("fa-eye-slash");
    e.target.classList.toggle("fa-eye");
    e.target.classList.contains("fa-eye-slash")
      ? setInputType("text")
      : setInputType("password");
  };

  const showForm = () => setTimeout(() => setisAuthorized(!isAuthorized), 1000);
  return (
    <main className="container align-top" id="signup">
      {!isAuthorized && <AccessKey showForm={showForm} />}
      {isAuthorized && (
        <form className="login-form">
          <div class="signup-text">
            <h3 className="logo">wiwa</h3>
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required placeholder="John Doe" />
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
            <label htmlFor="s-bio">Short Bio</label>
            <textarea
              name="sBio"
              id="s-bio"
              required
              placeholder="Not more than 100 characters..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="f-bio">Full Bio</label>
            <textarea
              name="fBio"
              id="f-bio"
              required
              placeholder="Enter bio..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="skills">
              Skills (seperate each skill with a comma ",")
            </label>
            <input
              type="text"
              id="skills"
              required
              placeholder="eg: HTML, SEO, Digital Marketing"
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
            Sign Up
          </button>

          <p className="bottom-text">
            Already have an account? <Link to="/login">Login.</Link>
          </p>
        </form>
      )}
    </main>
  );
};

export default SignUp;
