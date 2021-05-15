import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";
import classes from "../assets/css/tnc.module.css";
import {Link} from "react-router-dom";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <main className={`${classes.tnc} main-wrap details-wrap`}>
        <div>
          <div className={classes.privacyLinks}>
            <Link to="/tnc">Terms And Conditions</Link>
            <Link className={classes.active} to="/privacy">
              Privacy Policy
            </Link>
          </div>
          <hr />
          <br />
          <h1 className="name">Privacy Policy</h1>

          <p>
            Wiwa respects and protects your privacy, we take serious and
            necessary steps and measures to secure all your information. We have
            outlined the information we request from and hold about you and how
            we use them below:
          </p>
          <ol type="I">
            <li>
              <b>Provided Information:</b>
              <p>On sign up, we request the following information from you:</p>
              <ol type="a">
                <li>XYZ</li>
                <li>XYZ</li>
              </ol>
            </li>
            <li>
              <b> Browser Information: </b>
              <p>
                This includes your IP address, browser type and version, time
                spent on our platform, and other information that your browser
                send while you use or access our platform and services.
              </p>
            </li>
            <li>
              <b>Tracking and Cookies Data</b>
            </li>
          </ol>
          <br />
          <h3 className="name"> How We Use Them </h3>
          <p>We use these information to:</p>
          <ol>
            <li>Create your account</li>
            <li>Personalize our User’s experience.</li>
            <li>Provide traffic report</li>
            <li>xyz</li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
