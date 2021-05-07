import {useState} from "react";
import {Link} from "react-router-dom";
import "../assets/css/form.css";
import AccessKey from "../components/AccessKey";

const SignUp = () => {
  const [inputType, setInputType] = useState("password");
  // const [accessKey, setAccessKey] = useState("");
  const [isAuthorized, setisAuthorized] = useState(false);
  const [fileName, setfileName] = useState("No File Chosen");

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
          <div className="form-group">
            <p>Upload CV in pdf format (must not be more than one page)</p>
            <label className="file-upload" htmlFor="cv">
              <div className="upload-wrap">
                <h1>+</h1>
                <p>Click To Upload CV</p>
              </div>
            </label>
            <input
              onChange={e => setfileName(e.target.files[0].name)}
              type="file"
              id="cv"
              required
              hidden
            />
            <br />
            <span className="file-chosen br">
              {fileName !== "No File Chosen" && (
                <i className="fas fa-file-pdf"></i>
              )}{" "}
              {fileName}
            </span>
            <br />
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
