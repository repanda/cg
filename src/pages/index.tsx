import React, { useState, useEffect } from 'react';

import Login from './login';
import Dashboard from './DashboardContent';
import Orders from './Orders';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated') || "false"));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard title='Report' setIsAuthenticated={setIsAuthenticated} content={() => <Orders />} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
