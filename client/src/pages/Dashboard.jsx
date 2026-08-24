import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import { getPlayers } from '../api/playerApi';
import { getMatches } from '../api/matchApi';
import { FaUsers, FaCalendarAlt, FaTrophy, FaBaseballBall } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, mRes] = await Promise.all([getPlayers(), getMatches()]);
        setPlayers(pRes.data.data || []);
        setMatches(mRes.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  const formatCounts = [
    { format: 'Test', count: matches.filter(m => m.format === 'Test').length },
    { format: 'ODI', count: matches.filter(m => m.format === 'ODI').length },
    { format: 'T20', count: matches.filter(m => m.format === 'T20').length },
  ];

  const formatByKey = (key) => formatCounts.find(f => f.format === key)?.count ?? 0;

  const roleCounts = [
    { role: 'Batsman', count: players.filter(p => p.role === 'Batsman').length },
    { role: 'Bowler', count: players.filter(p => p.role === 'Bowler').length },
    { role: 'All-Rounder', count: players.filter(p => p.role === 'All-Rounder').length },
    { role: 'WK', count: players.filter(p => p.role === 'Wicket-Keeper').length },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title"><GiCricketBat /> Dashboard</h1>
          <p className="page-subtitle">Your cricket universe at a glance — players, matches & performances.</p>
        </div>
      </div>

      <div className="cards-grid">
        <StatCard title="Total Players" value={players.length} icon={<FaUsers />} color="#4CAF50" />
        <StatCard title="Total Matches" value={matches.length} icon={<FaCalendarAlt />} color="#2196F3" />
        <StatCard title="Test Matches" value={formatByKey('Test')} icon={<FaTrophy />} color="#FF9800" />
        <StatCard title="T20 Matches" value={formatByKey('T20')} icon={<FaBaseballBall />} color="#E91E63" />
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <h2>Matches by Format</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={formatCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="format" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2196F3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Players by Role</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={roleCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-section">
        <h2 className="section-title">Recent Matches</h2>
        {matches.slice(0, 5).length === 0 ? (
          <p className="empty-msg">No matches recorded yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Team 1</th><th>Team 2</th><th>Format</th><th>Date</th><th>Winner</th></tr>
            </thead>
            <tbody>
              {matches.slice(0, 5).map(m => (
                <tr key={m._id}>
                  <td>{m.team1}</td>
                  <td>{m.team2}</td>
                  <td><span className={`badge badge-${m.format.toLowerCase()}`}>{m.format}</span></td>
                  <td>{m.match_date}</td>
                  <td>{m.winner || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
