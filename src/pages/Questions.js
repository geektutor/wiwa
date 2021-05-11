import {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import displayMsg from "../components/Message";
import {TokenContext} from "../contexts/TokenContext";
import refreshToken from "../hooks/refreshToken";
// import refreshToken from "../hooks/refreshToken";

const Questions = () => {
  const [isPending, setIsPending] = useState(false);
  const {token} = useContext(TokenContext);
  const [questions] = useState({
    0: "What is your mother's maiden name",
    1: "What is the name of your childhood street",
    2: "What is the name of your childhood pet",
    3: "What is your maternal grandmother's maiden name?",
    4: "What is the name of your favorite teacher",
  });
  // const [requestBody, setRequestBody] = useState()
  const [answerFormData, setAnswerFormData] = useState(null);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userData")) || null;

  useEffect(() => {
    let obj = {};
    Object.keys(questions).forEach(el => {
      obj[el] = {
        questionId: el,
        answer: "",
      };
      setAnswerFormData({...obj});
    });
    refreshToken();
  }, [questions]);

  const handleChange = event => {
    const {value, name} = event.target;
    setAnswerFormData({
      ...answerFormData,
      [name]: {
        questionId: name,
        answer: value,
      },
    });
  };

  const onQuestionSubmit = e => {
    e.preventDefault();
    setIsPending(true);

    let body = {};
    let reqBody = {userId: user.id};

    for (let i = 0; i < Object.keys(questions).length; i++) {
      if (answerFormData[i].answer !== "") {
        body[i] = answerFormData[i];
        console.log(body);
      }
    }
    if (Object.keys(body).length > 2 || Object.keys(body).length < 2)
      displayMsg("error", "You can only two questions");
    else {
      Object.entries(body).forEach(([key, value], i) => {
        console.log(`${key} ${value}`);
        reqBody[`question${i + 1}Id`] = body[key].questionId;
        reqBody[`answer${i + 1}`] = body[key].answer;
      });
      console.log(reqBody, body);

      var requestOptions = {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        redirect: "follow",
      };

      fetch("https://wiwa.herokuapp.com/users/signup/questions", requestOptions)
        .then(res => {
          console.log(res);
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
                  history.push("/login");
                  // throw new Error("something went wrong, pls try again");
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
          console.log(json);
          displayMsg(
            "success",
            "registration completed!, login to finally use your acccount"
          );

          setTimeout(() => history.push("/login"), 1500);
        })
        .catch(error => console.log("error", error));
    }
  };
  return (
    <main className="container align-top margin-top">
      <form className="login-form" onSubmit={e => onQuestionSubmit(e)}>
        <div className="signup-text">
          <h3 className="logo">wiwa</h3>
          <p>
            To Complete Your Sign up pls answer these questions. They will be
            used to authenticate you...
          </p>
        </div>
        {answerFormData && (
          <div>
            {Object.entries(questions).map(([key, value], index) => {
              return (
                <div key={key} className="form-group">
                  <label htmlFor={key}>{value}</label>
                  <input
                    type="text"
                    id={key}
                    placeholder="answer..."
                    name={key}
                    onChange={e => {
                      handleChange(e);
                    }}
                    value={answerFormData[key].answer}
                  />
                </div>
              );
            })}
          </div>
        )}

        <button className="btn form-btn" type="submit" disabled={isPending}>
          {isPending ? (
            <span>
              <i className="fas fa-circle-notch fa-spin "></i> Loading{" "}
            </span>
          ) : (
            <span>Complete Registration</span>
          )}
        </button>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login.</Link>
        </p>
      </form>
    </main>
  );
};

export default Questions;
