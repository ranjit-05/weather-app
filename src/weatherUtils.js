const WMO = {
  0:  ["Clear Sky",       "☀️"],
  1:  ["Mainly Clear",    "🌤️"],
  2:  ["Partly Cloudy",   "⛅"],
  3:  ["Overcast",        "☁️"],
  45: ["Foggy",           "🌫️"],
  48: ["Rime Fog",        "🌫️"],
  51: ["Light Drizzle",   "🌦️"],
  53: ["Drizzle",         "🌦️"],
  55: ["Heavy Drizzle",   "🌧️"],
  61: ["Light Rain",      "🌧️"],
  63: ["Rain",            "🌧️"],
  65: ["Heavy Rain",      "🌧️"],
  71: ["Light Snow",      "🌨️"],
  73: ["Snow",            "❄️"],
  75: ["Heavy Snow",      "❄️"],
  80: ["Showers",         "🌦️"],
  81: ["Rain Showers",    "🌧️"],
  82: ["Violent Showers", "⛈️"],
  95: ["Thunderstorm",    "⛈️"],
  99: ["Hail Storm",      "⛈️"],
};

export const wmoDesc = (code) => WMO[code]?.[0] ?? "Unknown";
export const wmoIcon = (code) => WMO[code]?.[1] ?? "🌡️";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const dayName = (dateStr) =>
  DAYS[new Date(dateStr + "T00:00:00").getDay()];

// Returns a CSS class name for the hero background based on weather code
export function getHeroBg(code) {
  if ([0, 1].includes(code))                        return "clear";
  if ([2, 3, 45, 48].includes(code))                return "cloudy";
  if ([51,53,55,61,63,65,80,81,82].includes(code))  return "rain";
  if ([71,73,75,77].includes(code))                 return "snow";
  if ([95,96,99].includes(code))                    return "storm";
  return "cloudy";
}
