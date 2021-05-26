import { Link } from "react-router-dom";
import "../assets/css/404.css";
import Navbar from "../components/nav/Navbar";

const Page404 = () => {
  return (
    <>
      <Navbar />
      <div id="notfound">
        <div className="notfound">
          <h1>404</h1>
          <h2>we are sorry, but the page you requested was not found</h2>
          <br />
          <br />
          <Link to="/" class="btn">
            Go Home
          </Link>
          <Link to="/contact" class="btn">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page404;
