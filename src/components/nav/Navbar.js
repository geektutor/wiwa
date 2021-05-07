import {Link} from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  return (
    <nav>
      <h2 className="logo">wiwa</h2>
      <ul className="navList">
        <li className="navLink">
          <a href="#f" className="btn">
            + Add
          </a>
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
