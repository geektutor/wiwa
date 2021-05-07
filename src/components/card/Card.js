import {Link} from "react-router-dom";
import classes from "./card.module.css";

const Card = ({user}) => {
  return (
    <div className={classes.Card}>
      <h3>{user.name}</h3>
      <p>
        Skill:
        {user.skills.map((skill, index) => (
          <span key={index} className="skill">
            {skill}
          </span>
        ))}
      </p>
      <p>Bio: {user.shortBio}</p>
      <Link to={`/user/details/${user.id}`} className="btn">
        View Details
      </Link>
    </div>
  );
};

export default Card;
