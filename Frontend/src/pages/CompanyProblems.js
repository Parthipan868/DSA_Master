import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaVideo, FaBook, FaComment, FaExternalLinkAlt } from 'react-icons/fa';
import { problems } from './ProblemsData.js';
import './CompanyProblems.css';

// Create a mapping of companies to their problems
const companyProblemsMap = {};

// Initialize company problems map
problems.forEach(problem => {
  if (problem.companies) {
    problem.companies.forEach(company => {
      const companyKey = company.toLowerCase();
      if (!companyProblemsMap[companyKey]) {
        companyProblemsMap[companyKey] = [];
      }
      companyProblemsMap[companyKey].push(problem);
    });
  }
});

const companyLogos = {
  'amazon': 'https://logo.clearbit.com/amazon.com',
  'google': 'https://logo.clearbit.com/google.com',
  'microsoft': 'https://img.icons8.com/color/480/microsoft.png',
  'facebook': 'https://logo.clearbit.com/facebook.com',
  'apple': 'https://logo.clearbit.com/apple.com',
  'netflix': 'https://logo.clearbit.com/netflix.com',
  'twitter': 'https://logo.clearbit.com/twitter.com',
  'linkedin': 'https://logo.clearbit.com/linkedin.com',
  'airbnb': 'https://logo.clearbit.com/airbnb.com',
  'adobe': 'https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg',
  'oracle': 'https://logo.clearbit.com/oracle.com',
  'uber': 'https://logo.clearbit.com/uber.com'
};

const CompanyProblems = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();

  // Format company name for display (capitalize first letter)
  const displayName = companyName ? companyName.charAt(0).toUpperCase() + companyName.slice(1) : '';

  // Get problems for the current company or empty array if not found
  const problems = companyProblemsMap[companyName] || [];
  const totalProblems = problems.length;
  const solvedProblems = 0; // This would come from user data in a real app

  const handleBackClick = () => {
    navigate('/companies');
  };

  const handleProblemClick = (leetcodeUrl) => {
    // Open LeetCode URL in a new tab
    window.open(leetcodeUrl, '_blank');
  };

  return (
    <div className="company-problems-container">
      <div className="company-problems-header">
        <div className="back-button-container">
          <button onClick={handleBackClick} className="back-button">
            ← Back to All Companies
          </button>
        </div>

        <div className="company-info-header">
          <img
            src={companyLogos[companyName] || 'https://via.placeholder.com/50'}
            alt={`${displayName} logo`}
            className="company-logo-large"
          />
          <div className="company-title">
            <h1>{displayName} Problems</h1>
            <p className="subtitle">{solvedProblems} / {totalProblems} solved</p>
          </div>
        </div>
      </div>

      <div className="problems-grid">
        {problems.map((problem, index) => (
          <div key={`${problem.id}-${index}`} className="problem-card">
            <div className="problem-header">
              <h3>{problem.title}</h3>
              <div className="problem-badges">
                <span className={`badge ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
                {problem.topics && problem.topics[0] && (
                  <span className="badge topic">{problem.topics[0]}</span>
                )}
              </div>
            </div>

            <div className="card-actions">
              <button
                className="solve-btn"
                onClick={() => handleProblemClick(problem.leetcodeUrl)}
              >
                <FaExternalLinkAlt /> Solve
              </button>

              {problem.videoUrl && (
                <button
                  className="icon-btn"
                  onClick={() => window.open(problem.videoUrl, '_blank')}
                >
                  <FaVideo />
                </button>
              )}

              {problem.notesUrl && (
                <button
                  className="icon-btn"
                  onClick={() => window.open(problem.notesUrl, '_blank')}
                >
                  <FaBook />
                </button>
              )}

              {problem.hasDiscussion && (
                <button className="icon-btn">
                  <FaComment />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProblems;
