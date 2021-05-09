import {useState} from "react";
import {Link} from "react-router-dom";
import "../assets/css/form.css";
import AccessKey from "../components/AccessKey";
import displayMsg from "../components/Message";

const SignUp = () => {
  const [inputType, setInputType] = useState("password");
  const [isAuthorized, setisAuthorized] = useState(false);
  const [fileName, setfileName] = useState("No File Chosen");
  const [tempSkill, setTempSkill] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    shortBio: "",
    fullBio: "",
    cvLink: "",
    skills: [],
  });

  // get all form data
  const handleChange = event => {
    const {value, name} = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleSignUpSubmit = e => {
    e.preventDefault();
    if (formData.skills.length > 0) {
      const token = window.localStorage.getItem("token");
      setIsPending(true);

      fetch("https://wiwa.herokuapp.com/users/signup/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData),
        redirect: "follow",
      })
        .then(res => res.json())
        .then(json => {
          console.log(formData);
          setIsPending(false);
          if (json.status === "Success") {
            // window.localStorage.setItem("token", json.data.token);
            displayMsg("success", "Correct Answer");
          } else {
            displayMsg("error", json.message);
          }
        })
        .catch(error => {
          setIsPending(false);
          displayMsg("error", error.message);
        });
    } else {
      displayMsg("error", "Enter a skill");
    }
  };

  const addSkill = e => {
    if (e.key === "," && tempSkill) {
      if (!formData.skills.includes(tempSkill)) {
        let skillsArr = formData.skills;
        skillsArr.push(tempSkill.substr(0, tempSkill.length - 1));
        setFormData({...formData, skills: skillsArr});
      }
      setTempSkill("");
    }
  };
  const deleteSkill = skill => {
    let skillsArr = formData.skills.filter(item => item !== skill);
    setFormData({...formData, skills: skillsArr});
  };

  const handlePasswordType = e => {
    e.target.classList.toggle("fa-eye-slash");
    e.target.classList.toggle("fa-eye");
    e.target.classList.contains("fa-eye-slash")
      ? setInputType("text")
      : setInputType("password");
  };

  const showForm = () => setTimeout(() => setisAuthorized(!isAuthorized), 1000);

  return (
    <main className="container align-top" id="signup">
      {!isAuthorized && <AccessKey showForm={showForm} />}
      {isAuthorized && (
        <form onSubmit={e => handleSignUpSubmit(e)} className="login-form">
          <div className="signup-text">
            <h3 className="logo">wiwa</h3>
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              id="name"
              required
              onChange={e => {
                handleChange(e);
              }}
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              required
              onChange={e => {
                handleChange(e);
              }}
              placeholder="jondoe123"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={e => {
                handleChange(e);
              }}
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="s-bio">Short Bio</label>
            <textarea
              name="shortBio"
              id="s-bio"
              required
              value={formData.shortBio}
              onChange={e => {
                handleChange(e);
              }}
              minLength="10"
              maxLength="100"
              placeholder="Not more than 100 characters..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="f-bio">Full Bio</label>
            <textarea
              name="fullBio"
              id="f-bio"
              value={formData.fullBio}
              onChange={e => {
                handleChange(e);
              }}
              required
              placeholder="Enter bio..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="skills">
              Skills (seperate each skill with a comma "," and click on each
              skill to delete)
            </label>
            <input
              type="text"
              id="skills"
              value={tempSkill}
              onChange={e => setTempSkill(e.target.value)}
              onKeyUp={e => addSkill(e)}
              name="skills"
              placeholder="eg: HTML, SEO, Digital Marketing"
            />
            <div>
              {" "}
              {formData.skills.map(skill => (
                <span
                  onClick={() => deleteSkill(skill)}
                  className="skill"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <div className="pwd-wrap">
              <input
                type={inputType}
                id="pwd"
                required
                onChange={e => {
                  handleChange(e);
                }}
                name="password"
                placeholder="Password"
                minLength="6"
              />
              <i
                onClick={e => handlePasswordType(e)}
                className="fas fa-eye view-pwd"
              ></i>
            </div>
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
              name=""
              hidden
            />
            <br />
            <span className="file-chosen br">
              {fileName !== "No File Chosen" && (
                <i className="fas fa-file-pdf"></i>
              )}{" "}
              {fileName}
            </span>
            <br />
          </div>
          <button className="btn form-btn" type="submit" disabled={isPending}>
            {isPending ? (
              <span>
                <i className="fas fa-circle-notch fa-spin "></i> Loading{" "}
              </span>
            ) : (
              <span>Sign Up</span>
            )}
          </button>

          <p className="bottom-text">
            Already have an account? <Link to="/login">Login.</Link>
          </p>
        </form>
      )}
    </main>
  );
};

export default SignUp;
