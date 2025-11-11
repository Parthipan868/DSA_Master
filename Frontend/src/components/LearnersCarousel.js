import React from 'react';
import './LearnersCarousel.css';

const learnersData = [
  { name: 'Ravi Kumar', company: 'TCS Mobile', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Lalit Sharma', company: 'Deutsche Bank', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Jyoti Kiran Patil', company: 'Siemens', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Avish Mittal', company: 'Google', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { name: 'Anjali Verma', company: 'Microsoft', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Priya Singh', company: 'Amazon', image: 'https://randomuser.me/api/portraits/women/23.jpg' },
  { name: 'Rahul Mehta', company: 'Meta', image: 'https://randomuser.me/api/portraits/men/18.jpg' },
  { name: 'Sneha Patel', company: 'Apple', image: 'https://randomuser.me/api/portraits/women/36.jpg' }
];

const LearnersCarousel = () => {
  // Duplicate the array for infinite scroll effect
  const duplicatedLearners = [...learnersData, ...learnersData, ...learnersData];

  return (
    <section className="learners-section">
      <div className="learners-container">
        <h2 className="learners-title">
          <span className="learners-count">11,70,675+</span> Learners
        </h2>
        <p className="learners-subtitle">have excelled in their career through our platform</p>
        
        <div className="carousel">
          <div className="carousel-track">
            {duplicatedLearners.map((learner, index) => (
              <div key={index} className="learner-card">
                <img src={learner.image} alt={learner.name} className="learner-image" />
                <h3 className="learner-name">{learner.name}</h3>
                <p className="learner-company">{learner.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnersCarousel;
