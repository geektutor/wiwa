import "./nav.css";

const Navbar = () => {
  return (
    <nav>
      <h2 className="logo">wiwa</h2>
      <ul className="navList">
        <li className="navLink">
          <a href="#f">
            <button className="btn">+ Add Directory</button>
          </a>
        </li>
        <li className="navLink">
          <a href="#f">
            <button className="btn btn-tp">Profile</button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
