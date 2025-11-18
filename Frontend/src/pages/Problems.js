import React, { useState } from 'react';
import { FaSearch, FaRandom, FaFire, FaPaperPlane, FaStar, FaChevronDown, FaExternalLinkAlt, FaVideo, FaBook, FaComment } from 'react-icons/fa';
import './Problems.css';

const Problems = () => {
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulties');
  const [statusFilter, setStatusFilter] = useState('All Problems');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomProblem, setRandomProblem] = useState(null);

  // Sample data - will be replaced with actual data from the Google Sheet
  const problems = [
    {
      id: 1,
      title: 'Merge Intervals',
      difficulty: 'medium',
      topics: ['arrays'],
      companies: ['Facebook', 'Google', 'Bloomberg'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      notesUrl: 'https://www.geeksforgeeks.org/merge-overlapping-intervals/',
      hasDiscussion: true
    },
    {
      id: 2,
      title: 'Two Sum',
      difficulty: 'easy',
      topics: ['arrays'],
      companies: ['Amazon', 'Google', 'Microsoft'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      notesUrl: 'https://www.geeksforgeeks.org/two-sum/',
      hasDiscussion: true
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'easy',
      topics: ['stacks queues'],
      companies: ['Facebook', 'Amazon', 'Bloomberg'],
      status: 'Unsolved',
      points: 10,
      leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      notesUrl: 'https://www.geeksforgeeks.org/valid-parentheses/',
      hasDiscussion: true
    },
    {
      id: 4,
      title: 'Reverse Linked List',
      difficulty: 'easy',
      topics: ['linked lists'],
      companies: ['Amazon', 'Microsoft', 'Apple'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
      notesUrl: 'https://www.geeksforgeeks.org/reverse-linked-list/',
      hasDiscussion: true
    },
    {
      id: 5,
      title: 'Group Anagrams',
      difficulty: 'medium',
      topics: ['strings'],
      companies: ['Amazon', 'Uber'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
      videoUrl: 'https://www.youtube.com/watch?v=example5',
      notesUrl: 'https://www.geeksforgeeks.org/group-anagrams/',
      hasDiscussion: true
    },
    {
      id: 6,
      title: 'Course Schedule',
      difficulty: 'medium',
      topics: ['graphs'],
      companies: ['Amazon', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
      videoUrl: 'https://www.youtube.com/watch?v=example6',
      notesUrl: 'https://www.geeksforgeeks.org/course-schedule/',
      hasDiscussion: false
    },
    {
      id: 7,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'easy',
      topics: ['trees'],
      companies: ['Microsoft', 'Apple'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
      videoUrl: 'https://www.youtube.com/watch?v=example7',
      notesUrl: 'https://www.geeksforgeeks.org/inorder-traversal/',
      hasDiscussion: true
    },
    {
      id: 8,
      title: 'Number of Islands',
      difficulty: 'medium',
      topics: ['graphs'],
      companies: ['Amazon', 'Facebook', 'Google'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
      videoUrl: 'https://www.youtube.com/watch?v=example8',
      notesUrl: 'https://www.geeksforgeeks.org/number-of-islands/',
      hasDiscussion: true
    },
    {
      id: 9,
      title: 'Maximum Subarray',
      difficulty: 'easy',
      topics: ['arrays'],
      companies: ['Amazon', 'Microsoft', 'Apple'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
      videoUrl: 'https://www.youtube.com/watch?v=example9',
      notesUrl: 'https://www.geeksforgeeks.org/maximum-subarray/',
      hasDiscussion: true
    }
  ];

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
      <div className="problems-header">
        <div className="header-top">
          <div>
            <h1>Problem Library</h1>
            <p>{filteredProblems.length} problems to master your coding skills</p>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={handlePickRandom}>
              <FaRandom /> Pick Random
            </button>
            <button className="action-btn primary">
              <FaFire /> Daily Challenge
            </button>
          </div>
        </div>
        
        <div className="filter-section">
          <h3 className="filter-title">Filter Problems</h3>
          <div className="filters-row">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="filter-dropdown"
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            >
              <option>All Topics</option>
              <option>arrays</option>
              <option>linked lists</option>
              <option>stacks queues</option>
              <option>strings</option>
              <option>trees</option>
              <option>graphs</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option>All Difficulties</option>
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Problems</option>
              <option>Solved</option>
              <option>Unsolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="problems-grid">
        {filteredProblems.map((problem) => (
          <div key={problem.id} className="problem-card">
            <div className="card-header">
              <h3>{problem.title}</h3>
              <div className="card-icons">
                <button className="icon-btn" title="Send">
                  <FaPaperPlane />
                </button>
                <button className="icon-btn" title="Bookmark">
                  <FaStar />
                </button>
              </div>
            </div>
            
            <div className="card-tags">
              <span className={`difficulty-badge ${problem.difficulty}`}>
                {problem.difficulty}
              </span>
              {problem.topics.map((topic, index) => (
                <span key={index} className="topic-badge">{topic}</span>
              ))}
            </div>
            
            <div className="action-buttons-row">
              <button 
                className="solve-button"
                onClick={() => handleSolveProblem(problem.leetcodeUrl)}
              >
                <FaExternalLinkAlt /> Solve
              </button>
              
              <button 
                className="resource-btn video-btn"
                onClick={() => handleOpenVideo(problem.videoUrl)}
                title="Watch Video Solution"
              >
                <FaVideo />
              </button>
              
              <button 
                className="resource-btn notes-btn"
                onClick={() => handleOpenNotes(problem.notesUrl)}
                title="Read Notes/Article"
              >
                <FaBook />
              </button>
              
              <button 
                className={`resource-btn discussion-btn ${!problem.hasDiscussion ? 'disabled' : ''}`}
                onClick={() => problem.hasDiscussion && handleOpenDiscussion(problem.id)}
                title="View Discussion"
                disabled={!problem.hasDiscussion}
              >
                <FaComment />
              </button>
            </div>
            
            <div className="card-footer">
              <div className="companies-section">
                <span className="label">Companies:</span>
                <div className="companies-tags">
                  {problem.companies.map((company, index) => (
                    <span key={index} className="company-badge">{company}</span>
                  ))}
                </div>
              </div>
              
              <div className="status-row">
                <div className="status-dropdown">
                  <span className="status-icon"></span>
                  <span className="status-text">{problem.status}</span>
                  <FaChevronDown className="dropdown-icon" />
                </div>
                <span className="points-badge">{problem.points} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
              <span className={`difficulty-badge ${randomProblem.difficulty}`}>
                {randomProblem.difficulty}
              </span>
              {randomProblem.topics.map((topic, index) => (
                <span key={index} className="topic-badge">{topic}</span>
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
              <button className="modal-icon-btn" title="Watch Tutorial">
                <FaBook />
              </button>
              <button className="modal-icon-btn" title="Discuss">
                <FaComment />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;
