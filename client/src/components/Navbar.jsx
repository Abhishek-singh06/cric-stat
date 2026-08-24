import { Link, useLocation } from 'react-router-dom';
import { GiCricketBat } from 'react-icons/gi';
import { FaHome, FaUsers, FaCalendarAlt, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Dashboard', icon: <FaHome /> },
    { to: '/players', label: 'Players', icon: <FaUsers /> },
    { to: '/matches', label: 'Matches', icon: <FaCalendarAlt /> },
    { to: '/stats', label: 'Statistics', icon: <FaChartBar /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-mark">
          <GiCricketBat className="brand-icon" />
        </div>
        <div className="brand-text">
          <b>Cric-Stat</b>
          <span>Score Lab</span>
        </div>
      </div>

      <span className="nav-section-label">Manage</span>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`nav-link ${pathname === link.to ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-footer">
        <span className="live-dot"></span>
        <span>MongoDB connected</span>
      </div>
    </nav>
  );
};

export default Navbar;
