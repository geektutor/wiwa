import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../assets/css/form.css";
import displayMsg from "../components/Message";
import {storage} from "../config";

const Forms = props => {
  const {hide, formData, submitData, btnName, isPending} = props;
  const [inputType, setInputType] = useState("password");
  const [tempSkill, setTempSkill] = useState("");
  const [fileLoaded, setfileLoaded] = useState("No file chosen");
  const [formsData, setFormsData] = useState(formData);
  const [cv, setCv] = useState(null);
  const [, setPdf] = useState(null);

  const onFileChange = e => {
    let file = e.target.files;
    if (file.length > 0) {
      if (file.length === 1) {
        setCv(file[0]);
        setfileLoaded(() => "Loading...");
      } else {
        setCv(null);
        return false;
      }
    } else {
      setCv(null);
    }
  };

  // get all form data
  const handleChange = event => {
    const {value, name} = event.target;
    setFormsData({...formsData, [name]: value});
  };

  useEffect(() => {
    const uploadFile = () => {
      if (cv) {
        const storageRef = storage.ref();
        const pdfRef = storageRef.child(cv.name);
        pdfRef.put(cv).then(fAppRef => {
          fAppRef.ref.getDownloadURL().then(url => {
            setPdf(() => url);
            setFormsData(item => {
              return {...item, cvLink: url};
            });
            setfileLoaded(() => cv.name);
            console.log(url);
          });
        });
      }
    };

    uploadFile();
  }, [cv]);

  // submitform
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    if (!formsData.skills.length > 0) {
      displayMsg("error", "Enter a skill");
    } else if (
      formData.skills.some((val, i) => formData.skills.indexOf(val) !== i)
    ) {
      displayMsg("error", "You can't repeat skills");
    } else {
      console.log(formData.skills);
      submitData(formsData); //pass the data to the parent component and run event
    }
  };

  // skills dynamic functionalities
  const addSkill = e => {
    if (e.code === "Comma" && tempSkill !== ",") {
      if (!formsData.skills.includes(tempSkill)) {
        let skillsArr = formsData.skills;
        skillsArr.push(tempSkill.substr(0, tempSkill.length));
        setFormsData({...formsData, skills: skillsArr});
      }
      setTempSkill("");
    }
  };
  // let skillsArr = [...formData.skills];
  // const addSkill = e => {
  //   if (tempSkill) {
  //     let skillsArr = [
  //       ...formData.skills,
  //       ...tempSkill.replace(/\s/g, "").split(","),
  //     ];
  //     setFormsData(items => {
  //       return {...items, skills: [...skillsArr]};
  //     });
  //   }
  //   console.log(formData.skills);
  // };
  const deleteSkill = skill => {
    let skillsArr = formsData.skills.filter(item => item !== skill);
    // setFormsData(item => {
    //   return {...item, skills: skillsArr};
    // });
    setFormsData({...formsData, skills: [...skillsArr]});
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
            <h3 className="logo">wiwa</h3>
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
            <label htmlFor="s-bio">Short Bio</label>
            <textarea
              name="shortBio"
              id="s-bio"
              required
              value={formsData.shortBio}
              onChange={e => {
                handleChange(e);
              }}
              minLength="10"
              maxLength="100"
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
            <label htmlFor="skills">
              Skills (seperate each skill with a comma ", " (comma and space)
              click on each skill to delete)
            </label>
            <div className="pwd-wrap">
              <input
                type="text"
                id="skills"
                value={tempSkill}
                onChange={e => setTempSkill(e.target.value)}
                onKeyDown={e => addSkill(e)}
                name="skills"
                placeholder="eg: HTML, SEO, Digital Marketing"
              />
              {/* <i onClick={addSkill} className="fa fa-plus view-pwd"></i> */}
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
