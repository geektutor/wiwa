import classes from "./filter.module.css";

const Filter = () => {
  return (
    <section className={classes.topSearch}>
      <form className={classes.formGroup} id="search-title">
        <input type="search" placeholder="Search..." required />
        <button aria-label="Search Topic" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <select name="filterSkill" id="filterSkill">
        <option value="">Filter</option>
        <option required value="html">
          HTML
        </option>
        <option required value="html">
          HTML
        </option>
        <option required value="html">
          HTML
        </option>
      </select>
    </section>
  );
};

export default Filter;
