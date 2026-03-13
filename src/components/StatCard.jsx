import "./StatCard.css";

// Props: icon, label, value, unit
function StatCard({ icon, label, value, unit }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {value}<span className="stat-unit">{unit}</span>
      </div>
    </div>
  );
}

export default StatCard;
