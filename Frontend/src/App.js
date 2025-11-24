import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Discussion from './pages/Discussion';
import Learn from './pages/Learn';
import Companies from './pages/Companies';
import CompanyProblems from './pages/CompanyProblems';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/company/:companyName" element={<CompanyProblems />} />
          <Route path="/problem/:problemId/discussion" element={<Discussion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
