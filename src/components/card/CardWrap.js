import Card from "./Card";
import classes from "./card.module.css";
import NoContent from "../errors/NoContent";

function CardWrap({users}) {
  return (
    <section id="project" className={classes.cardSection}>
      {users.map(user => (
        <Card user={user} key={user.id} />
      ))}
      {users.length === 0 && <NoContent msg="0 Match Found" />}
    </section>
  );
}

export default CardWrap;
