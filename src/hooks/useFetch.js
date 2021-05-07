import {useState, useEffect} from "react";
import displayMsg from "../components/Message";

const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, {signal: abortCont.signal})
        .then(res => {
          if (!res.ok) {
            // error coming back from server
            throw Error("something went wrong, check your netowrk");
          }
          return res.json();
        })
        .then(json => {
          if (json.status === "Success") {
            setIsPending(false);
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
            setError(err.message);
            displayMsg("error", err.message);
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return {data, isPending, error};
};

export default useFetch;
