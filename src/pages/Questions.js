import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import displayMsg from "../components/Message";
import {TokenContext} from "../contexts/TokenContext";
// import refreshToken from "../hooks/refreshToken";
// import refreshToken from "../hooks/refreshToken";

const Questions = () => {
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userData"));
  // refreshToken();
  useEffect(() => {
    if (user === null) {
      history.push("/signup");
    }
  }, [history, user]);
  const [questionForm, setquestionForm] = useState({
    question1Id: "0",
    answer1: "",
    question2Id: "1",
    answer2: "",
  });
  // setquestionForm();
  const [disableSelf, setDisableSelf] = useState("0");
  const {token} = useContext(TokenContext);
  const [questions] = useState({
    0: "What is your mother's maiden name",
    1: "What is the name of your childhood street",
    2: "What is the name of your childhood pet",
    3: "What is your maternal grandmother's maiden name?",
    4: "What is the name of your favorite teacher",
  });

  const handleChange = event => {
    const {value, name} = event.target;
    setquestionForm({...questionForm, [name]: value});
    setDisableSelf(value);
  };

  const onQuestionSubmit = e => {
    e.preventDefault();
    setIsPending(true);
    if (questionForm.question2Id === questionForm.question1Id) {
      displayMsg("error", "You can't answer the same question twice");
    } else {
      console.log(questionForm);
      let body = {...questionForm, userId: user.id};
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        redirect: "follow",
      };

      fetch("https://wiwa.herokuapp.com/users/signup/questions", requestOptions)
        .then(res => {
          setIsPending(false);
          if (res.status === 401) {
            return fetch("https://wiwa.herokuapp.com/users/refresh-token", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                refresh_token: localStorage.getItem("refToken"),
              },
              redirect: "follow",
            })
              .then(response => {
                console.log(response);
                if (!response.ok) {
                  history.push("/signup");
                } else {
                  return response.json();
                }
              })
              .then(result => {
                console.log(result.data.token);
                return localStorage.setItem("token", result.data.token);
              })
              .catch(error => {
                console.log("error", error);
                displayMsg(
                  "error",
                  "something went wrong, pls try logging in again"
                );
              });
          } else {
            return res.json();
          }
        })
        .then(json => {
          window.localStorage.setItem("token", json.data);
          if (json.status === "Success") {
            displayMsg(
              "success",
              "registration completed!, login to effect your changes"
            );
            setTimeout(() => history.push("/login"), 1500);
          } else if (json.status === "Failed") {
            displayMsg("error", json.message);
          }
        })
        .catch(error => displayMsg("error", error.message));
    }
  };
  return (
    <main className="container align-top margin-top">
      {questionForm && (
        <form
          className="login-form questions"
          onSubmit={e => onQuestionSubmit(e)}
        >
          <div className="signup-text">
            <h3 className="logo">wiwa</h3>
            <p>
              To Complete your registration pls chose and answer any 2 questions
              for two factor authentication.
            </p>
          </div>
          <div className="questions-wrap">
            <div id="question1" className="question-wrap">
              <label htmlFor="question1">Question 1:</label>
              <select
                id="question1"
                name="question1Id"
                value={questionForm.question1Id}
                onChange={e => {
                  handleChange(e);
                }}
              >
                {Object.entries(questions).map(([key, value], index) => {
                  return (
                    <option
                      disabled={disableSelf === key}
                      key={key}
                      value={key}
                      className="form-group"
                    >
                      {value}
                    </option>
                  );
                })}
              </select>
              <div className="form-group">
                <label>Answer:</label>
                <input
                  type="text"
                  required
                  placeholder="answer..."
                  name="answer1"
                  onChange={e => {
                    handleChange(e);
                  }}
                  value={questionForm.answer1}
                />
              </div>
            </div>
            <div id="question1" className="question-wrap">
              <div className="form-group">
                <label htmlFor="question1">Question 2:</label>
                <select
                  id="question2"
                  name="question2Id"
                  onChange={e => {
                    handleChange(e);
                  }}
                  value={questionForm.question2Id}
                >
                  {Object.entries(questions).map(([key, value], index) => {
                    return (
                      <option
                        key={key}
                        disabled={disableSelf === key}
                        value={key}
                        className="form-group"
                      >
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Answer:</label>
                <input
                  type="text"
                  required
                  placeholder="answer..."
                  name="answer2"
                  onChange={e => {
                    handleChange(e);
                  }}
                  value={questionForm.answer2}
                />
              </div>
            </div>
          </div>

          <button className="btn form-btn" type="submit" disabled={isPending}>
            {isPending ? (
              <span>
                <i className="fas fa-circle-notch fa-spin "></i> Loading{" "}
              </span>
            ) : (
              <span>Complete Registration</span>
            )}
          </button>
        </form>
      )}
    </main>
  );
};

export default Questions;
