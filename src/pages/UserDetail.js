import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";

const UserDetail = () => {
  return (
    <>
      <Navbar />
      <main className="main-wrap details-wrap">
        <h1 className="name">Ajayi Emmanuel</h1>
        <p className="br">
          Email:{" "}
          <a
            className="link"
            href="mailto:johndoe@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            johndoe@gmail.com
          </a>
        </p>
        <p className="br">
          Skill: <span className="skill">HTML </span>
          <span className="skill">Css </span>
          <span className="skill">Js </span>
        </p>
        <p className="br">
          Bio: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
          perferendis sapiente minima deserunt debitis! Officia.
        </p>
        <a href="#" className="btn" download>
          Download CV
        </a>
      </main>
      <Footer />
    </>
  );
};

export default UserDetail;
