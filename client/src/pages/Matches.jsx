import { useEffect, useState } from 'react';
import { getMatches, createMatch, deleteMatch } from '../api/matchApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';

const FORMATS = ['Test', 'ODI', 'T20'];
const initialForm = { team1: '', team2: '', match_date: '', venue: '', format: 'ODI', result: '', winner: '' };

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchMatches = async () => {
    try {
      const res = await getMatches();
      setMatches(res.data.data || []);
    } catch {
      toast.error('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMatches(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createMatch(form);
      toast.success('Match added!');
      setForm(initialForm);
      setShowForm(false);
      fetchMatches();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding match');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this match?')) return;
    try {
      await deleteMatch(id);
      toast.success('Match deleted');
      setMatches(prev => prev.filter(m => m._id !== id));
    } catch {
      toast.error('Failed to delete match');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title"><FaCalendarAlt /> Matches</h1>
          <p className="page-subtitle">Log fixtures across Test, ODI &amp; T20 formats.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> {showForm ? 'Cancel' : 'Add Match'}
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Add New Match</h2>
          <div className="form-grid">
            <input required placeholder="Team 1" value={form.team1} onChange={e => setForm({ ...form, team1: e.target.value })} />
            <input required placeholder="Team 2" value={form.team2} onChange={e => setForm({ ...form, team2: e.target.value })} />
            <input required type="date" value={form.match_date} onChange={e => setForm({ ...form, match_date: e.target.value })} />
            <input placeholder="Venue" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
            <select value={form.format} onChange={e => setForm({ ...form, format: e.target.value })}>
              {FORMATS.map(f => <option key={f}>{f}</option>)}
            </select>
            <input placeholder="Result (e.g. India won by 50 runs)" value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} />
            <input placeholder="Winner" value={form.winner} onChange={e => setForm({ ...form, winner: e.target.value })} />
          </div>
          <button className="btn btn-success" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Match'}
          </button>
        </form>
      )}

      {matches.length === 0 ? (
        <p className="empty-msg">No matches recorded yet.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>#</th><th>Team 1</th><th>Team 2</th><th>Format</th><th>Date</th><th>Venue</th><th>Winner</th><th>Action</th></tr>
          </thead>
          <tbody>
            {matches.map((m, i) => (
              <tr key={m._id}>
                <td>{i + 1}</td>
                <td>{m.team1}</td>
                <td>{m.team2}</td>
                <td><span className={`badge badge-${m.format.toLowerCase()}`}>{m.format}</span></td>
                <td>{m.match_date}</td>
                <td>{m.venue || '—'}</td>
                <td>{m.winner || '—'}</td>
                <td>
                  <button className="btn btn-danger icon-btn" onClick={() => handleDelete(m._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Matches;
