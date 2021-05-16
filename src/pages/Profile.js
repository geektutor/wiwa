import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";
import displayMsg from "../components/Message";
import {storage} from "../config";

import {useContext, useEffect, useState} from "react";
// import useFetch from "../hooks/useFetch";
// import Loader from "../components/Loader";
// import ConnectionError from "../components/errors/connectionError";
// import useFetchAdmin from "../hooks/useFetchAdmin";
import Forms from "../components/Form";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {TokenContext} from "../contexts/TokenContext";
import refreshToken from "../hooks/refreshToken";

const Profile = () => {
  const {token} = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  const [showModal, setshowModal] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      refreshToken();
      setUserData(JSON.parse(localStorage.getItem("userData")));
      setshowModal(
        !JSON.parse(localStorage.getItem("userData")).areQuestionsAnswered
      );
    } else {
      history.go(-1);
    }
    return () => {
      setUserData(null);
    };
  }, [history]);

  const handleSignUpSubmit = async dataForm => {
    const dataClone = {...userData};
    // const token = window.localStorage.getItem("token");
    let body = {};
    Object.entries(dataForm).forEach(([key, value]) => {
      if (dataForm[key] !== dataClone[key]) {
        body[key] = dataForm[key];
      }
    });
    if (Object.keys(body).length >= 1) {
      console.log(body);
      if (body.cvLink && !userData.cvLink.includes("cv.com")) {
        const pdfRef = storage.refFromURL(userData.cvLink);
        pdfRef
          .delete()
          .then(() => console.log("file deleted"))
          .catch(err => console.log(err));
        console.log(body);
      }
      if (dataForm.skills.length <= 6) {
        setIsLoading(true);
        fetch(
          `https://wiwa.herokuapp.com/users/edit/${
            JSON.parse(localStorage.getItem("userData")).id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify(body),
            redirect: "follow",
          }
        )
          .then(res => res.json())
          .then(json => {
            console.log(json);
            setIsLoading(false);
            if (json.status === "Success") {
              window.localStorage.setItem(
                "userData",
                JSON.stringify(json.data)
              );
              displayMsg("success", "profile saved");
              setTimeout(() => {
                history.go(0);
              }, 2000);
            } else {
              displayMsg("error", json.message);
            }
          })
          .catch(error => {
            setIsLoading(false);
            displayMsg("error", error.message);
          });
      } else {
        displayMsg("error", "maximum of 6 skills exceeded");
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Navbar />
      {/* {error && <ConnectionError msg={error} />} */}
      {showModal && (
        <div className="questionLink">
          <span
            onClick={() => setshowModal(cur => !cur)}
            className="closeModal"
          >
            x
          </span>
          <p>You still one more crucial stage to complete your signup.</p>
          <Link to="/questions" className="btn btn-tp">
            Complete Registration!
          </Link>
        </div>
      )}
      {userData && (
        <main className="main-wrap details-wrap">
          <h1 className="name">{userData.name}</h1>
          <p className="br">
            <span className="title">Email:</span>
            <a
              className="link"
              href={`mailto:${userData.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.email}
            </a>
          </p>
          <p className="br">
            <span className="title">Skills:</span>
            {userData.skills.map((skill, index) => (
              <span key={index} className="skill">
                {skill}
              </span>
            ))}
          </p>
          <p className="br bio">
            <span className="title">Bio:</span>
            {`${userData.fullBio}`}
          </p>
          <a href={userData.cvLink} className="btn" download>
            Download CV
          </a>
          <br />
          <hr />
          <div className="wrap">
            <h3>
              Edit Profile <i className="fa fa-pen"></i>
            </h3>
            <Forms
              hide={["username", "name", "password", "bt-text", "email"]}
              data={{
                shortBio: userData.shortBio,
                fullBio: userData.fullBio,
                cvLink: userData.cvLink,
                skills: userData.skills,
              }}
              isPending={isLoading}
              submitData={handleSignUpSubmit}
              btnName="Save Profile"
            />
          </div>
          <br />
          <hr />
          <button
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
            style={{width: "100%"}}
            className="btn"
          >
            Log Out
          </button>
        </main>
      )}

      <Footer />
    </>
  );
};

export default Profile;
