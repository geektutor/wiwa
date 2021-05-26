// import "../assets/form.css";
import {useState} from "react";
import {Link} from "react-router-dom";
import displayMsg from "./Message";

const AccessKey = props => {
  const [answer, setAnswer] = useState("");
  const [isPending, setIsPending] = useState(false);

  // event listener
  const handleAuthSubmit = e => {
    e.preventDefault();
    setIsPending(true);

    const requestBody = {
      accessKey: answer,
    };

    fetch("https://tcn-ccg-dt.herokuapp.com/users/signup/secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      redirect: "follow",
    })
      .then(res => res.json())
      .then(json => {
        setIsPending(false);
        console.log(json);
        if (json.status === "Success") {
          props.showForm(); //show sign up form
          window.localStorage.setItem("token", json.data.token);
          displayMsg("success", "Correct Answer");
          props.showForm(); //show sign up form
        } else {
          displayMsg("error", json.message);
        }
      })
      .catch(error => {
        setIsPending(false);
        displayMsg("error", error.message);
      });
  };

  return (
    <form
      onSubmit={e => handleAuthSubmit(e)}
      id="authForm"
      className="login-form"
    >
      <div className="signup-text">
        <h3>Sign Up</h3>
        <p>To continue, answer this question...</p>
      </div>
      <div className="form-group">
        <label htmlFor="question">Who is the leader of your group?</label>
        <input
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          type="text"
          id="question"
          required
          placeholder="Answer..."
        />
        <button className="btn form-btn" type="submit" disabled={isPending}>
          {isPending ? (
            <span>
              <i className="fas fa-circle-notch fa-spin "></i> Loading{" "}
            </span>
          ) : (
            <span>Next</span>
          )}
        </button>
      </div>
      <p className="bottom-text">
        Already have an account? <Link to="/login">Login.</Link>
      </p>
    </form>
  );
};

export default AccessKey;
