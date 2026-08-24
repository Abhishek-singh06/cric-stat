import API from './axiosInstance';

export const getStats = () => API.get('/stats');
export const getStatsByPlayer = (playerId) => API.get(`/stats/player/${playerId}`);
export const createStat = (data) => API.post('/stats', data);
export const updateStat = (id, data) => API.put(`/stats/${id}`, data);
export const deleteStat = (id) => API.delete(`/stats/${id}`);
