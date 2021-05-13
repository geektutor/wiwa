import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";
import {useParams} from "react-router";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ConnectionError from "../components/errors/connectionError";

const UserDetail = () => {
  const {username} = useParams();
  const {data, error, isPending} = useFetch(
    `https://wiwa.herokuapp.com/users/${username}`
  );
  console.log(error);
  return (
    <>
      <Navbar />
      <Loader close={!isPending} />
      {data && data.name && (
        <main className="main-wrap details-wrap">
          <h1 className="name">{data.name}</h1>
          <p className="br">
            <span className="title">Email:</span>
            <a
              className="link"
              href={`mailto:${data.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.email}
            </a>
          </p>
          <p className="br">
            <span className="title">Skills:</span>
            {data.skills.map((skill, index) => (
              <span key={index} className="skill">
                {skill}
              </span>
            ))}
          </p>
          <p className="br bio">
            <span className="title">Bio:</span> {data.fullBio}
          </p>
          <a href={data.cvLink} className="btn" download>
            Download CV
          </a>
        </main>
      )}
      {error && <ConnectionError msg={error} />}
      <Footer />
    </>
  );
};

export default UserDetail;
