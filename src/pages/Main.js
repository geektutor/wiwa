import CardWrap from "../components/card/CardWrap";
// import ErrorBoundary from "../components/errors/ErrorBoundary";
import Filter from "../components/filter/Filter";
import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ConnectionError from "../components/errors/connectionError";
import {useState} from "react";

function Main() {
  const [url, setUrl] = useState("https://wiwa.herokuapp.com/users");
  const {data, error, isPending} = useFetch(url);

  const filterHandler = formData => setUrl(formData);
  return (
    <div className="main">
      <Navbar />
      <div className="main-wrap">
        <Loader close={!isPending} />
        <Filter filterUrl={filterHandler} />
        {data && !isPending && <CardWrap users={data} />}
        {error && <ConnectionError />}
      </div>
      <Footer />
    </div>
  );
}

export default Main;
