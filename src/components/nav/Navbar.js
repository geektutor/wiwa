import {Link} from "react-router-dom";
import "./nav.css";

const Navbar = () => {
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
          <Link to="/profile" className="btn btn-tp">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
