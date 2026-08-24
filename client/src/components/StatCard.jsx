const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{
          color,
          background: `${color}1f`,
          boxShadow: `0 8px 20px -12px ${color}`,
        }}
      >
        {icon}
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
