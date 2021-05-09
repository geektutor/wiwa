import {useState, useEffect} from "react";
import displayMsg from "../components/Message";

const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setIsPending(true);
    setData(null);

    fetch(url)
      .then(res => res.json())
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
          setError(err.message);
          displayMsg("error", err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return {data, isPending, error};
};

export default useFetch;
