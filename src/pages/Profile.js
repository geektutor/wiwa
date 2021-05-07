import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";
// import {Link} from "react-router-dom";
import {useState} from "react";
const Profile = () => {
  const [fileName, setfileName] = useState("No File Chosen");
  //   var ext = fileName.split('.').reverse()[0]
  return (
    <>
      <Navbar />
      <main className="main-wrap details-wrap">
        <h1 className="name">Ajayi Emmanuel</h1>

        <p className="br">
          Skill: <span className="skill">HTML </span>
          <span className="skill">Css </span>
          <span className="skill">Js </span>
        </p>

        <p className="br">
          Bio: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
          perferendis sapiente minima deserunt debitis! Officia.
        </p>
        <br />
        <hr />
        <div className="wrap">
          <h3>
            Edit Profile <i className="fa fa-pen"></i>
          </h3>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                required
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="s-bio">Short Bio</label>
              <textarea
                name="sBio"
                id="s-bio"
                required
                placeholder="Not more than 100 characters..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="f-bio">Full Bio</label>
              <textarea
                name="fBio"
                id="f-bio"
                required
                placeholder="Enter bio..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="skills">
                Skills (seperate each skill with a comma ",")
              </label>
              <input
                type="text"
                id="skills"
                required
                placeholder="eg: HTML, SEO, Digital Marketing"
              />
            </div>
            <div className="form-group">
              <p>Upload CV in pdf format (must not be more than one page)</p>
              <label className="file-upload" htmlFor="cv">
                <div className="upload-wrap">
                  <h1>+</h1>
                  <p>Click To Upload CV</p>
                </div>
              </label>
              <input
                onChange={e => setfileName(e.target.files[0].name)}
                type="file"
                id="cv"
                required
                hidden
              />

              <span className="file-chosen br">
                {fileName !== "No File Chosen" && (
                  <i
                    style={{color: "var(--primary-color)"}}
                    className="fas fa-file-pdf"
                  ></i>
                )}{" "}
                {fileName}
              </span>
            </div>
            <button type="submit" className="btn">
              Save
            </button>
          </form>
        </div>
        <br />
        <hr />
        <div className="wrap">
          <h3>Contact Support</h3>
          <form>
            <div className="form-group">
              <label htmlFor="f-bio">Leave A Message For An Admin</label>
              <textarea
                name="fBio"
                id="f-bio"
                required
                placeholder="Enter message...."
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
        <br />
        <hr />
        <br />
        <button style={{width: "100%"}} className="btn">
          Log Out
        </button>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
