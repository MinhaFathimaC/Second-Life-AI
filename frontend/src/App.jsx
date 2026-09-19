import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import CommunityImpact from './pages/CommunityImpact';
import AiHowItWorks from './pages/AiHowItWorks';
import LearnAct from './pages/LearnAct';
import SdgImpact from './pages/SdgImpact';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/history" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<CommunityImpact />} />
            <Route path="/ai-how-it-works" element={<AiHowItWorks />} />
            <Route path="/learn" element={<LearnAct />} />
            <Route path="/sdg" element={<SdgImpact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
