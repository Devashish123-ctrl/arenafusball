
import React, { useState, useEffect } from 'react';
import db from '../firebase';
import { doc, getDoc} from "firebase/firestore";

import { collection, query, where, getDocs } from "firebase/firestore";
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Trophy, Calendar, ArrowLeft, ArrowRight, CircleDot, Goal } from 'lucide-react';

const PlayerData = () => {
  const [playerData, setPlayerData] = useState(getMockPlayerData());

  const location = useLocation();
  const { playerName} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerByName = async () => {
      console.log('i am working')
      console.log(decodeURIComponent(playerName))
      if (!decodeURIComponent(playerName)) {
        console.warn('No player name provided');
        setPlayerData(getMockPlayerData());
        setLoading(false);
        return;
      }

      try {
        const playerRef = doc(db, "players", decodeURIComponent(playerName)); // Fetch by document ID
        const snapshot = await getDoc(playerRef);
        if (!snapshot.empty) {
          const data = snapshot.data();
          console.log(data)
          setPlayerData(data);
        } else {
          console.warn('Player not found, using mock data');
          setPlayerData(getMockPlayerData());
        }
      } catch (error) {
        console.error('Error fetching player:', error);
        setPlayerData(getMockPlayerData());
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerByName();
  }, [playerName]);



  const { playerId } = useParams();
  const [activeTab, setActiveTab] = useState('total'); // 'total' or 'per90'
  
  // Use location state if available, otherwise use mock data
  
  // Stats for Radar Chart

  const radarData = [
    { stat: 'Pace', value: playerData.stats.pace },
    { stat: 'Shooting', value: playerData.stats.shooting },
    { stat: 'Passing', value: playerData.stats.passing },
    { stat: 'Dribbling', value: playerData.stats.dribbling },
    { stat: 'Defending', value: playerData.stats.defending },
    { stat: 'Physical', value: playerData.stats.physical },
  ];

  // Stats for Bar Chart
  const barData = [
    { name: 'Goals', value: playerData.seasonStats.goals },
    { name: 'Assists', value: playerData.seasonStats.assists },
    { name: 'Games', value: playerData.seasonStats.games },
    { name: 'Yellow Cards', value: playerData.seasonStats.yellowCards },
    { name: 'Red Cards', value: playerData.seasonStats.redCards },
  ];

  // Shot map data
  const shotMapData = playerData.shotMap.map(shot => ({
    x: shot.x,
    y: shot.y,
    z: shot.isGoal ? 10 : 5,
    isGoal: shot.isGoal,
    shotType: shot.shotType,
    situation: shot.situation,
    xG: shot.xG,
    result: shot.result
  }));

  // Filter types for shot map
  const shotFilters = [
    { name: 'Goals', value: '11' },
    { name: 'Regular play', value: '59' },
    { name: 'Fast break', value: '4' },
    { name: 'From corner', value: '4' },
    { name: 'Penalty', value: '3' },
    { name: 'Set piece', value: '1' },
    { name: 'Right foot', value: '49' },
    { name: 'Left foot', value: '18' },
    { name: 'Header', value: '4' },
    { name: 'Shots inside box', value: '50' },
    { name: 'Shots outside box', value: '21' },
  ];

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-logo">PPA</div>
          Player Pulse Arena
        </Link>
        <div className="navbar-links">
          <Link to="/new-players" className="navbar-link">New Players</Link>
          <Link to="/about-us" className="navbar-link">About Us</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="app-container">
        <div className="player-profile">
          {/* Player Header Section - Styled like the reference image */}
          <div className="player-header-modern">
            <div className="player-header-bg">
              <div className="player-header-content">
                <div className="player-header-top">
                  <div className="player-photo-container">
                    <img src={playerData.photo} alt={playerData.name} className="player-photo-modern" />
                  </div>
                  <div className="player-info-primary">
                    <h1 className="player-name-modern">{playerData.name}</h1>
                    <div className="player-team-modern">
                      <img src={playerData.teamLogo} alt={playerData.team} className="team-logo-modern" />
                      <span>{playerData.team}</span>
                    </div>
                    <button className="follow-button">Follow</button>
                  </div>
                </div>

                <div className="player-stats-grid">
                  <div className="player-stat-item">
                    <div className="stat-value">{playerData.height}</div>
                    <div className="stat-label">Height</div>
                  </div>
                  <div className="player-stat-item">
                    <div className="stat-value">{playerData.jerseyNumber}</div>
                    <div className="stat-label">Shirt</div>
                  </div>
                  <div className="player-stat-item">
                    <div className="stat-value">{playerData.age} years</div>
                    <div className="stat-label">{playerData.dateOfBirth}</div>
                  </div>
                  <div className="player-stat-item">
                    <div className="stat-value">{playerData.preferredFoot}</div>
                    <div className="stat-label">Preferred foot</div>
                  </div>
                  <div className="player-stat-item">
                    <div className="stat-value">
                      <img src={playerData.nationalityFlag} alt={playerData.nationality} className="nationality-flag" />
                      {playerData.nationality}
                    </div>
                    <div className="stat-label">Country</div>
                  </div>
                  <div className="player-stat-item">
                    <div className="stat-value">{playerData.marketValue}</div>
                    <div className="stat-label">Market value</div>
                  </div>
                </div>

                <div className="player-positions">
                  <div className="position-section">
                    <h3>Position</h3>
                    <div className="position-primary">
                      <span>Primary</span>
                      <div className="position-value">Left Winger</div>
                    </div>
                    <div className="position-others">
                      <span>Others</span>
                      <div className="position-value">Striker</div>
                    </div>
                  </div>
                  <div className="position-field">
                    <div className="field-graphic">
                      <div className="position-marker lw">LW</div>
                      <div className="position-marker st">ST</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="player-stats-container">
            <div className="stats-row">
              {/* Player Attributes Card */}
              <Card className="stat-card">
                <h2 className="stat-card-title">Player Attributes</h2>
                <div className="radar-chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="stat" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="Attributes" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Season Stats Card */}
              <Card className="stat-card">
                <h2 className="stat-card-title">2024/25 Season Stats</h2>
                <div className="bar-chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#0EA5E9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="stats-row">
              {/* Performance Metrics */}
              <Card className="stat-card">
                <h2 className="stat-card-title">Detailed Performance Metrics</h2>
                <div className="metrics-grid">
                  {playerData.performanceMetrics.map((metric, index) => (
                    <div key={index} className="metric-item">
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-name">{metric.name}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Player Trophies */}
              <Card className="stat-card">
                <h2 className="stat-card-title">Trophies & Achievements</h2>
                <div className="trophies-container">
                  {playerData.trophies.map((trophy, index) => (
                    <div key={index} className="trophy-item">
                      <Trophy className="trophy-icon" />
                      <div className="trophy-details">
                        <div className="trophy-name">{trophy.name}</div>
                        <div className="trophy-year">{trophy.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Matches Section */}
            <div className="stats-row">
              {/* Past Matches */}
              <Card className="stat-card">
                <h2 className="stat-card-title">Recent Matches</h2>
                <div className="form-container">
                  {playerData.recentForm.map((match, index) => (
                    <div key={index} className="form-match">
                      <div className="form-match-date">
                        <Calendar className="form-match-icon" size={14} />
                        {match.date}
                      </div>
                      <div className="form-match-teams">
                        <div className="form-team">
                          <img src={match.homeTeamLogo} alt={match.homeTeam} className="form-team-logo" />
                          <span>{match.homeTeam}</span>
                        </div>
                        <div className="form-score">{match.score}</div>
                        <div className="form-team">
                          <img src={match.awayTeamLogo} alt={match.awayTeam} className="form-team-logo" />
                          <span>{match.awayTeam}</span>
                        </div>
                      </div>
                      <div className="player-match-stats">
                        {match.playerStats.goals > 0 && (
                          <div className="player-match-stat">
                            <span className="stat-icon">⚽</span>
                            <span className="stat-value">{match.playerStats.goals}</span>
                          </div>
                        )}
                        {match.playerStats.assists > 0 && (
                          <div className="player-match-stat">
                            <span className="stat-icon">🅰️</span>
                            <span className="stat-value">{match.playerStats.assists}</span>
                          </div>
                        )}
                        {match.playerStats.minutesPlayed && (
                          <div className="player-match-stat">
                            <span className="stat-icon">⏱️</span>
                            <span className="stat-value">{match.playerStats.minutesPlayed}'</span>
                          </div>
                        )}
                        {match.playerStats.rating && (
                          <div className="player-match-stat rating">
                            <span className="stat-value">{match.playerStats.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Matches */}
              <Card className="stat-card">
                <h2 className="stat-card-title">Upcoming Fixtures</h2>
                <div className="form-container">
                  {playerData.upcomingMatches.map((match, index) => (
                    <div key={index} className="form-match upcoming">
                      <div className="form-match-date">
                        <Calendar className="form-match-icon" size={14} />
                        {match.date}
                      </div>
                      <div className="form-match-teams">
                        <div className="form-team">
                          <img src={match.homeTeamLogo} alt={match.homeTeam} className="form-team-logo" />
                          <span>{match.homeTeam}</span>
                        </div>
                        <div className="form-time">{match.time}</div>
                        <div className="form-team">
                          <img src={match.awayTeamLogo} alt={match.awayTeam} className="form-team-logo" />
                          <span>{match.awayTeam}</span>
                        </div>
                      </div>
                      <div className="match-competition">
                        <span className="competition-name">{match.competition}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Shot Map Section */}
            <Card className="stat-card full-width shot-map-card">
              <div className="shot-map-header">
                <div className="shot-map-title">
                  <h2>Season shot map</h2>
                  <span className="shot-map-subtitle">On target: 35%</span>
                </div>
                <div className="shot-map-season">
                  <div className="season-selector">
                    <span className="current-season">2024/2025</span>
                    <span className="league-name">LaLiga</span>
                  </div>
                  <div className="view-toggle">
                    <button className={`view-button ${activeTab === 'total' ? 'active' : ''}`} onClick={() => setActiveTab('total')}>Total</button>
                    <button className={`view-button ${activeTab === 'per90' ? 'active' : ''}`} onClick={() => setActiveTab('per90')}>Per 90</button>
                  </div>
                </div>
              </div>

              <div className="shot-map-content">
                <div className="shot-map-visualization">
                  <div className="pitch-container">
                    <div className="pitch-background"></div>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
                        <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
                        <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ShotTooltip />} />

                        <Scatter
                          name="Shots"
                          data={shotMapData}
                          fill="#8884d8"
                          shape={<CustomDot />}
                        />
                        <Scatter 
                          name="Shots" 
                          data={shotMapData} 
                          fill="#8884d8" 
                          shape={<CustomDot />} 

                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="shot-map-stats">
                    <div className="shot-stat">
                      <div className="shot-stat-value">71</div>
                      <div className="shot-stat-label">Shots</div>
                    </div>
                    <div className="shot-stat">
                      <div className="shot-stat-value">11</div>
                      <div className="shot-stat-label">Goals</div>
                    </div>
                    <div className="shot-stat">
                      <div className="shot-stat-value">9.86</div>
                      <div className="shot-stat-label">xG</div>
                    </div>
                  </div>
                </div>

                <div className="shot-map-details">
                  <div className="shot-navigation">
                    <button className="shot-nav-button prev">
                      <ArrowLeft size={20} />
                    </button>
                    <div className="shot-nav-match">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" alt="Real Madrid" className="nav-team-logo" />
                      <span>1 - 2</span>
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/1200px-Valenciacf.svg.png" alt="Valencia" className="nav-team-logo" />
                    </div>
                    <button className="shot-nav-button next">
                      <ArrowRight size={20} />
                    </button>
                  </div>

                  <div className="shot-info">
                    <div className="shot-info-row">
                      <span className="shot-info-label">Shot type</span>
                      <span className="shot-info-value">Right foot</span>
                    </div>
                    <div className="shot-info-row">
                      <span className="shot-info-label">Situation</span>
                      <span className="shot-info-value">From corner</span>
                    </div>
                    <div className="shot-info-row">
                      <span className="shot-info-label">Result</span>
                      <span className="shot-info-value">Goal</span>
                    </div>
                  </div>

                  <div className="shot-xg">
                    <div className="goal-graphic">
                      <div className="goal-indicator"></div>
                    </div>
                    <div className="xg-stats">
                      <div className="xg-stat">
                        <div className="xg-value">0.47</div>
                        <div className="xg-label">xG</div>
                      </div>
                      <div className="xg-stat">
                        <div className="xg-value">0.98</div>
                        <div className="xg-label">xGOT</div>
                      </div>
                    </div>
                  </div>

                  <div className="shot-filters">
                    <h3>Filter</h3>
                    <div className="filter-buttons">
                      {shotFilters.map((filter, index) => (
                        <button key={index} className="filter-button">
                          {filter.name} <span>{filter.value}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">Player Pulse Arena</h3>
              <ul className="footer-links">
                <li className="footer-link"><a href="#">About Us</a></li>
                <li className="footer-link"><a href="#">Contact</a></li>
                <li className="footer-link"><a href="#">Careers</a></li>
                <li className="footer-link"><a href="#">Advertise</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Resources</h3>
              <ul className="footer-links">
                <li className="footer-link"><a href="#">News</a></li>
                <li className="footer-link"><a href="#">Live Scores</a></li>
                <li className="footer-link"><a href="#">Statistics</a></li>
                <li className="footer-link"><a href="#">Leagues</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">Legal</h3>
              <ul className="footer-links">
                <li className="footer-link"><a href="#">Terms of Service</a></li>
                <li className="footer-link"><a href="#">Privacy Policy</a></li>
                <li className="footer-link"><a href="#">Cookie Policy</a></li>
                <li className="footer-link"><a href="#">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Player Pulse Arena. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Custom dot component for shot map
const CustomDot = (props) => {
  const { cx, cy, payload } = props;


  return (
    <circle
      cx={cx}
      cy={cy}
      r={payload.isGoal ? 8 : 5}
      fill={payload.isGoal ? '#EA384C' : '#AAADB0'}
      stroke={payload.isGoal ? '#EA384C' : 'none'}
   />)
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={payload.isGoal ? 8 : 5} 
      fill={payload.isGoal ? '#EA384C' : '#AAADB0'} 
      stroke={payload.isGoal ? '#EA384C' : 'none'} 

      strokeWidth={payload.isGoal ? 2 : 0}
    />
  );
};

// Custom tooltip for shot map
const ShotTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="shot-custom-tooltip">
        <p className="shot-type">{data.shotType}</p>
        <p className="shot-situation">{data.situation}</p>
        <p className="shot-result">{data.result}</p>
        <p className="shot-xg">xG: {data.xG}</p>
      </div>
    );
  }
  return null;
};

// Mock data function
function getMockPlayerData() {
  return {
    id: 846033,
    name: "Vinícius Júnior",
    photo: "https://images.unsplash.com/photo-1583768138297-11a238723a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbmljaXVzJTIwanVuaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    age: 23,
    dateOfBirth: "12.07.2000",
    position: "Left Winger",
    height: "176 cm",
    weight: "73 kg",
    nationality: "Brazil",
    nationalityFlag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png",
    team: "Real Madrid",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    jerseyNumber: 7,
    preferredFoot: "Right",
    rating: 91,
    marketValue: "€180M",
    stats: {
      pace: 95,
      shooting: 85,
      passing: 83,
      dribbling: 94,
      defending: 42,
      physical: 68
    },
    seasonStats: {
      goals: 15,
      assists: 9,
      games: 28,
      yellowCards: 4,
      redCards: 0
    },
    performanceMetrics: [
      { name: "Goals/Game", value: "0.53" },
      { name: "Assists/Game", value: "0.32" },
      { name: "Pass Accuracy", value: "87%" },
      { name: "Dribbles/Game", value: "4.7" },
      { name: "Key Passes/Game", value: "2.3" },
      { name: "Shots/Game", value: "2.8" },
      { name: "Successful Dribbles", value: "67%" },
      { name: "Duels Won", value: "58%" }
    ],
    trophies: [
      { name: "Champions League", year: "2021/22" },
      { name: "La Liga", year: "2021/22" },
      { name: "La Liga", year: "2022/23" },
      { name: "FIFA Club World Cup", year: "2022" },
      { name: "UEFA Super Cup", year: "2022" },
      { name: "Spanish Super Cup", year: "2021/22" }
    ],
    recentForm: [
      {
        date: "Apr 5, 2025",
        competition: "La Liga",
        homeTeam: "Real Madrid",
        homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
        awayTeam: "Barcelona",
        awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
        score: "3-1",
        playerStats: {
          goals: 2,
          assists: 1,
          minutesPlayed: 90,
          rating: 9.3
        }
      },
      {
        date: "Mar 29, 2025",
        competition: "Champions League",
        homeTeam: "Manchester City",
        homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
        awayTeam: "Real Madrid",
        awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
        score: "1-2",
        playerStats: {
          goals: 1,
          assists: 0,
          minutesPlayed: 90,
          rating: 8.5
        }
      },
      {
        date: "Mar 22, 2025",
        competition: "La Liga",
        homeTeam: "Real Madrid",
        homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
        awayTeam: "Atletico Madrid",
        awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png",
        score: "2-0",
        playerStats: {
          goals: 0,
          assists: 1,
          minutesPlayed: 83,
          rating: 7.8
        }
      }
    ],
    upcomingMatches: [
      {
        date: "Apr 12, 2025",
        time: "20:00",
        competition: "La Liga",
        homeTeam: "Sevilla",
        homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png",
        awayTeam: "Real Madrid",
        awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
      },
      {
        date: "Apr 16, 2025",
        time: "20:45",
        competition: "Champions League",
        homeTeam: "Real Madrid",
        homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
        awayTeam: "Bayern Munich",
        awayTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"
      },
      {
        date: "Apr 20, 2025",
        time: "16:15",
        competition: "La Liga",
        homeTeam: "Real Madrid",
        homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
        awayTeam: "Athletic Bilbao",
        awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Athletic_Club_Bilbao_logo.svg/1200px-Athletic_Club_Bilbao_logo.svg.png"
      }
    ],
    shotMap: [
      { x: 85, y: 50, isGoal: true, shotType: "Right foot", situation: "From corner", xG: 0.47, result: "Goal" },
      { x: 82, y: 48, isGoal: false, shotType: "Right foot", situation: "Open play", xG: 0.12, result: "Saved" },
      { x: 88, y: 52, isGoal: true, shotType: "Left foot", situation: "Fast break", xG: 0.68, result: "Goal" },
      { x: 78, y: 45, isGoal: false, shotType: "Header", situation: "Cross", xG: 0.34, result: "Missed" },
      { x: 80, y: 55, isGoal: false, shotType: "Right foot", situation: "Open play", xG: 0.21, result: "Blocked" },
      { x: 75, y: 42, isGoal: true, shotType: "Right foot", situation: "Set piece", xG: 0.09, result: "Goal" },
      { x: 90, y: 50, isGoal: true, shotType: "Right foot", situation: "Penalty", xG: 0.76, result: "Goal" },
      { x: 83, y: 58, isGoal: false, shotType: "Left foot", situation: "Open play", xG: 0.32, result: "Saved" },
      { x: 70, y: 45, isGoal: false, shotType: "Right foot", situation: "Open play", xG: 0.06, result: "Missed" },
      { x: 65, y: 60, isGoal: true, shotType: "Right foot", situation: "Fast break", xG: 0.23, result: "Goal" },
      { x: 75, y: 48, isGoal: false, shotType: "Header", situation: "Cross", xG: 0.42, result: "Saved" },
      { x: 60, y: 50, isGoal: false, shotType: "Right foot", situation: "Open play", xG: 0.05, result: "Blocked" },
      { x: 68, y: 39, isGoal: true, shotType: "Left foot", situation: "Open play", xG: 0.18, result: "Goal" },
      { x: 86, y: 45, isGoal: false, shotType: "Right foot", situation: "From corner", xG: 0.28, result: "Saved" },
      { x: 72, y: 53, isGoal: false, shotType: "Right foot", situation: "Open play", xG: 0.15, result: "Blocked" },
      { x: 74, y: 49, isGoal: true, shotType: "Right foot", situation: "Fast break", xG: 0.37, result: "Goal" },
      { x: 62, y: 56, isGoal: false, shotType: "Left foot", situation: "Open play", xG: 0.09, result: "Missed" },
      { x: 58, y: 44, isGoal: false, shotType: "Right foot", situation: "Open play", xG: 0.04, result: "Saved" },
      { x: 84, y: 52, isGoal: true, shotType: "Header", situation: "Cross", xG: 0.51, result: "Goal" },
      { x: 93, y: 50, isGoal: true, shotType: "Right foot", situation: "Penalty", xG: 0.78, result: "Goal" }
    ]
  };
}

export default PlayerData;
