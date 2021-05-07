import Card from "./Card";
import classes from "./card.module.css";

function CardWrap({users}) {
  return (
    <section id="project" className={classes.cardSection}>
      {users.map(user => (
        <Card user={user} key={user.id} />
      ))}
    </section>
  );
}

export default CardWrap;
