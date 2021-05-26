import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import "../assets/css/form.css";
import AccessKey from "../components/AccessKey";
import Forms from "../components/Form";
import displayMsg from "../components/Message";

const SignUp = () => {
  const [isAuthorized, setisAuthorized] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let emailPattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const handleSignUpSubmit = dataForm => {
    let token = window.localStorage.getItem("token");
    if (dataForm.cvLink === "") {
      displayMsg("error", "Please upload a file first.");
      console.log("Please upload an file first.");
    } else if (!emailPattern.test(dataForm.email)) {
      displayMsg("error", "Enter a valid email");
    } else {
      if (dataForm.skills.length <= 6) {
        // console.log(dataForm);
        fetch("https://tcn-ccg-dt.herokuapp.com/users/signup/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(dataForm),
          redirect: "follow",
        })
          .then(res => res.json())
          .then(json => {
            setIsPending(false);
            console.log(json);
            if (json.status === "Success") {
              localStorage.setItem("userData", JSON.stringify(json.data));
              // displayMsg("success", json.message);
              setTimeout(() => history.push("/questions"), 1300);
            } else {
              displayMsg("error", json.message);
            }
          })
          .catch(error => {
            setIsPending(false);
            displayMsg("error", error.message);
          });
      } else {
        displayMsg("error", "maximum of 6 skills exceeded");
      }
    }
  };

  const showForm = () => setTimeout(() => setisAuthorized(!isAuthorized), 1000);

  return (
    <main className="container align-top margin-top" id="signup">
      {!isAuthorized && <AccessKey showForm={showForm} />}
      {isAuthorized && (
        <Forms
          hide={["username"]}
          data={{
            name: "",
            email: "",
            password: "",
            shortBio: "",
            fullBio: "",
            cvLink: "",
            skills: [],
          }}
          submitData={handleSignUpSubmit}
          url={"h"}
          isPending={isPending}
          btnName="Next"
        />
      )}
    </main>
  );
};

export default SignUp;
