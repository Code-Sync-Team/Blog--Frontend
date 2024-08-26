import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Page/LoginPage'

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to My App</h1>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
