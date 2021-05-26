import {useState} from "react";
import {Link} from "react-router-dom";
import "../assets/css/form.css";
import displayMsg from "../components/Message";
import {storage} from "../config";

const Forms = props => {
  const {hide, data, submitData, btnName, isPending} = props;
  const [inputType, setInputType] = useState("password");
  const [tempSkill, setTempSkill] = useState("");
  const [fileLoaded, setfileLoaded] = useState("No file chosen");
  const [formsData, setFormsData] = useState(data);
  const [cv, setCv] = useState(null);
  const [count, setcount] = useState(
    data.shortBio ? 100 - data.shortBio.length : 100
  );
  const [skillCount, setSkillCount]= useState(  data.skills ? 6 - data.skills.length : 6)
  // const [pdf, setPdf] = useState(null);

  const readFile = (evt, file) => {
    let count = evt.target.result.match(/\/Type[\s]*\/Page[^s]/g).length;
    if (count === 1) {
      setCv(file);
      setfileLoaded(file.name);
    } else if (count > 1) {
      setCv(null);
      displayMsg("error", "Only one page is allowed");
      console.log("Only one page is allowed");
    } else {
      setCv(null);
    }
  };
  const onFileChange = e => {
    let reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (function (file) {
      return function (e) {
        readFile(e, file);
      };
    })(e.target.files[0]);
  };

  // get all form data
  const handleChange = event => {
    const {value, name} = event.target;
    if (formsData.shortBio.length >= 99) {
      setFormsData({...formsData, [name]: value, shortBio: formsData.shortBio});
    } else {
      setFormsData({...formsData, [name]: value});
    }
  };

  const uploadFile = async () => {
    if (cv) {
      let name = cv.name.split(".");
      let ref = `${name[0]}${new Date().getTime().toString()}.${
        name[name.length - 1]
      }`;
      console.log(ref);
      localStorage.setItem("cvRef", ref);
      const storageRef = storage.ref();
      const pdfRef = storageRef.child(ref);
      let fileRef = await pdfRef.put(cv);
      let url = await fileRef.ref.getDownloadURL();
      return url;
    }
  };

  // submitform
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formsData.skills.length > 0) {
      displayMsg("error", "Enter a skill");
    } else {
      try {
        if (cv) {
          uploadFile().then(url => {
            setFormsData(items => {
              items.cvLink = url;
              return {...items};
            });
            submitData(formsData); //pass the data to the parent component and run event);
          });
        } else {
          submitData(formsData);
        }
      } catch (error) {
        displayMsg("error", error.message);
      }
    }
  };

  // skills functionality
  const addSkill2 = e => {
    let skillsArr = formsData.skills;
    let pattern = new RegExp(/^[a-zA-Z ]+$/);
    if (skillCount <= 0) {
      displayMsg("error", "maximum of 6 can be added");
      setTempSkill("");
    }
    else if (!skillsArr.includes(tempSkill) && pattern.test(tempSkill)) {
      skillsArr.push(tempSkill);
      setFormsData(items => {
        return {...items, skills: [...skillsArr]};
      });
    } else {
      setTempSkill("");
      return;
    }
    setTempSkill("");
  };

  const deleteSkill = skill => {
    let skillsArr = formsData.skills.filter(item => item !== skill);
    setFormsData({...formsData, skills: [...skillsArr]});
    setSkillCount(6 - skillsArr.length)
  };

  // toggle password type
  const handlePasswordType = e => {
    e.target.classList.toggle("fa-eye-slash");
    e.target.classList.toggle("fa-eye");
    e.target.classList.contains("fa-eye-slash")
      ? setInputType("text")
      : setInputType("password");
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className="login-form">
        {!hide.includes("bt-text") && (
          <div className="signup-text">
            <h3 className="logo">TCN-CCG-DT</h3>
          </div>
        )}
        {!hide.includes("name") && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              value={formsData.name}
              id="name"
              required
              onChange={e => {
                handleChange(e);
              }}
              placeholder="John Doe"
            />
          </div>
        )}
        {!hide.includes("username") && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formsData.username}
              required
              onChange={e => {
                handleChange(e);
              }}
              placeholder="jondoe123"
            />
          </div>
        )}
        {!hide.includes("email") && (
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formsData.email}
              onChange={e => {
                handleChange(e);
              }}
              placeholder="johndoe@gmail.com"
            />
          </div>
        )}
        {!hide.includes("shortBio") && (
          <div className="form-group">
            <label htmlFor="s-bio" id="sBioCount" className="countInputLabel">
              <span>Short Bio</span>{" "}
              <span
                style={
                  count > 15 ? {background: "#46e046"} : {background: "red"}
                }
                className="count"
              >
                {count}
              </span>
            </label>
            <textarea
              name="shortBio"
              id="s-bio"
              required
              value={formsData.shortBio}
              onChange={e => {
                handleChange(e);
                let cnt = 100 - e.target.value.length;
                setcount(cnt);
              }}
              minLength="10"
              // maxLength="100"
              placeholder="Not more than 100 characters..."
            ></textarea>
          </div>
        )}
        {!hide.includes("fullBio") && (
          <div className="form-group">
            <label htmlFor="f-bio">Full Bio</label>
            <textarea
              name="fullBio"
              id="f-bio"
              value={formsData.fullBio}
              onChange={e => {
                handleChange(e);
              }}
              required
              placeholder="Enter bio..."
            ></textarea>
          </div>
        )}
        {!hide.includes("skills") && (
          <div className="form-group">
            <label style={{fontSize: "0.9rem"}} htmlFor="skills"  className="countInputLabel">
              Skills (click "+" to add a new skill, and click on each skill to delete), 
              <span
                style={
                  {background:skillCount > 0 ? "#46e046": "red"}
                  
                }
                className="count"
              >
                {skillCount}
              </span>
            </label>
          <span style={{fontSize: "0.7rem", margin:".5rem .7rem 0 0", color:"red"}} >maximum of 6 skills are allowed</span>
            <div className="pwd-wrap">
              <input
                type="text"
                id="skills"
                value={tempSkill}
                onChange={e => setTempSkill(e.target.value)}
                // onKeyDown={e => addSkill(e)}
                name="skills"
                placeholder="eg: HTML, SEO, Digital Marketing"
              />
              <i onClick={() => {
                addSkill2()
                let cnt = 6 - formsData.skills.length;
                setSkillCount(cnt);
              }} className="fa fa-plus view-pwd"></i>
            </div>
            <div>
              {" "}
              {formsData.skills.map((skill, i) => (
                <span
                  onClick={() => deleteSkill(skill)}
                  className="skill"
                  key={i}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {!hide.includes("password") && (
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
        )}
        {!hide.includes("cvLink") && (
          <div className="form-group">
            <p>Upload CV in pdf format (must not be more than one page)</p>
            <label className="file-upload" htmlFor="cv">
              <div className="upload-wrap">
                <h1>+</h1>
                <p>Click To Upload CV</p>
              </div>
            </label>
            <input
              value=""
              onChange={e => onFileChange(e)}
              type="file"
              name="cvLink"
              accept=".pdf"
              id="cv"
              hidden
            />
            <br />
            <div className="file-chosen br">
              {fileLoaded !== "No File chosen" ? (
                <div>
                  <span>
                    <i className="fas fa-file-pdf"></i> {fileLoaded}
                  </span>
                </div>
              ) : (
                <span>No file chosen</span>
              )}
            </div>
          </div>
        )}
        <button className="btn form-btn" type="submit" disabled={isPending}>
          {isPending ? (
            <span>
              <i className="fas fa-circle-notch fa-spin "></i> Loading{" "}
            </span>
          ) : (
            <span>{btnName}</span>
          )}
        </button>

        {!hide.includes("bt-text") && (
          <p className="bottom-text">
            Already have an account? <Link to="/login">Login.</Link>
          </p>
        )}
      </form>
    </>
  );
};

export default Forms;
