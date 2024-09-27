import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Page/LoginPage'
import SignupPage from './Page/SignupPage';
import ImagePage from './Page/ImagePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/imageup' element = {<ImagePage />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
