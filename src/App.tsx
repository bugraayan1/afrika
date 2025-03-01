import React from 'react';
import Layout from './components/Layout';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App; 