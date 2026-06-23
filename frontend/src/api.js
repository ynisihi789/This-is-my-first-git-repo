import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Pass a tournament ID directly into these endpoints to filter the data
export const fetchMatches = (tournamentId) => API.get(`matches/?tournament=${tournamentId}`);
export const fetchStandings = (tournamentId) => API.get(`standings/?tournament=${tournamentId}`);

export default API;