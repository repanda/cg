import React, { useState, useEffect } from 'react';

import Login from './login';
import Dashboard from './DashboardContent';
import RapportProviders from '@/app/repport/reports';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated') || "false"));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard title='Report' setIsAuthenticated={setIsAuthenticated} content={() => <RapportProviders />} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
