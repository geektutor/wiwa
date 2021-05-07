import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";
import {useParams} from "react-router";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ConnectionError from "../components/errors/connectionError";

const UserDetail = () => {
  const {id} = useParams();
  const {data, error, isPending} = useFetch(
    `https://wiwa.herokuapp.com/users/${id}`
  );
  console.log(data);
  return (
    <>
      <Navbar />
      <Loader close={!isPending} />
      {data && data.name && (
        <main className="main-wrap details-wrap">
          <h1 className="name">{data.name}</h1>
          <p className="br">
            Email:{" "}
            <a
              className="link"
              href="mailto:johndoe@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.email}
            </a>
          </p>
          <p className="br">
            Skill:
            {data.skills.map((skill, index) => (
              <span key={index} className="skill">
                {skill}
              </span>
            ))}
          </p>
          <p className="br">Bio: {data.fullBio}</p>
          <a href={data.cvLink} className="btn" download>
            Download CV
          </a>
        </main>
      )}
      {error && <ConnectionError />}
      <Footer />
    </>
  );
};

export default UserDetail;
