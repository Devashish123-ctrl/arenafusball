
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
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
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0a2540', textAlign: 'center' }}>
            About Player Pulse Arena
          </h1>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0EA5E9' }}>
              Our Mission
            </h2>
            <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Player Pulse Arena was founded with the mission to provide football fans with comprehensive, real-time information about players, matches, and news from around the globe. We believe in making football data accessible, engaging, and actionable for fans of all levels of expertise.
            </p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0EA5E9' }}>
              What We Offer
            </h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              <li>Comprehensive player statistics and profiles</li>
              <li>Live match scores and updates</li>
              <li>Latest news from top football sources</li>
              <li>Rankings of top leagues and teams</li>
              <li>Analysis and insights from football experts</li>
              <li>Emerging talent spotlights</li>
            </ul>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0EA5E9' }}>
              Our Team
            </h2>
            <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Our dedicated team consists of football enthusiasts, data analysts, and sports journalists who work tirelessly to bring you the most accurate and interesting football content. We're passionate about the beautiful game and committed to creating the best football information platform.
            </p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0EA5E9' }}>
              Contact Us
            </h2>
            <p style={{ lineHeight: '1.6' }}>
              Have questions, suggestions, or feedback? We'd love to hear from you!<br/>
              Email: <a href="mailto:info@playerpulsearena.com" style={{ color: '#0EA5E9', textDecoration: 'none' }}>info@playerpulsearena.com</a><br/>
              Follow us on social media: @PlayerPulseArena
            </p>
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

export default AboutUs;
