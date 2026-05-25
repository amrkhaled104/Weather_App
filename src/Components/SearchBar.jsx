import "../Styles/SearchBar.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
// Icons
import searchIcon from "../assets/images/icon-search.svg";
import searchIconLight from "../assets/light-theme-images/icon-search.svg";

import useDebounce from "../hooks/useDebounce";
import SearchSuggestion from "./SearchSuggestion";
export default function SearchBar({ onSearch }) {
  const { theme } = useContext(ThemeContext);
  const [searchVal, setSearchVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedCity = useDebounce(searchVal, 500);
  // --- normalize input ---
  const normalizeInput = (str) => str.replace(/\s+/g, "").trim();
  /*fetch data after debouncing change */
  useEffect(() => {
    const normalized = normalizeInput(debouncedCity);
    if (!normalized) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    async function fetchSuggestions() {
      try {
        const val = encodeURIComponent(normalized);
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${val}&count=5&language=en&format=json`,
        );
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        const results = (data.results || []).map((r) => ({
          name: normalizeInput(r.name),
          country: r.country,
          admin1: r.admin1,
          display: `${r.name}${r.admin1 ? ", " + r.admin1 : ""}${r.country ? ", " + r.country : ""}`,
        }));
        setSuggestions(results);
        setActiveIndex(-1);
      } catch {
        if (!cancelled) setSuggestions([]);
      }
    }
    fetchSuggestions();
    return () => {
      cancelled = true;
    };
  }, [debouncedCity]);

  //  handle select
  const handleSelect = (s) => {
    const normalized = normalizeInput(s.name);
    onSearch(normalized);
    setSearchVal("");
    setSuggestions([]);
    setActiveIndex(-1);
  };
  // --- keyboard navigation (same as before) ---
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };
    // handle submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = normalizeInput(searchVal);
    if (!normalized) return;
    onSearch(normalized);
    setSearchVal("");
    setSuggestions([]);
    setActiveIndex(-1);
  };
  return (
    <section className="search-Bar">
      <h1 data-aos="fade-down">How&apos;s the sky looking today?</h1>
      <form
        className="search-bar-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
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
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <SearchSuggestion
            suggestions={suggestions}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </div>
        <button type="submit" data-aos="fade-left" className="custom-btn">
          Search
        </button>
      </form>
    </section>
  );
}
