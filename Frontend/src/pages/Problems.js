import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaRandom,
  FaExternalLinkAlt,
  FaVideo,
  FaComment,
  FaRegStar,
  FaStar as FaSolidStar,
  FaBook,
  FaFire,
  FaDice,
  FaShareAlt,
  FaChevronDown
} from 'react-icons/fa';
import { problems as problemsData } from './ProblemsData';
import { authAPI } from '../services/api';
import './Problems.css';

const statusText = {
  'solved': 'Solved',
  'attempted': 'Attempted',
  'unsolved': 'Unsolved'
};

const Problems = () => {
  // Initialize all problems with 'unsolved' status by default
  const [problems, setProblems] = useState(problemsData.map(p => ({ ...p, status: 'unsolved' })));
  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    topic: 'all',
    search: ''
  });
  const [favorites, setFavorites] = useState(new Set());

  // Random Problem State
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomProblem, setRandomProblem] = useState(null);

  // Daily Challenge State
  const [showDailyModal, setShowDailyModal] = useState(false);
  const [dailyProblem, setDailyProblem] = useState(null);

  // State to track which dropdown is currently open (by problem ID)
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);

  // Extract unique topics for filter dropdown
  const allTopics = [...new Set(problemsData.flatMap(p => p.topics))].sort();

  // Fetch user progress on mount
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (authAPI.isAuthenticated()) {
        try {
          const user = await authAPI.getCurrentUser();
          if (user && user.problemStatuses) {
            setProblems(prevProblems => prevProblems.map(p => {
              const statusObj = user.problemStatuses.find(s => s.problemId === p.id.toString());
              return statusObj ? { ...p, status: statusObj.status } : p;
            }));
          }
        } catch (error) {
          console.error('Error fetching user progress:', error);
        }
      }
    };

    fetchUserProgress();

    const handleClickOutside = () => setOpenStatusDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handlePickRandom = () => {
    if (problems.length > 0) {
      const randomIndex = Math.floor(Math.random() * problems.length);
      setRandomProblem(problems[randomIndex]);
      setShowRandomModal(true);
    }
  };

  const handleDailyChallenge = () => {
    if (problems.length > 0) {
      // Create a seed from today's date (YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0];
      let hash = 0;
      for (let i = 0; i < today.length; i++) {
        hash = ((hash << 5) - hash) + today.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      // Use absolute value of hash to pick an index
      const index = Math.abs(hash) % problems.length;
      setDailyProblem(problems[index]);
      setShowDailyModal(true);
    }
  };

  const handleOpenDiscussion = (problemId) => {
    window.location.href = `/problem/${problemId}/discussion`;
  };

  const handleOpenVideo = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSolveProblem = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenNotes = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const updateProblemStatus = async (problemId, newStatus) => {
    // Optimistic update
    setProblems(prevProblems =>
      prevProblems.map(p =>
        p.id === problemId ? { ...p, status: newStatus } : p
      )
    );
    setOpenStatusDropdown(null); // Close dropdown after selection

    // Update in database if logged in
    if (authAPI.isAuthenticated()) {
      try {
        await authAPI.updateProblemStatus(problemId.toString(), newStatus);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const toggleStatusDropdown = (e, problemId) => {
    e.stopPropagation(); // Prevent event from bubbling to document
    setOpenStatusDropdown(openStatusDropdown === problemId ? null : problemId);
  };

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const filteredProblems = problems.filter(problem => {
    if (filters.difficulty !== 'all' && problem.difficulty.toLowerCase() !== filters.difficulty) return false;
    if (filters.status !== 'all' && problem.status.toLowerCase() !== filters.status) return false;
    if (filters.topic !== 'all' && !problem.topics.includes(filters.topic)) return false;
    if (filters.search && !problem.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="problems-container">
      {/* Header Section */}
      <div className="problems-header">
        <div className="header-left">
          <h1>Problem Library</h1>
          <p className="subtitle">{problems.length} problems to master your coding skills</p>
        </div>
        <div className="header-right">
          <button className="pick-random-btn" onClick={handlePickRandom}>
            <FaDice /> Pick Random
          </button>
          <button className="daily-challenge-btn" onClick={handleDailyChallenge}>
            <FaFire /> Daily Challenge
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-bar">
        <div className="filter-title">
          <FaFilter /> Filter Problems
        </div>
        <div className="filter-controls">
          <div className="search-control">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search problems..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filters.topic}
            onChange={(e) => handleFilterChange('topic', e.target.value)}
          >
            <option value="all">All Topics</option>
            {allTopics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved</option>
            <option value="attempted">Attempted</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="problems-grid">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <div key={problem.id} className="problem-card">
              <div className="card-top">
                <h3>{problem.id}. {problem.title}</h3>
                <div className="card-actions">
                  <button className="icon-action-btn share-btn">
                    <FaShareAlt />
                  </button>
                  <button className="icon-action-btn favorite-btn" onClick={() => toggleFavorite(problem.id)}>
                    {favorites.has(problem.id) ? <FaSolidStar className="favorited" /> : <FaRegStar />}
                  </button>
                </div>
              </div>

              <div className="card-badges">
                <span className={`badge difficulty ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty.toLowerCase()}
                </span>
                {problem.topics?.[0] && (
                  <span className="badge topic">{problem.topics[0]}</span>
                )}
              </div>

              <div className="card-main-actions">
                <button
                  className="solve-btn-large"
                  onClick={() => handleSolveProblem(problem.leetcodeUrl)}
                >
                  <FaExternalLinkAlt /> Solve
                </button>
                <button
                  className="icon-btn-square"
                  onClick={() => handleOpenVideo(problem.videoUrl)}
                  disabled={!problem.videoUrl || problem.videoUrl === '#'}
                >
                  <FaVideo />
                </button>
                <button
                  className="icon-btn-square"
                  onClick={() => handleOpenNotes(problem.notesUrl)}
                  disabled={!problem.notesUrl || problem.notesUrl === '#'}
                >
                  <FaBook />
                </button>
                <button
                  className="icon-btn-square"
                  onClick={() => handleOpenDiscussion(problem.id)}
                >
                  <FaComment />
                </button>
              </div>

              <div className="card-companies">
                <span className="label">Companies:</span>
                <div className="company-list">
                  {problem.companies?.slice(0, 3).map((company, idx) => (
                    <span key={idx} className="company-pill">{company}</span>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <div className="status-container">
                  <div
                    className="status-dropdown-trigger"
                    onClick={(e) => toggleStatusDropdown(e, problem.id)}
                  >
                    <div className={`status-dot ${problem.status}`}></div>
                    <span className="status-text">{statusText[problem.status]}</span>
                    <FaChevronDown className="dropdown-icon" />
                  </div>

                  {openStatusDropdown === problem.id && (
                    <div className="status-dropdown-menu">
                      {['unsolved', 'solved', 'attempted'].map(status => (
                        <div
                          key={status}
                          className={`status-option ${problem.status === status ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateProblemStatus(problem.id, status);
                          }}
                        >
                          <div className={`status-dot ${status}`}></div>
                          <span>{statusText[status]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="points">{problem.points} pts</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-problems">
            <p>No problems found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Random Problem Modal */}
      {showRandomModal && randomProblem && (
        <div className="modal-overlay" onClick={() => setShowRandomModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRandomModal(false)}>×</button>
            <div className="modal-header">
              <div className="modal-icon">🎯</div>
              <h2>Random Challenge</h2>
            </div>
            <h3 className="modal-problem-title">{randomProblem.title}</h3>
            <div className="modal-tags">
              <span className={`difficulty-badge ${randomProblem.difficulty?.toLowerCase()}`}>
                {randomProblem.difficulty}
              </span>
              {randomProblem.topics?.map((topic, index) => (
                <span key={index} className="topic-tag">{topic}</span>
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
          </div>
        </div>
      )}

      {/* Daily Challenge Modal */}
      {showDailyModal && dailyProblem && (
        <div className="modal-overlay" onClick={() => setShowDailyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDailyModal(false)}>×</button>
            <div className="modal-header">
              <div className="modal-icon">🔥</div>
              <h2>Daily Challenge</h2>
            </div>
            <h3 className="modal-problem-title">{dailyProblem.title}</h3>
            <div className="modal-tags">
              <span className={`difficulty-badge ${dailyProblem.difficulty?.toLowerCase()}`}>
                {dailyProblem.difficulty}
              </span>
              {dailyProblem.topics?.map((topic, index) => (
                <span key={index} className="topic-tag">{topic}</span>
              ))}
            </div>
            <p className="modal-description">Today's challenge is ready for you!</p>
            <button
              className="modal-solve-button"
              onClick={() => {
                handleSolveProblem(dailyProblem.leetcodeUrl);
                setShowDailyModal(false);
              }}
            >
              <FaExternalLinkAlt /> Solve Problem
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;