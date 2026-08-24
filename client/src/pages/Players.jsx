import { useEffect, useState } from 'react';
import { getPlayers, createPlayer, deletePlayer } from '../api/playerApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaUsers } from 'react-icons/fa';

const ROLES = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];

const initialForm = { name: '', country: '', role: 'Batsman', age: '', image_url: '' };

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchPlayers = async () => {
    try {
      const res = await getPlayers();
      setPlayers(res.data.data || []);
    } catch {
      toast.error('Failed to fetch players');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlayers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createPlayer(form);
      toast.success('Player added!');
      setForm(initialForm);
      setShowForm(false);
      fetchPlayers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding player');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this player?')) return;
    try {
      await deletePlayer(id);
      toast.success('Player deleted');
      setPlayers(prev => prev.filter(p => p._id !== id));
    } catch {
      toast.error('Failed to delete player');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="page-hero-badge">
            <span className="badge-icon">👥</span>
            <span>Player Management</span>
          </div>
          <h1 className="page-hero-title"><FaUsers /> All Players</h1>
          <p className="page-hero-subtitle">Track batsmen, bowlers, all-rounders & keepers. Add, edit, or remove players instantly.</p>
        </div>
        <div className="page-hero-glow" />
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title"><FaUsers /> Players</h1>
          <p className="page-subtitle">Your roster of cricket talent.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> {showForm ? 'Cancel' : 'Add Player'}
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Add New Player</h2>
          <div className="form-grid">
            <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input required placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
            <input type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
            <input placeholder="Image URL (optional)" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
          </div>
          <button className="btn btn-success" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Player'}
          </button>
        </form>
      )}

      {players.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏏</div>
          <h3>No players found</h3>
          <p>Start building your cricket roster. Add your first player above!</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ marginTop: '16px' }}>
            <FaPlus /> Add Player
          </button>
        </div>
      ) : (
        <div className="player-grid">
          {players.map(p => (
            <div className="player-card" key={p._id}>
              <div className="player-avatar">
                {p.image_url ? <img src={p.image_url} alt={p.name} /> : <span>{p.name[0]}</span>}
              </div>
              <div className="player-info">
                <h3>{p.name}</h3>
                <p>{p.country}</p>
                <span className="badge badge-role">{p.role}</span>
                {p.age && <p className="age">Age: {p.age}</p>}
              </div>
              <button className="btn btn-danger icon-btn" onClick={() => handleDelete(p._id)}><FaTrash /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;