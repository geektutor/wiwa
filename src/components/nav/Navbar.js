import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  const [isLoggedIn, setisLoggedIn] = useState(
    localStorage.getItem("userData") ? true : false
  );
  useEffect(
    () => setisLoggedIn(localStorage.getItem("userData") ? true : false),
    [isLoggedIn]
  );
  return (
    <nav>
      <h2 className="logo">wiwa</h2>
      <ul className="navList">
        <li className="navLink">
          <Link to="/" className="btn">
            Home
          </Link>
        </li>
        <li className="navLink">
          <Link to={isLoggedIn ? "/profile" : "/signup"} className="btn btn-tp">
            {isLoggedIn ? "Profile" : "Signup"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
