import { wmoDesc, wmoIcon, getHeroBg } from "../weatherUtils";
import StatCard from "./StatCard";
import ForecastRow from "./ForecastRow";
import "./WeatherCard.css";

// Props: weather (API response object), city (string)
function WeatherCard({ weather, city }) {
  const cur   = weather.current;
  const daily = weather.daily;

  const minLow  = Math.min(...daily.temperature_2m_min);
  const maxHigh = Math.max(...daily.temperature_2m_max);

  // Stats data array — rendered with .map() + key (Class 4)
  const stats = [
    { icon: "💧", label: "Humidity",    value: cur.relative_humidity_2m,         unit: "%" },
    { icon: "💨", label: "Wind",        value: Math.round(cur.wind_speed_10m),    unit: " km/h" },
    { icon: "☁️",  label: "Cloud Cover", value: cur.cloud_cover,                   unit: "%" },
    { icon: "🌡️", label: "Pressure",    value: Math.round(cur.surface_pressure),  unit: " hPa" },
  ];

  const heroBgClass = getHeroBg(cur.weather_code);

  return (
    <div className="weather-card">

      {/* ── Hero ── */}
      <div className="card-hero">
        <div className={`hero-bg ${heroBgClass}`} />

        <div className="hero-content">
          <div className="hero-top-row">
            <div>
              <div className="city-name">{city}</div>
              <div className="condition-text">{wmoDesc(cur.weather_code)}</div>
            </div>
            <div className="weather-icon-big">{wmoIcon(cur.weather_code)}</div>
          </div>

          <div className="hero-bottom-row">
            <div className="temp-main">
              {Math.round(cur.temperature_2m)}<sup>°C</sup>
            </div>
            <div className="temp-feels">
              Feels like<br />{Math.round(cur.apparent_temperature)}°C
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats — list rendering with .map() + key (Class 4) ── */}
      <div className="card-stats">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            icon={s.icon}
            label={s.label}
            value={s.value}
            unit={s.unit}
          />
        ))}
      </div>

      {/* ── 7-day Forecast — list rendering with .map() + key (Class 4) ── */}
      <div className="card-forecast">
        <div className="forecast-heading">7-day forecast</div>
        {daily.time.map((dateStr, i) => (
          <ForecastRow
            key={dateStr}
            dateStr={dateStr}
            code={daily.weather_code[i]}
            high={daily.temperature_2m_max[i]}
            low={daily.temperature_2m_min[i]}
            minLow={minLow}
            maxHigh={maxHigh}
            isToday={i === 0}
          />
        ))}
      </div>

    </div>
  );
}

export default WeatherCard;
