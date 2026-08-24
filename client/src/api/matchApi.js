import API from './axiosInstance';

export const getMatches = () => API.get('/matches');
export const getMatchById = (id) => API.get(`/matches/${id}`);
export const createMatch = (data) => API.post('/matches', data);
export const updateMatch = (id, data) => API.put(`/matches/${id}`, data);
export const deleteMatch = (id) => API.delete(`/matches/${id}`);
