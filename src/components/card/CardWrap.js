import Card from "./Card";
import classes from "./card.module.css";

function CardWrap({data}) {
  return (
    <section id="project" className={classes.cardSection}>
      {/* <div className={classes.cardsWrap}>
        {data.map(el => (
          <Card
            title={el.title}
            src={el.src}
            details={el.details}
            link={el.link}
            key={el.id}
            stack={el.stack}
          >
            {el.githubLink && (
              <a href={el.githubLink}>
                <i className="fab fa-github"></i>
              </a>
            )}
          </Card>
        ))}
      </div> */}
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </section>
  );
}

export default CardWrap;
