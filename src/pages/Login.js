import {useState} from "react";
import "../assets/css/form.css";
import {Link, useHistory} from "react-router-dom";
import displayMsg from "../components/Message";

const Login = () => {
  const [inputType, setInputType] = useState("password");
  const history = useHistory();
  const [isPending, setIsPending] = useState(false);

  const toks = window.localStorage.getItem("token");
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = e => {
    e.preventDefault();
    setFormInput({...formInput, email: "", password: ""});

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
        token: toks,
      },
      redirect: "follow",
    };

    fetch("https://wiwa.herokuapp.com/users/login", requestOptions)
      .then(res => res.json())
      .then(result => {
        setIsPending(false);

        if (result.status === "Success") {
          displayMsg("success", "Login Successful");
          window.localStorage.setItem("token", result.data.token);
          window.localStorage.setItem(
            "userData",
            JSON.stringify(result.data.user)
          );
          window.localStorage.setItem("refToken", result.data.refToken);

          if (result.data.user.isAdmin) {
            setTimeout(() => {
              history.push("/admin");
            }, 200);
          } else {
            setTimeout(() => {
              history.push("/");
            }, 200);
          }
        } else {
          displayMsg("error", result.message);
        }
      })
      .catch(error => {
        setIsPending(false);
        displayMsg("error", error.message);
      });
  };

  const handleChange = event => {
    const {value, name} = event.target;
    setFormInput({...formInput, [name]: value});
  };

  const handlePasswordType = e => {
    e.target.classList.toggle("fa-eye-slash");
    e.target.classList.toggle("fa-eye");
    e.target.classList.contains("fa-eye-slash")
      ? setInputType("text")
      : setInputType("password");
  };

  return (
    <main className="container align-top">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="signup-text">
          <h3 className="logo">wiwa</h3>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            required
            placeholder="johndoe@gmail.com"
            name="email"
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
            <span>Login</span>
          )}
        </button>

        <p className="bottom-text" id="forgetpwd">
          <Link to="/forgotpwd"> Forgot Password?</Link>
        </p>

        <p className="bottom-text">
          You don't have an account? <Link to="/signup">Sign Up.</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
