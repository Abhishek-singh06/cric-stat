import { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerApi';
import { getMatches } from '../api/matchApi';
import { getStats, createStat, deleteStat } from '../api/statApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaChartBar } from 'react-icons/fa';

const initialForm = {
  player_id: '', match_id: '', runs: 0, balls_faced: 0,
  fours: 0, sixes: 0, wickets: 0, overs_bowled: 0,
  runs_conceded: 0, catches: 0, is_out: false,
};

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchAll = async () => {
    try {
      const [sRes, pRes, mRes] = await Promise.all([
        getStats(),
        getPlayers(),
        getMatches(),
      ]);
      setStats(sRes.data.data || []);
      setPlayers(pRes.data.data || []);
      setMatches(mRes.data.data || []);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createStat(form);
      toast.success('Stat entry added!');
      setForm(initialForm);
      setShowForm(false);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding stat');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this stat?')) return;
    try {
      await deleteStat(id);
      toast.success('Stat deleted');
      setStats(prev => prev.filter(s => s._id !== id));
    } catch {
      toast.error('Failed to delete stat');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title"><FaChartBar /> Statistics</h1>
          <p className="page-subtitle">Record per-match batting &amp; bowling performances.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> {showForm ? 'Cancel' : 'Add Stat'}
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Add Match Performance</h2>
          <div className="form-grid">
            <select required value={form.player_id} onChange={e => setForm({ ...form, player_id: e.target.value })}>
              <option value="">-- Select Player --</option>
              {players.map(p => <option key={p._id} value={p._id}>{p.name} ({p.country})</option>)}
            </select>
            <select required value={form.match_id} onChange={e => setForm({ ...form, match_id: e.target.value })}>
              <option value="">-- Select Match --</option>
              {matches.map(m => <option key={m._id} value={m._id}>{m.team1} vs {m.team2} ({m.format} - {m.match_date})</option>)}
            </select>

            {[
              ['Runs', 'runs'], ['Balls Faced', 'balls_faced'], ['Fours', 'fours'],
              ['Sixes', 'sixes'], ['Wickets', 'wickets'], ['Overs Bowled', 'overs_bowled'],
              ['Runs Conceded', 'runs_conceded'], ['Catches', 'catches'],
            ].map(([label, key]) => (
              <div key={key} className="form-field">
                <label>{label}</label>
                <input type="number" min="0" step={key === 'overs_bowled' ? '0.1' : '1'}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: parseFloat(e.target.value) || 0 })}
                />
              </div>
            ))}

            <div className="form-field checkbox-field">
              <label>
                <input type="checkbox" checked={form.is_out}
                  onChange={e => setForm({ ...form, is_out: e.target.checked })} />
                &nbsp; Player got out
              </label>
            </div>
          </div>
          <button className="btn btn-success" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Stat'}
          </button>
        </form>
      )}

      {stats.length === 0 ? (
        <p className="empty-msg">No statistics recorded yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Player</th><th>Match</th><th>Format</th>
                <th>Runs</th><th>Balls</th><th>4s</th><th>6s</th>
                <th>Wkts</th><th>Overs</th><th>RC</th><th>Catches</th><th>Out?</th><th>Del</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(s => (
                <tr key={s._id}>
                  <td>{s.player_id?.name || '—'}</td>
                  <td>{s.match_id ? `${s.match_id.team1} vs ${s.match_id.team2}` : '—'}</td>
                  <td><span className={`badge badge-${s.match_id?.format?.toLowerCase()}`}>{s.match_id?.format}</span></td>
                  <td>{s.runs}</td>
                  <td>{s.balls_faced}</td>
                  <td>{s.fours}</td>
                  <td>{s.sixes}</td>
                  <td>{s.wickets}</td>
                  <td>{s.overs_bowled}</td>
                  <td>{s.runs_conceded}</td>
                  <td>{s.catches}</td>
                  <td>{s.is_out ? '✅' : '❌'}</td>
                  <td><button className="btn btn-danger icon-btn" onClick={() => handleDelete(s._id)}><FaTrash /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Statistics;
