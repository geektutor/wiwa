import { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import displayMsg from "../components/Message";

const ForgotPassword = () => {
  const history = useHistory()
  const [inputType, setInputType] = useState("password");
  const [isPending, setIsPending] = useState(false);

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    answer:""
  });

  const handleSubmit = e => {
    e.preventDefault();
    setFormInput({...formInput, email: "", password: "",answer:""});

    setIsPending(true);

    var raw = {
      email: formInput.email,
      password: formInput.password,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(raw),
      headers: {
        "Content-Type": "application/json",
    
      },
      redirect: "follow",
    };

    fetch("https://wiwa.herokuapp.com/users/forgot-password", requestOptions)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setIsPending(false);

        if (result.status === "Success") {
          displayMsg("success", "changed Successfully");
          setTimeout(() => {
            history.push("/login");
          }, 500);
        } else {
          displayMsg("error", result.message);
        }
      })
      .catch(error => {
        setIsPending(false);
        displayMsg("error", error.message);
      });
  };


  const handlePasswordType = e => {
    e.target.classList.toggle("fa-eye-slash");
    e.target.classList.toggle("fa-eye");
    e.target.classList.contains("fa-eye-slash")
      ? setInputType("text")
      : setInputType("password");
  };

  const handleChange = event => {
   
    const {value, name} = event.target;
    setFormInput({...formInput, [name]: value});
  };



  return (
    <main className="container align-top">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="signup-text">
          <h3 className="logo">wiwa</h3>
          {/* <h4 style={{textAlign: "center"}}>Enter Email Address</h4> */}
          <p style={{fontSize: "1rem", textAlign: "center", color: "black"}}>
            Answer this question and provide the details below
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Who is the leader of your group</label>
          <input
            type="text"
            id="text"
            name="answer"
            required
            placeholder="Answer?"
            value={formInput.answer}
            onChange={e => {
                handleChange(e);
            }}
          />
        </div>


        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="johndoe@gmail.com"
            value={formInput.email}
              onChange={e => {
                handleChange(e);
              }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <div className="pwd-wrap">
            <input
              type={inputType}
              id="pwd"
              required
              placeholder="Password"
              minLength="6"
              name="password"
              value={formInput.password}
              onChange={e => {
                handleChange(e);
              }}
            />
            <i
              onClick={e => handlePasswordType(e)}
              className="fas fa-eye view-pwd"
            ></i>
          </div>
        </div>


        <button className="btn form-btn" type="submit" disabled={isPending}>
          {isPending ? (
            <span>
              <i className="fas fa-circle-notch fa-spin "></i> Loading{" "}
            </span>
          ) : (
            <span>Submit</span>
          )}
        </button>

        <p className="bottom-text">
          Return to <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default ForgotPassword;
