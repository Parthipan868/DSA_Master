import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Discussion from './pages/Discussion';
import Learn from './pages/Learn';
import Companies from './pages/Companies';
import CompanyProblems from './pages/CompanyProblems';
import Profile from './pages/Profile';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Auth Routes (No Navbar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main Routes (With Navbar) */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/company/:companyName" element={<CompanyProblems />} />
                <Route path="/problem/:problemId/discussion" element={<Discussion />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
