import { wmoIcon, dayName } from "../weatherUtils";
import "./ForecastRow.css";

// Props: dateStr, code, high, low, minLow, maxHigh, isToday
function ForecastRow({ dateStr, code, high, low, minLow, maxHigh, isToday }) {
  const range = maxHigh - minLow || 1;
  const left  = ((low  - minLow) / range) * 100;
  const width = ((high - low)    / range) * 100;

  return (
    <div className="forecast-row">
      <span className={`forecast-day ${isToday ? "today" : ""}`}>
        {isToday ? "Today" : dayName(dateStr)}
      </span>
      <span className="forecast-icon">{wmoIcon(code)}</span>
      <div className="forecast-bar-wrap">
        <div
          className="forecast-bar"
          style={{ left: left + "%", width: Math.max(width, 8) + "%" }}
        />
      </div>
      <div className="forecast-temps">
        <span className="forecast-hi">{Math.round(high)}°</span>
        <span className="forecast-lo">{Math.round(low)}°</span>
      </div>
    </div>
  );
}

export default ForecastRow;
