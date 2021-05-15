import { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import "./footer.css";
const Footer = () => {
  
  const history = useHistory()
  const token = window.localStorage.getItem("token");
  const [isloggedIn] = useState(token?true:false)
  


  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.setItem("token", '');
    
    history.push('/login')
}



  return (
    <footer>
      <div className="right">
        <p>&copy; {new Date().getFullYear()}</p>
        <h1 className="logo logo-white">wiwa</h1>
      </div>
      <div className="left">
        {" "}
        {isloggedIn ? <Link to="" onClick={handleLogout} className="footer-link">
          Logout
        </Link>  : <Link to="/login" className="footer-link">
          Login
        </Link>  }{" "}
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
