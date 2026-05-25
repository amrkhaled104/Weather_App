import "../Styles/SearchBar.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
// Icons
import searchIcon from "../assets/images/icon-search.svg";
import searchIconLight from "../assets/light-theme-images/icon-search.svg";

export default function SearchBar() {
  const { theme } = useContext(ThemeContext);
  const { seachVal, setSearchVal } = useState("");
  return (
    <section className="search-Bar">
      <h1 data-aos="fade-down">How&apos;s the sky looking today?</h1>
      <form className="search-bar-form" autoComplete="off">
        <div className="inputs">
          <div className="input-box" data-aos="fade-right">
            <img
              src={theme === "dark" ? searchIcon : searchIconLight}
              alt="search-icon"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search For a Place..."
              value={seachVal}
              onchange={(e) => setSearchVal(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" data-aos="fade-left" className="custom-btn">
          Search
        </button>
      </form>
    </section>
  );
}
