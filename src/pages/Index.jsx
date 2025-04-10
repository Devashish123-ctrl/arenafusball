
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import "../index.css"

// Mock data for the homepage
const leagues = [
  { id: 1, name: "Premier League", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png" },
  { id: 2, name: "La Liga", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LaLiga.svg/1200px-LaLiga.svg.png" },
  { id: 3, name: "Bundesliga", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png" },
  { id: 4, name: "Serie A", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Serie_A_2022-23.svg/1200px-Serie_A_2022-23.svg.png" },
  { id: 5, name: "Ligue 1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Logo_de_la_Ligue_1_Uber_Eats.svg/1200px-Logo_de_la_Ligue_1_Uber_Eats.svg.png" },
  { id: 6, name: "Eredivisie", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eredivisie_nieuw_logo_2017-.svg/1200px-Eredivisie_nieuw_logo_2017-.svg.png" },
  { id: 7, name: "Primeira Liga", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Liga_NOS_logo.png/1200px-Liga_NOS_logo.png" },
  { id: 8, name: "MLS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MLS_crest_logo_RGB_gradient.svg/1200px-MLS_crest_logo_RGB_gradient.svg.png" },
  { id: 9, name: "Brazilian Série A", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png/1200px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.png" },
  { id: 10, name: "Argentine Primera División", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Liga_Profesional_de_F%C3%BAtbol_%28Argentina%29_logo.svg/1200px-Liga_Profesional_de_F%C3%BAtbol_%28Argentina%29_logo.svg.png" },
];

const matches = [
  {
    id: 1,
    homeTeam: "Manchester City",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    awayTeam: "Liverpool",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    score: "2-1",
    time: "FT"
  },
  {
    id: 2,
    homeTeam: "Barcelona",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
    awayTeam: "Real Madrid",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    score: "1-1",
    time: "85'"
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    awayTeam: "Dortmund",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png",
    score: "3-0",
    time: "FT"
  },
  {
    id: 4,
    homeTeam: "PSG",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png",
    awayTeam: "Marseille",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/1200px-Olympique_Marseille_logo.svg.png",
    score: "0-0",
    time: "20:45"
  }
];

const news = [
  {
    id: 1,
    title: "Vinicius Jr. scores hat-trick as Madrid crush Valencia",
    source: "ESPN",
    sourceIcon: "https://a.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fespn_logos%2Fespn_red.png",
    image: "https://images.unsplash.com/photo-1583768138297-11a238723a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbmljaXVzJTIwanVuaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "Man City's Haaland breaks Premier League scoring record",
    source: "Sky Sports",
    sourceIcon: "https://e0.365dm.com/sky-sports/favicon/favicon.ico",
    image: "https://images.unsplash.com/photo-1624280157150-4d1ed8219912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhYWxhbmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Barcelona announce new signing from Premier League",
    source: "Goal",
    sourceIcon: "https://www.goal.com/favicon.ico",
    image: "https://images.unsplash.com/photo-1550881111-7cfda9c81a37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hJTIwZmN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    title: "Champions League draw: Bayern to face Real Madrid in quarter-finals",
    source: "BBC Sport",
    sourceIcon: "https://static.bbci.co.uk/favicon.ico",
    image: "https://images.unsplash.com/photo-1616143616622-3037c6516d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbXBpb25zJTIwbGVhZ3VlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  }
];

// Mock player data for search results
const playerData = {
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
    { x: 65, y: 60, isGoal: true, shotType: "Right foot", situation: "Fast break", xG: 0.23, result: "Goal" }
  ]
};

const Index = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/player/${encodeURIComponent(searchInput.trim())}`);
    }
  
  };

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
        <div className="main-content">
          {/* Left Column - Leagues */}
          <div className="column left-column">
            <h2 className="column-title">Top 10 Football Leagues</h2>
            <ul className="league-list">
              {leagues.map(league => (
                <li key={league.id} className="league-item">
                  <div className="league-number">{league.id}</div>
                  <img src={league.logo} alt={league.name} className="league-logo" />
                  <span className="league-name">{league.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column */}
          <div className="column center-column">
            {/* Search Section */}
            <div className="search-container">
              <form className="search-bar" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Player's Name..." 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="search-button">
                  <Search size={18} className="search-icon" />
                  Search
                </button>
              </form>
              <img 
                src="https://images.unsplash.com/photo-1583768138297-11a238723a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbmljaXVzJTIwanVuaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
                alt="Player Icon" 
                className="search-player-icon" 
              />
            </div>

            {/* Live Scores */}
            <h2 className="column-title">Live Scores (Today)</h2>
            <div className="matches-container">
              {matches.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-teams">
                    <div className="match-team">
                      <img src={match.homeTeamLogo} alt={match.homeTeam} className="team-logo" />
                      <span>{match.homeTeam}</span>
                    </div>
                    <div className="match-score">{match.score}</div>
                    <div className="match-team">
                      <img src={match.awayTeamLogo} alt={match.awayTeam} className="team-logo" />
                      <span>{match.awayTeam}</span>
                    </div>
                  </div>
                  <div className="match-time">{match.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - News */}
          <div className="column right-column">
            <h2 className="column-title">Today's News</h2>
            <div className="column-subtitle">From Top Sources</div>
            <ul className="news-list">
              {news.map(item => (
                <li key={item.id} className="news-item">
                  <img src={item.image} alt={item.title} className="news-image" />
                  <div className="news-content">
                    <div className="news-title">{item.title}</div>
                    <div className="news-source">
                      <img src={item.sourceIcon} alt={item.source} className="news-source-icon" />
                      {item.source}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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

export default Index;
