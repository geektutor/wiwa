import displayMsg from "../components/Message";

export default function refreshToken() {
  if (localStorage.getItem("refToken")) {
    let token;
    fetch("https://wiwa.herokuapp.com/users/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        refresh_token: localStorage.getItem("refToken"),
      },
      redirect: "follow",
    })
      .then(response => {
        if (!response.ok) {
          // console.log(response)
          return;
        } else {
          return response.json();
        }
      })
      .then(result => {
        window.localStorage.setItem("token", result.data.token);
        token = window.localStorage.setItem("token", result.data.token);
      })
      .catch(error => {
        console.log("error", error);
        displayMsg("error", "something went wrong, pls try logging in again");
      });
    return token;
  }
}
