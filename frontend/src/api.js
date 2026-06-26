import axios from 'axios';
import { API_BASE_URL } from './config';

const API = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Pass a tournament ID directly into these endpoints to filter the data
export const fetchMatches = (tournamentId) => API.get(`matches/?tournament=${tournamentId}`);
export const fetchStandings = (tournamentId) => API.get(`standings/?tournament=${tournamentId}`);

export default API;