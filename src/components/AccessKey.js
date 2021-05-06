// import "../assets/form.css";
import {useState} from "react";
import displayMsg from "./Message";

const AccessKey = props => {
  const [answer, setAnswer] = useState("");

  const handleAuthSubmit = e => {
    e.preventDefault();
    if (answer.toLowerCase() === "sodiq akinjobi") {
      props.showForm();
      displayMsg("success", "Correct!!");
    } else {
      displayMsg("error", "Wrong Answe");
    }
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
        <label htmlFor="question">What is Geektutor's full name</label>
        <input
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          type="text"
          id="question"
          required
          placeholder="Answer..."
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AccessKey;
