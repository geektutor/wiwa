import CardWrap from "../components/card/CardWrap";
import Filter from "../components/filter/Filter";
import Navbar from "../components/nav/Navbar";

function Main() {
  return (
    <div className="main">
      <div className="main-wrap">
        <Filter />
        <CardWrap />
      </div>
      <Navbar />
      <footer>
        <h1 className="logo logo-white">wiwa</h1>
        <div className="center">
          {" "}
          <a href="#g" className="footer-link">
            Login
          </a>{" "}
          |{" "}
          <a href="#g" className="footer-link">
            Terms Of Use
          </a>
        </div>
        <div className="left">
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;
