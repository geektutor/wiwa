import CardWrap from "../components/card/CardWrap";
import Filter from "../components/filter/Filter";
import Navbar from "../components/nav/Navbar";

function Main() {
  return (
    <div className="main">
      <Navbar />
      <Filter />
      <CardWrap />
    </div>
  );
}

export default Main;
