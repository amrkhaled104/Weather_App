import "../Styles/Header.css";
import { useContext } from "react";

// Logos
import darkThemelogo from "../assets/images/logo.svg";
import lightThemeLogo from "../assets/light-theme-images/logo.svg";

import { ThemeContext } from "../ThemeContext/ThemeContext";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo" data-aos="zoom-in">
        <a href="/" aria-label="Weather App Home">
          <img
            src={theme === "dark" ? darkThemelogo : lightThemeLogo}
            alt={theme === "dark" ? "Dark logo" : "Light logo"}
          />
        </a>
      </div>
      <nav
        className="units-dropdown"
        data-aos="zoom-in"
        aria-label="Units selection menu"
      >
        <div className="box-icons">
          {/* Theme Switcher */}
          <ThemeToggle />
        </div>

        <div></div>
      </nav>
    </header>
  );
}
export default Header;
