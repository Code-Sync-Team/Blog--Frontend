import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Page/LoginPage'
import SignupPage from './Page/SignupPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
