import {Link} from "react-router-dom";
import classes from "./card.module.css";

const Card = () => {
  return (
    <div className={classes.Card}>
      <h3>Ajayi Emmanuel</h3>
      <p>Skill: HTML CSS JAVASCRIPT</p>
      <p>
        Bio: Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
        harum.
      </p>
      <Link to="/user/details">
        <button type="button" className="btn">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default Card;
