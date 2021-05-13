import {Link} from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="right">
        <p>&copy; {new Date().getFullYear()}</p>
        <h1 className="logo logo-white">wiwa</h1>
      </div>
      <div className="left">
        {" "}
        <Link to="/login" className="footer-link">
          Login
        </Link>{" "}
        <p>|</p>
        <Link to="/contact" className="footer-link">
          Contact Support
        </Link>{" "}
        <p>|</p>
        <a href="#g" className="footer-link link-last">
          Terms Of Use
        </a>
      </div>
    </footer>
  );
};

export default Footer;
