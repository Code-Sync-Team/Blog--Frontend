import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Page/LoginPage'
import SignupPage from './Page/SignupPage';
import BoardList from './Page/BoardList';
import BoardDetail from './Page/BoardDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/boardList' element = {<BoardList />}/>
          <Route path="/boardDetail/:boardId" element={<BoardDetail />} /> {/* 게시글 상세 페이지 라우트 추가 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
