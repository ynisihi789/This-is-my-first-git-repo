import React, { useState, useEffect } from 'react';
import { fetchMatches, fetchStandings } from './api';

function SpectatorView() {
    // React State variables to hold data fetched from Django
    const [matches, setMatches] = useState([]);
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
        const getDashboardData = async () => {
            try {
                // Target Tournament ID 1 explicitly
                const activeTournamentId = 2; 
                
                const matchResponse = await fetchMatches(activeTournamentId);
                const standingResponse = await fetchStandings(activeTournamentId);
                
                // Filter the arrays down to make sure we only display items matching our tournament ID
                const tournamentMatches = matchResponse.data.filter(m => m.tournament === activeTournamentId);
                const tournamentStandings = standingResponse.data.filter(s => s.tournament === activeTournamentId);

                setMatches(tournamentMatches);
                setStandings(tournamentStandings);
            } catch (error) {
                console.error("Error communicating with Django server:", error);
            } finally {
                setLoading(false);
            }
        };

        getDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
                <p className="text-xl font-semibold animate-pulse">Loading Live Matrix Boards...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
            {/* Header Block */}
            <header className="mb-10 text-center max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-emerald-400 mb-2">
                    Live Scoreboard & Standings Matrix
                </h1>
                <p className="text-slate-400">Real-time asynchronous tournament tracker</p>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. Live Scores Ticker Column */}
                <section className="lg:col-span-1 space-y-4">
                    <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 text-slate-300">
                        Fixtures & Live Match Statuses
                    </h2>
                    {matches.length === 0 ? (
                        <p className="text-slate-500 italic bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                            No match fixtures generated yet.
                        </p>
                    ) : (
                        matches.map((match) => (
                            <div key={match.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-md">
                                <div className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                                    Round {match.round_number} {match.is_live && <span className="ml-2 text-rose-500 animate-ping">● LIVE</span>}
                                </div>
                                <div className="flex justify-between items-center my-1">
                                    <span className="font-medium text-lg">{match.team1_name}</span>
                                    <span className="text-xl font-bold bg-slate-950 px-3 py-1 rounded text-emerald-400">{match.team1_score}</span>
                                </div>
                                <div className="flex justify-between items-center my-1">
                                    <span className="font-medium text-lg">{match.team2_name}</span>
                                    <span className="text-xl font-bold bg-slate-950 px-3 py-1 rounded text-emerald-400">{match.team2_score}</span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-700/50 text-right">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${match.is_finalized ? 'bg-slate-700 text-slate-300' : 'bg-emerald-950 text-emerald-400'}`}>
                                        {match.is_finalized ? 'Finalized' : 'Match Scheduled'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                {/* 2. Dynamic Standings Matrix Column */}
                <section className="lg:col-span-2 space-y-4">
                    <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 text-slate-300">
                        Dynamic Leaderboard Matrix
                    </h2>
                    <p className="text-xs text-slate-400 italic">Calculation Framework Basis: Win = 3 Pts, Draw = 1 Pt</p>
                    
                    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-4 w-16 text-center">Rank</th>
                                    <th className="p-4">Club Title</th>
                                    <th className="p-4 text-center">P</th>
                                    <th className="p-4 text-center">W</th>
                                    <th className="p-4 text-center">D</th>
                                    <th className="p-4 text-center">L</th>
                                    <th className="p-4 text-center text-emerald-400">Pts</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {standings.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-slate-500 italic">
                                            No teams registered or active standings computed.
                                        </td>
                                    </tr>
                                ) : (
                                    standings.map((row, index) => (
                                        <tr key={row.id} className="hover:bg-slate-700/30 transition-colors">
                                            <td className="p-4 text-center font-bold text-slate-400">{index + 1}</td>
                                            <td className="p-4 font-semibold text-white">{row.team_name}</td>
                                            <td className="p-4 text-center">{row.played}</td>
                                            <td className="p-4 text-center text-emerald-500">{row.won}</td>
                                            <td className="p-4 text-center text-amber-500">{row.drawn}</td>
                                            <td className="p-4 text-center text-rose-500">{row.lost}</td>
                                            <td className="p-4 text-center font-black text-lg text-emerald-400">{row.points}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default SpectatorView;