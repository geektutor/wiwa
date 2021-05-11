import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";
import displayMsg from "../components/Message";

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
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  const [showModal, setshowModal] = useState(false);
  const [contactLoading, setcontactLoading] = useState(false);
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

  const dataClone = {...userData};
  const handleSignUpSubmit = dataForm => {
    const token = window.localStorage.getItem("token");
    let body = {};
    Object.entries(dataForm).forEach(([key, value]) => {
      if (dataForm[key] !== dataClone[key]) {
        body[key] = dataForm[key];
      }
    });
    if (Object.keys(body).length >= 1) {
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
              JSON.stringify({...userData, ...json.data})
            );
            displayMsg("success", "profile saved");
          } else {
            displayMsg("error", "profile saved");
          }
        })
        .catch(error => {
          setIsLoading(false);
          displayMsg("error", error.message);
        });
    } else {
      return;
    }
  };

  const [contactForm, setcontactForm] = useState({
    title: "",
    message: "",
  });
  const onContactFormChange = e => {
    const {value, name} = e.target;
    setcontactForm({...contactForm, [name]: value});
  };

  const handleContactSubmit = e => {
    e.preventDefault();
    setcontactLoading(true);
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(contactForm),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      redirect: "follow",
    };

    fetch("https://wiwa.herokuapp.com/users/feedback/create", requestOptions)
      .then(response => response.json())
      .then(result => {
        setcontactForm({
          title: "",
          message: "",
        });
        if (result.status === "Success") displayMsg("success", result.message);
        else displayMsg("error", result.message);
      })
      .catch(error => displayMsg("success", error.message))
      .finally(() => setcontactLoading(false));
  };

  return (
    <>
      <Navbar />
      {/* <Loader close={!isPending} /> */}
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
            Email:{" "}
            <a
              className="link"
              href="mailto:johndoe@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.email}
            </a>
          </p>
          <p className="br">
            Skills: &nbsp;
            {userData.skills.map((skill, index) => (
              <span key={index} className="skill">
                {skill}
              </span>
            ))}
          </p>
          <p className="br">Bio: {userData.fullBio}</p>
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
              formData={{
                shortBio: userData.shortBio,
                fullBio: userData.fullBio,
                cvLink: userData.cvLink,
                skills: [],
              }}
              isPending={isLoading}
              submitData={handleSignUpSubmit}
              btnName="Save Profile"
            />
          </div>
          <br />
          <hr />
          <div className="wrap">
            <h3>Contact Support</h3>
            <form onSubmit={e => handleContactSubmit(e)}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Hello To..."
                  required
                  value={contactForm.title}
                  onChange={e => onContactFormChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="f-bio">Leave A Message</label>
                <textarea
                  name="message"
                  required
                  onChange={e => onContactFormChange(e)}
                  value={contactForm.message}
                  placeholder="Enter message...."
                ></textarea>
              </div>
              <button
                className="btn form-btn"
                type="submit"
                disabled={contactLoading}
              >
                {contactLoading ? (
                  <span>
                    <i className="fas fa-circle-notch fa-spin "></i> Loading{" "}
                  </span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </form>
          </div>
          <br />
          <hr />
          <br />
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
