import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./footer.css";
const Footer = () => {
  const history = useHistory();
  const userData = window.localStorage.getItem("userData");
  const [isloggedIn] = useState(userData ? true : false);

  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login");
  };

  return (
    <footer>
      <div className="right">
        <p>&copy; {new Date().getFullYear()}</p>
        <h1 className="logo logo-white">TCN-CCG-DT</h1>
      </div>
      <div className="left">
        {" "}
        {isloggedIn ? (
          <Link to="" onClick={handleLogout} className="footer-link">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="footer-link">
            Login
          </Link>
        )}{" "}
        <p>|</p>
        <Link to="/contact" className="footer-link">
          Contact Support
        </Link>{" "}
        <p>|</p>
        <Link to="/terms" className="footer-link link-last">
          Terms Of Use
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
