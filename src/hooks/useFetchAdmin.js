import {useState, useEffect, useCallback} from "react";
import {useHistory} from "react-router";
import displayMsg from "../components/Message";

const useFetchAdmin = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const token = window.localStorage.getItem("token");

  const retrieveToken = useCallback(() => {
    if (!token) {
      history.push("/login");
    } else {
      return token;
    }
  }, [history, token]);

  useEffect(() => {
    const abortCont = new AbortController();
    setIsPending(true);
    setData(null);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: retrieveToken(),
      },
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then(res => {
        if (res.status === 403) {
          history.push("/login");
        } else if (res.status === 401) {
          return fetch("https://wiwa.herokuapp.com/users/refresh-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              refresh_token: localStorage.getItem("refToken"),
            },
            redirect: "follow",
          })
            .then(response => response.json())
            .then(result => {
              window.localStorage.setItem("token", result.data.token);
              retrieveToken();
              console.log(retrieveToken());
            })
            .catch(error => console.log("error", error));
        } else {
          console.log(res);
          return res.json();
        }
      })
      .then(json => {
        setIsPending(false);
        if (json.status === "Success") {
          setData(json.data);
          setError(null);
        } else {
          setError(json.message);
          displayMsg("error", json.message);
        }
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else if (err.message === "Failed to fetch") {
          setIsPending(false);
          setError(err.message + ", you might want to check your connection");
          displayMsg("error", err.message);
        } else {
          // auto catches network / connection error
          setIsPending(false);
          console.log(err);
          setError(err.message);
          displayMsg("error", err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [retrieveToken, url, history]);

  return {data, isPending, error};
};

export default useFetchAdmin;
