import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Companies.css';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleCompanyClick = (companyName) => {
    navigate(`/company/${companyName.toLowerCase()}`);
  };
  
  // Sample data for companies - matching the image
  const companies = [
    {
      id: 1,
      name: 'Amazon',
      logo: 'https://logo.clearbit.com/amazon.com',
      problems: 35,
      solved: 0,
    },
    {
      id: 2,
      name: 'Google',
      logo: 'https://logo.clearbit.com/google.com',
      problems: 28,
      solved: 0,
    },
    {
      id: 3,
      name: 'Microsoft',
      logo: 'https://img.icons8.com/color/480/microsoft.png',
      problems: 25,
      solved: 0,
    },
    {
      id: 4,
      name: 'Facebook',
      logo: 'https://logo.clearbit.com/facebook.com',
      problems: 22,
      solved: 0,
    },
    {
      id: 5,
      name: 'Apple',
      logo: 'https://logo.clearbit.com/apple.com',
      problems: 18,
      solved: 0,
    },
    {
      id: 6,
      name: 'Uber',
      logo: 'https://logo.clearbit.com/uber.com',
      problems: 15,
      solved: 0,
    },
    {
      id: 7,
      name: 'Netflix',
      logo: 'https://logo.clearbit.com/netflix.com',
      problems: 20,
      solved: 0,
    },
    {
      id: 8,
      name: 'Twitter',
      logo: 'https://logo.clearbit.com/twitter.com',
      problems: 18,
      solved: 0,
    },
    {
      id: 9,
      name: 'LinkedIn',
      logo: 'https://logo.clearbit.com/linkedin.com',
      problems: 22,
      solved: 0,
    },
    {
      id: 10,
      name: 'Airbnb',
      logo: 'https://logo.clearbit.com/airbnb.com',
      problems: 16,
      solved: 0,
    },
    {
      id: 11,
      name: 'Adobe',
      logo: 'https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg',
      problems: 19,
      solved: 0,
    },
    {
      id: 12,
      name: 'Oracle',
      logo: 'https://logo.clearbit.com/oracle.com',
      problems: 25,
      solved: 0,
    },
  ];
  
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="companies-container">
      <div className="companies-header">
        <h1>Company Questions</h1>
        <span className="subtitle">Practice problems asked by top tech companies</span>
      </div>
      
      <div className="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21L16.65 16.65" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="companies-grid">
        {filteredCompanies.map((company) => {
          const progress = Math.round((company.solved / company.problems) * 100);
          
          return (
            <div 
          key={company.id} 
          className="company-card"
          onClick={() => handleCompanyClick(company.name)}
          style={{ cursor: 'pointer' }}
        >
              <div className="company-header">
                <div className="company-logo-container">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    className="company-logo" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/50';
                    }}
                  />
                </div>
                <div className="company-info">
                  <h3 className="company-name">{company.name}</h3>
                  <p className="problems-count">{company.problems} problems</p>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-info">
                  <span>Progress</span>
                  <span className="progress-percentage">{Math.round((company.solved / company.problems) * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${progress > 0 ? 'has-progress' : ''}`} 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Companies;