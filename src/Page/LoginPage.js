import React, { useState } from 'react';
import '../Styles/index.css';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async (email, password) => {
    try {
      // 로그인 로직 추가
      console.log('이메일:', email);
      console.log('비밀번호:', password);

      setIsLoginSuccessful(true);
      setLoginMessage('로그인에 성공했습니다!');
    } catch (err) {
      console.error('로그인 실패', err);
      setLoginMessage('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className='login-page'>
      {isLoginSuccessful ? (
        <div className='login-success'>
          <h1>{loginMessage}</h1>
        </div>
      ) : (
        <div className='login-container'>
          <h1>반갑습니다! 로그인을 해주세요!</h1>
          <h2>로그인</h2>
          <LoginForm onLogin={handleLogin} />
          <div className='signup-link'>
            <p>회원가입이 필요하신가요?</p>
            <Link to="/signup" className='signup-button'>회원가입 하기</Link>
          </div>
        </div>
      )}
    </div>
  );
};


export default LoginPage;
