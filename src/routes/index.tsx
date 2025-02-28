import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import CountryAnalysis from '../pages/CountryAnalysis';
import AgentMonitoring from '../pages/AgentMonitoring';
import TechnologyTransfer from '../pages/TechnologyTransfer';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/country-analysis" element={<CountryAnalysis />} />
      <Route path="/agents" element={<AgentMonitoring />} />
      <Route path="/transfer" element={<TechnologyTransfer />} />
    </Routes>
  );
};

export default AppRoutes; 