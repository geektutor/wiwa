import {Link} from "react-router-dom";
import classes from "./card.module.css";

const Card = ({user}) => {
  return (
    <div className={classes.Card}>
      <h3>{user.name}</h3>
      <p>
        Skill: &nbsp;
        {user.skills.map((skill, index) => (
          <span key={index} className="skill skill-mini">
            {skill}
          </span>
        ))}
      </p>
      <p>Bio: {user.shortBio}</p>
      <Link to={`/user/${user.username}`} className="btn">
        View Details
      </Link>
    </div>
  );
};

export default Card;
