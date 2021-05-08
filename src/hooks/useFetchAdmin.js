import {useState, useEffect, useCallback} from "react";
import { useHistory } from "react-router";
import displayMsg from "../components/Message";

const useFetchAdmin = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory()

  const retrieveToken = useCallback( ()=>{
    const token = window.localStorage.getItem("token")
    
    if (!token) {
        history.push('/login')
      }
      else{
        return(token)
        }
  },[history])

  useEffect(() => {
    const abortCont = new AbortController();
    setIsPending(true);
    setData(null);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': retrieveToken()
        
      },
      redirect: 'follow'
    };
    fetch(url,requestOptions)
      .then(res => {
        if (res.status===401) {
          history.push('/login')
        }
        else{

          if (!res.ok) {
            // error coming back from server
            throw Error("something went wrong");
          }
  
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
  },[retrieveToken, url, history]);

  return {data, isPending, error};
};

export default useFetchAdmin;
