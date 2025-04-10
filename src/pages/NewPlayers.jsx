
import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for new players
const newPlayers = [
  { 
    id: 1, 
    name: "Alejandro Garnacho", 
    age: 19, 
    position: "Forward", 
    club: "Manchester United", 
    country: "Argentina",
    description: "A highly talented young winger known for his pace and dribbling ability."
  },
  { 
    id: 2, 
    name: "Lamine Yamal", 
    age: 16, 
    position: "Winger", 
    club: "Barcelona", 
    country: "Spain",
    description: "One of the youngest players to debut in La Liga, showing incredible technical abilities."
  },
  { 
    id: 3, 
    name: "Endrick", 
    age: 17, 
    position: "Forward", 
    club: "Real Madrid", 
    country: "Brazil",
    description: "Brazilian wonder kid signed by Real Madrid, known for his finishing and physical presence."
  },
  { 
    id: 4, 
    name: "Kobbie Mainoo", 
    age: 19, 
    position: "Midfielder", 
    club: "Manchester United", 
    country: "England",
    description: "Central midfielder with excellent passing range and tactical awareness beyond his years."
  },
  { 
    id: 5, 
    name: "Warren Zaïre-Emery", 
    age: 18, 
    position: "Midfielder", 
    club: "Paris Saint-Germain", 
    country: "France",
    description: "Defensive midfielder with great physical attributes and impressive reading of the game."
  },
];

const NewPlayers = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Player Pulse Arena</Link>
        <div className="navbar-links">
          <Link to="/new-players" className="navbar-link">New Players</Link>
          <Link to="/about-us" className="navbar-link">About Us</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="app-container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '2rem 0', color: '#0a2540' }}>
          Rising Stars: New Players to Watch
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
          {newPlayers.map(player => (
            <div key={player.id} style={{ 
              background: 'white', 
              borderRadius: '8px', 
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderTop: '4px solid #0ea5e9'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0a2540' }}>
                {player.name}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ 
                  background: '#f0f9ff', 
                  color: '#0ea5e9', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {player.age} years
                </span>
                <span style={{ 
                  background: '#f0f9ff', 
                  color: '#0ea5e9', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {player.position}
                </span>
                <span style={{ 
                  background: '#f0f9ff', 
                  color: '#0ea5e9', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {player.country}
                </span>
              </div>
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#777', 
                marginBottom: '0.5rem' 
              }}>
                <strong>Club:</strong> {player.club}
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                {player.description}
              </p>
            </div>
          ))}
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

export default NewPlayers;
