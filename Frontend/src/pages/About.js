import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaRocket, FaUsers, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About DSA Master</h1>
        <p className="about-description">
          Founded in 2023, DSA Master is a leading platform dedicated to helping developers master Data Structures and Algorithms. 
          What started as a small initiative has grown into a thriving community of over 50,000 learners worldwide.
        </p>
        
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-icon"><FaUsers /></div>
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Active Learners</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaGraduationCap /></div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Learning Paths</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaChartLine /></div>
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>

        <div className="history-section">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Founded with a Vision</h3>
                <p>DSA Master was born out of a simple idea: to make DSA learning accessible and effective for everyone, regardless of their background.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>First Major Milestone</h3>
                <p>Reached 10,000 active users and launched our premium learning paths with interactive coding challenges.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>Expanding Horizons</h3>
                <p>Launched our mobile app and introduced AI-powered personalized learning recommendations.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><FaRocket /></div>
              <h3>Innovation</h3>
              <p>We continuously evolve our platform with cutting-edge teaching methods and technologies.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaUsers /></div>
              <h3>Community</h3>
              <p>We believe in the power of learning together and building a supportive community.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><FaGraduationCap /></div>
              <h3>Excellence</h3>
              <p>We're committed to providing the highest quality educational content and resources.</p>
            </div>
          </div>
        </div>

        <div className="mission-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            To make learning Data Structures and Algorithms accessible, engaging, and effective for everyone, 
            regardless of their background or experience level. We believe that with the right resources 
            and guidance, anyone can master these fundamental computer science concepts.
          </p>
        </div>

        <div className="team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">Passionate experts dedicated to your learning success</p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=60" 
                  alt="John Doe"
                  className="avatar-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ui-avatars.com/api/?name=John+Doe&background=ff7849&color=fff';
                  }}
                />
              </div>
              <h3 className="team-name">John Doe</h3>
              <p className="team-role">Co-Founder & CTO</p>
              <p className="team-bio">10+ years in software development and education. Former Google engineer.</p>
              <div className="social-links">
                <a href="#" className="social-link"><FaGithub /></a>
                <a href="#" className="social-link"><FaLinkedin /></a>
                <a href="#" className="social-link"><FaTwitter /></a>
              </div>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60" 
                  alt="Parthipan M"
                  className="avatar-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ui-avatars.com/api/?name=Parthipan+M&background=667eea&color=fff';
                  }}
                />
              </div>
              <h3 className="team-name">Parthipan M</h3>
              <p className="team-role">Head of Product</p>
              <p className="team-bio">Product leader with a passion for creating exceptional learning experiences.</p>
              <div className="social-links">
                <a href="#" className="social-link"><FaGithub /></a>
                <a href="#" className="social-link"><FaLinkedin /></a>
                <a href="#" className="social-link"><FaGlobe /></a>
              </div>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=60" 
                  alt="Alex Johnson"
                  className="avatar-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ui-avatars.com/api/?name=Alex+Johnson&background=10b981&color=fff';
                  }}
                />
              </div>
              <h3 className="team-name">Alex Johnson</h3>
              <p className="team-role">Lead Instructor</p>
              <p className="team-bio">Algorithm expert with a talent for breaking down complex concepts.</p>
              <div className="social-links">
                <a href="#" className="social-link"><FaGithub /></a>
                <a href="#" className="social-link"><FaLinkedin /></a>
                <a href="#" className="social-link"><FaTwitter /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="join-us-section">
          <h2 className="section-title">Join Our Mission</h2>
          <p className="join-text">
            Interested in joining our team or becoming an instructor? We're always looking for talented individuals 
            who are passionate about education and technology.
          </p>
          <button className="cta-button">View Open Positions</button>
        </div>
      </div>
    </div>
  );
};

export default About;
