import React, { useState } from 'react';
import { 
  FaSearch, 
  FaRandom, 
  FaFire, 
  FaExternalLinkAlt, 
  FaVideo, 
  FaBook, 
  FaComment 
} from 'react-icons/fa';
import './Problems.css';
import { problems } from './ProblemsData';

const Problems = () => {
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulties');
  const [statusFilter, setStatusFilter] = useState('All Problems');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomProblem, setRandomProblem] = useState(null);

  const handlePickRandom = () => {
    const randomIndex = Math.floor(Math.random() * problems.length);
    setRandomProblem(problems[randomIndex]);
    setShowRandomModal(true);
  };

  const handleSolveProblem = (url) => {
    window.open(url, '_blank');
  };

  const handleOpenVideo = (url) => {
    window.open(url, '_blank');
  };

  const handleOpenNotes = (url) => {
    window.open(url, '_blank');
  };

  const handleOpenDiscussion = (problemId) => {
    // Navigate to discussion page for this problem
    window.location.href = `/problem/${problemId}/discussion`;
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTopic = topicFilter === 'All Topics' || problem.topics.some(t => t === topicFilter.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All Difficulties' || problem.difficulty === difficultyFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All Problems' || problem.status === statusFilter;
    return matchesSearch && matchesTopic && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="problems-container">
      <div className="all-problems-section">
        <div className="problems-header">
          <h2>All Problems</h2>
          <div className="problems-actions">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-random" onClick={handlePickRandom}>
              <FaRandom /> Pick Random
            </button>
            <button className="btn-daily-challenge" onClick={handlePickRandom}>
              <FaFire /> Daily Challenge
            </button>
          </div>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Topic:</label>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            >
              <option>All Topics</option>
              {[...new Set(problems.flatMap(p => p.topics))].map((topic) => (
                <option key={topic} value={topic}>
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Difficulty:</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option>All Difficulties</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Problems</option>
              <option>Solved</option>
              <option>Unsolved</option>
              <option>Attempted</option>
            </select>
          </div>
        </div>

        <div className="problems-grid">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="problem-card">
              <div className="card-header">
                <h3>{problem.title}</h3>
                <span className={`difficulty ${problem.difficulty}`}>
                  {problem.difficulty}
                </span>
              </div>
              
              <div className="topics">
                {problem.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="card-footer">
                <div className="problem-actions">
                  <button 
                    className="btn-solve"
                    onClick={() => handleSolveProblem(problem.leetcodeUrl)}
                  >
                    <FaExternalLinkAlt /> Solve
                  </button>
                  
                  <div className="action-icons">
                    {problem.videoUrl && (
                      <button 
                        className="icon-btn" 
                        title="Video Solution"
                        onClick={() => handleOpenVideo(problem.videoUrl)}
                      >
                        <FaVideo />
                      </button>
                    )}
                    
                    {problem.notesUrl && (
                      <button 
                        className="icon-btn" 
                        title="Study Notes"
                        onClick={() => handleOpenNotes(problem.notesUrl)}
                      >
                        <FaBook />
                      </button>
                    )}
                    
                    {problem.hasDiscussion && (
                      <button 
                        className="icon-btn" 
                        title="Discussion"
                        onClick={() => handleOpenDiscussion(problem.id)}
                      >
                        <FaComment />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="problem-meta">
                  <span className="points">{problem.points} pts</span>
                  <span className="status">{problem.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showRandomModal && randomProblem && (
        <div className="modal-overlay" onClick={() => setShowRandomModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setShowRandomModal(false)}
            >
              ×
            </button>
            
            <div className="modal-header">
              <div className="modal-icon">🎯</div>
              <h2>Random Challenge</h2>
            </div>
            
            <h3 className="modal-problem-title">{randomProblem.title}</h3>
            
            <div className="modal-tags">
              <span className={`difficulty-badge ${randomProblem.difficulty}`}>
                {randomProblem.difficulty}
              </span>
              {randomProblem.topics.map((topic, index) => (
                <span key={index} className="topic-badge">
                  {topic}
                </span>
              ))}
            </div>
            
            <p className="modal-description">Ready to tackle this challenge?</p>
            
            <button 
              className="modal-solve-button"
              onClick={() => {
                handleSolveProblem(randomProblem.leetcodeUrl);
                setShowRandomModal(false);
              }}
            >
              <FaExternalLinkAlt /> Solve Problem
            </button>
            
            <div className="modal-footer-icons">
              {randomProblem.videoUrl && (
                <button 
                  className="modal-icon-btn" 
                  title="Watch Tutorial"
                  onClick={() => handleOpenVideo(randomProblem.videoUrl)}
                >
                  <FaVideo />
                </button>
              )}
              
              {randomProblem.notesUrl && (
                <button 
                  className="modal-icon-btn" 
                  title="View Notes"
                  onClick={() => handleOpenNotes(randomProblem.notesUrl)}
                >
                  <FaBook />
                </button>
              )}
              
              {randomProblem.hasDiscussion && (
                <button 
                  className="modal-icon-btn" 
                  title="Discuss"
                  onClick={() => handleOpenDiscussion(randomProblem.id)}
                >
                  <FaComment />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;
