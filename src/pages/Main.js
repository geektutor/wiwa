import CardWrap from "../components/card/CardWrap";
import Filter from "../components/filter/Filter";
import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
// import useFetch from "../hooks/useFetch";

function Main() {
  // const {data, error, isLoading} = useFetch("../assets/users.json");
  // console.log(data, error, isLoading);
  return (
    <div className="main">
      <div className="main-wrap">
        <Filter />
        <CardWrap />
      </div>
      <Navbar />
      <Footer />
    </div>
  );
}

export default Main;
