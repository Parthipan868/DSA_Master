import React from 'react';
import { FaYoutube, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Community.css';

const Community = () => {
  const socialStats = [
    {
      icon: <FaYoutube />,
      count: '800K+',
      platform: 'YouTube',
      color: '#FF0000'
    },
    {
      icon: <FaTwitter />,
      count: '160K+',
      platform: 'Twitter',
      color: '#1DA1F2'
    },
    {
      icon: <FaInstagram />,
      count: '210K+',
      platform: 'Instagram',
      color: '#E1306C'
    },
    {
      icon: <FaLinkedin />,
      count: '750K+',
      platform: 'LinkedIn',
      color: '#0A66C2'
    }
  ];

  return (
    <section className="community-section">
      <div className="community-container">
        <h2 className="community-title">Join Our Ever-Growing Global Community</h2>
        <p className="community-subtitle">
          Connect with thousands of developers worldwide on your favorite platform
        </p>

        <div className="social-grid">
          {socialStats.map((social, index) => (
            <div key={index} className="social-card-wrapper">
              <div className="social-card">
                <div className="social-icon" style={{ color: social.color }}>
                  {social.icon}
                </div>
                <h3 className="social-count">{social.count}</h3>
                <p className="social-platform">{social.platform}</p>
                <a href="#" className="follow-link">
                  Follow Us <span className="arrow">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="community-description">
          Stay updated with the latest DSA tips, problem solutions, and coding interviews
        </p>
      </div>
    </section>
  );
};

export default Community;
