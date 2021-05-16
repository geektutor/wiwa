import {useContext, useEffect, useState} from "react";
import {TokenContext} from "../contexts/TokenContext";
import "../assets/css/profile.css";
import displayMsg from "../components/Message";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/footer/Footer";

const ContactSupport = () => {
  const {token} = useContext(TokenContext);
  const [contactLoading, setcontactLoading] = useState(false);
  let email = JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData")).email
    : "";
  const [contactForm, setcontactForm] = useState({
    email,
    title: "",
    message: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

      <main className="main-wrap details-wrap contact">
        <div className="wrap">
          <h1>Contact Support</h1>
          <form onSubmit={e => handleContactSubmit(e)}>
            {!email && (
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={contactForm.email}
                  onChange={e => {
                    onContactFormChange(e);
                  }}
                  placeholder="johndoe@gmail.com"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="title">Subject</label>
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
      </main>
      <Footer />
    </>
  );
};

export default ContactSupport;
