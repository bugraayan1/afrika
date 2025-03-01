import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import CountryAnalysis from '../pages/CountryAnalysis';
import AgentMonitoring from '../pages/AgentMonitoring';
import TechnologyTransfer from '../pages/TechnologyTransfer';
import AgentProfile from '../pages/AgentProfile';
import About from '../pages/About';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/country-analysis" element={<CountryAnalysis />} />
      <Route path="/agents" element={<AgentMonitoring />} />
      <Route path="/agents/:id" element={<AgentProfile />} />
      <Route path="/transfer" element={<TechnologyTransfer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 