import React from 'react';
import Hero from '../components/Hero';
import LearnersCarousel from '../components/LearnersCarousel';
import FAQ from '../components/FAQ';
import Community from '../components/Community';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <LearnersCarousel />
      <FAQ />
      <Community />
      <Footer />
    </div>
  );
};

export default Home;
