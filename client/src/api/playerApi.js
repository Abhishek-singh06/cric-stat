import API from './axiosInstance';

export const getPlayers = () => API.get('/players');
export const getPlayerById = (id) => API.get(`/players/${id}`);
export const createPlayer = (data) => API.post('/players', data);
export const updatePlayer = (id, data) => API.put(`/players/${id}`, data);
export const deletePlayer = (id) => API.delete(`/players/${id}`);
