import {useState} from "react";
import classes from "./filter.module.css";

const Filter = ({filterUrl}) => {
  const [url, seturl] = useState("https://wiwa.herokuapp.com/users/search/");
  const [searchVal, setsearchVal] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    filterUrl(`${url}${searchVal}`);
    setsearchVal("");
  };
  return (
    <section>
      <form
        onSubmit={e => handleSubmit(e)}
        className={classes.topSearch}
        id="search-title"
      >
        <select
          value={url}
          onChange={e => seturl(e.target.value)}
          name="filterSkill"
          id="filterSkill"
        >
          <option value="https://wiwa.herokuapp.com/users/search/">
            Filter By Name
          </option>
          <option
            required
            value="https://wiwa.herokuapp.com/users/search/skill/"
          >
            Filter By Skill
          </option>
        </select>
        <div className={classes.formGroup}>
          <input
            type="search"
            placeholder="Enter search term..."
            value={searchVal}
            onChange={e => setsearchVal(e.target.value)}
            required
          />
          <button aria-label="Search Topic" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
