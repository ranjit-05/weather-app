import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  // useState — Class 3
  const [query,   setQuery]   = useState("");
  const [city,    setCity]    = useState("Tokyo");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  async function fetchWeather(name) {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Step 1 — geocode city name to coordinates
      const geoRes  = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results?.length) {
        setError(`"${name}" not found — try another city.`);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name: n, country_code } = geoData.results[0];

      // Step 2 — fetch weather (no API key needed)
      const weatherRes  = await fetch(
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,` +
        `wind_speed_10m,weather_code,surface_pressure,cloud_cover` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&forecast_days=7&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData);
      setCity(`${n}, ${country_code.toUpperCase()}`);
    } catch {
      setError("Network error — check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // useEffect — fetch on mount, empty [] = runs once (Class 4)
  useEffect(() => {
    fetchWeather(city);
  }, []);

  function handleSearch() {
    if (query.trim()) fetchWeather(query.trim());
  }

  return (
    <div>
      <p className="app-title">Weather</p>

      {/* SearchBar — controlled input (Class 3) */}
      <SearchBar query={query} onChange={setQuery} onSearch={handleSearch} />

      {/* Error — conditional rendering with && (Class 3) */}
      {error && <div className="error-msg">{error}</div>}

      {/* Loading / Card — conditional rendering with ternary (Class 3) */}
      {loading ? (
        <div className="status-msg">
          <div className="spinner" />
          <span>Fetching weather</span>
        </div>
      ) : (
        weather && <WeatherCard weather={weather} city={city} />
      )}
    </div>
  );
}

export default App;
