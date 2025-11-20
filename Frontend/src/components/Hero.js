import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/learn?path=beginner');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">
          Advance Your Career with <span className="highlight">DSA Problems</span>
        </h1>
        
        <div className="hero-subtitle">
          Join the <span className="top-badge">Top 1%</span> Today
        </div>

        <p className="hero-description">
          Master DSA with curated resources and expert guidance – Learn the skills that set you apart and join the Top 1% of coding achievers!
        </p>

        <button className="hero-cta" onClick={handleStartLearning}>Start Your DSA Journey</button>
      </div>
    </section>
  );
};

export default Hero;
