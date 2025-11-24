import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CompanyProblems.css';

// Sample data for company problems
const companyProblems = {
  'amazon': [
    { id: 1, title: 'Two Sum', difficulty: 'easy', tags: ['arrays', 'hash table'] },
    { id: 2, title: 'Valid Parentheses', difficulty: 'easy', tags: ['stacks', 'queues'] },
    { id: 3, title: '3Sum', difficulty: 'medium', tags: ['arrays', 'two pointers'] },
    { id: 4, title: 'Merge Intervals', difficulty: 'medium', tags: ['arrays', 'sorting'] },
    { id: 5, title: 'Longest Common Subsequence', difficulty: 'medium', tags: ['dynamic programming'] },
  ],
  'google': [
    { id: 1, title: 'Two Sum', difficulty: 'easy', tags: ['arrays', 'hash table'] },
    { id: 2, title: 'Longest Common Subsequence', difficulty: 'medium', tags: ['dynamic programming'] },
    { id: 3, title: 'Merge Intervals', difficulty: 'medium', tags: ['arrays', 'sorting'] },
    { id: 4, title: 'Word Break', difficulty: 'medium', tags: ['dynamic programming'] },
    { id: 5, title: 'LRU Cache', difficulty: 'hard', tags: ['design', 'hash table'] },
  ],
  'microsoft': [
    { id: 1, title: 'Reverse Linked List', difficulty: 'easy', tags: ['linked list'] },
    { id: 2, title: 'Binary Tree Level Order Traversal', difficulty: 'medium', tags: ['tree', 'BFS'] },
    { id: 3, title: 'Word Search', difficulty: 'medium', tags: ['array', 'backtracking'] },
    { id: 4, title: 'Course Schedule', difficulty: 'medium', tags: ['graph', 'topological sort'] },
    { id: 5, title: 'Median of Two Sorted Arrays', difficulty: 'hard', tags: ['array', 'binary search'] },
  ],
  'facebook': [
    { id: 1, title: 'Valid Palindrome', difficulty: 'easy', tags: ['two pointers', 'string'] },
    { id: 2, title: 'Add Two Numbers', difficulty: 'medium', tags: ['linked list', 'math'] },
    { id: 3, title: 'Merge k Sorted Lists', difficulty: 'hard', tags: ['linked list', 'heap'] },
    { id: 4, title: 'Clone Graph', difficulty: 'medium', tags: ['graph', 'BFS', 'DFS'] },
    { id: 5, title: 'Word Break II', difficulty: 'hard', tags: ['dynamic programming', 'backtracking'] },
  ],
  'apple': [
    { id: 1, title: 'Reverse Integer', difficulty: 'easy', tags: ['math'] },
    { id: 2, title: 'Group Anagrams', difficulty: 'medium', tags: ['hash table', 'string'] },
    { id: 3, title: 'LRU Cache', difficulty: 'hard', tags: ['design', 'hash table'] },
    { id: 4, title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', tags: ['hash table', 'two pointers'] },
    { id: 5, title: '3Sum', difficulty: 'medium', tags: ['array', 'two pointers'] },
  ],
  'netflix': [
    { id: 1, title: 'Group Shifted Strings', difficulty: 'medium', tags: ['hash table', 'string'] },
    { id: 2, title: 'Longest Substring with At Most K Distinct Characters', difficulty: 'medium', tags: ['hash table', 'sliding window'] },
    { id: 3, title: 'Design Tic-Tac-Toe', difficulty: 'medium', tags: ['design'] },
    { id: 4, title: 'Next Closest Time', difficulty: 'medium', tags: ['string'] },
    { id: 5, title: 'Design Hit Counter', difficulty: 'medium', tags: ['design'] },
  ],
  'twitter': [
    { id: 1, title: 'Design Twitter', difficulty: 'medium', tags: ['hash table', 'design'] },
    { id: 2, title: 'Find All Anagrams in a String', difficulty: 'medium', tags: ['hash table', 'sliding window'] },
    { id: 3, title: 'Design Hit Counter', difficulty: 'medium', tags: ['design'] },
    { id: 4, title: 'Text Justification', difficulty: 'hard', tags: ['string'] },
    { id: 5, title: 'Maximal Square', difficulty: 'medium', tags: ['dynamic programming'] },
  ],
  'linkedin': [
    { id: 1, title: 'Maximum Subarray', difficulty: 'easy', tags: ['array', 'divide and conquer'] },
    { id: 2, title: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', tags: ['tree', 'design'] },
    { id: 3, title: 'Minimum Window Substring', difficulty: 'hard', tags: ['hash table', 'two pointers'] },
    { id: 4, title: 'Course Schedule II', difficulty: 'medium', tags: ['graph', 'topological sort'] },
    { id: 5, title: 'Design TinyURL', difficulty: 'medium', tags: ['hash table', 'design'] },
  ],
  'airbnb': [
    { id: 1, title: 'Two Sum - Less than or equal to target', difficulty: 'easy', tags: ['array', 'two pointers'] },
    { id: 2, title: 'Flatten 2D Vector', difficulty: 'medium', tags: ['design'] },
    { id: 3, title: 'Pancake Sorting', difficulty: 'medium', tags: ['array', 'sort'] },
    { id: 4, title: 'Alien Dictionary', difficulty: 'hard', tags: ['graph', 'topological sort'] },
    { id: 5, title: 'Word Search II', difficulty: 'hard', tags: ['trie', 'backtracking'] },
  ],
  'adobe': [
    { id: 1, title: 'Reverse Words in a String', difficulty: 'medium', tags: ['string'] },
    { id: 2, title: 'K Closest Points to Origin', difficulty: 'medium', tags: ['heap', 'sort'] },
    { id: 3, title: 'Subarray Sum Equals K', difficulty: 'medium', tags: ['array', 'hash table'] },
    { id: 4, title: 'Meeting Rooms II', difficulty: 'medium', tags: ['heap', 'greedy'] },
    { id: 5, title: 'Minimum Window Subsequence', difficulty: 'hard', tags: ['dynamic programming'] },
  ],
  'oracle': [
    { id: 1, title: 'Find All Numbers Disappeared in an Array', difficulty: 'easy', tags: ['array'] },
    { id: 2, title: 'Design Search Autocomplete System', difficulty: 'hard', tags: ['trie', 'design'] },
    { id: 3, title: 'Maximal Square', difficulty: 'medium', tags: ['dynamic programming'] },
    { id: 4, title: 'Word Ladder', difficulty: 'hard', tags: ['BFS'] },
    { id: 5, title: 'Alien Dictionary', difficulty: 'hard', tags: ['graph', 'topological sort'] },
  ],
  'uber': [
    { id: 1, title: 'Valid Sudoku', difficulty: 'medium', tags: ['hash table'] },
    { id: 2, title: 'Group Anagrams', difficulty: 'medium', tags: ['hash table', 'string'] },
    { id: 3, title: 'Word Pattern', difficulty: 'easy', tags: ['hash table'] },
    { id: 4, title: 'Minimum Window Substring', difficulty: 'hard', tags: ['hash table', 'two pointers'] },
    { id: 5, title: 'Word Break II', difficulty: 'hard', tags: ['dynamic programming', 'backtracking'] },
  ]
};

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
  const problems = companyProblems[companyName] || [];
  const totalProblems = problems.length;
  const solvedProblems = 0; // This would come from user data in a real app
  
  const handleBackClick = () => {
    navigate('/companies');
  };

  const handleProblemClick = (problemId) => {
    // Navigate to the problem page
    navigate(`/problem/${problemId}`);
  };

  return (
    <div className="company-problems-container">
      <div className="company-problems-header">
        <button onClick={handleBackClick} className="back-button">
          ← Back to All Companies
        </button>
        <h1>Company Questions</h1>
        <p className="subtitle">Practice problems asked by top tech companies</p>
        
        <div className="company-info">
          <img 
            src={companyLogos[companyName] || 'https://via.placeholder.com/50'} 
            alt={`${displayName} logo`} 
            className="company-logo"
          />
          <div>
            <h2>{displayName} Problems</h2>
            <p className="solved-count">{solvedProblems}/{totalProblems} solved</p>
          </div>
        </div>
      </div>
      
      <div className="problems-grid">
        {problems.map((problem) => (
          <div key={problem.id} className="problem-card">
            <div className="problem-content">
              <h3>{problem.title}</h3>
              <div className="problem-meta">
                <span className={`difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
                <div className="tags">
                  {problem.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="problem-actions">
              <button 
                className="solve-button"
                onClick={() => handleProblemClick(problem.id)}
              >
                Solve
              </button>
              <div className="action-icons">
                <button className="icon-button">
                  <i className="fas fa-video"></i>
                </button>
                <button className="icon-button">
                  <i className="fas fa-comment"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProblems;
