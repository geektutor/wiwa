import {Link} from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  return (
    <nav>
      <h2 className="logo">wiwa</h2>
      <ul className="navList">
        <li className="navLink">
          <a href="#f">
            <button className="btn">+ Add</button>
          </a>
        </li>
        <li className="navLink">
          <Link to="/profile">
            <button className="btn btn-tp">Profile</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
