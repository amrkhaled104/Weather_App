import "./App.css";
import Header from "./Components/Header";
/*AOS*/
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import ThemeProvider from "./ThemeContext/ThemeContext";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);
  return (
    <ThemeProvider>
      <div className="container">
        <Header
        // units={units}
        // setUnits={setUnits}
        // favorites={favorites}
        // onFavoriteSelect={handleSearch}
        // onRemoveFavorite={removeFavorite}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
