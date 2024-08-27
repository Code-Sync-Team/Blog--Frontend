import React from 'react';
import '../Styles/index.css';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm'


const LoginPage = () => {
    return (
      <>
        <div className='login-container'>
          <h2>로그인</h2>
          <LoginForm />
        </div>
        <div className='signup-link'>
          <p>회원가입이 필요하신가요?</p>
          <Link to="/signup" className='signup-button'>회원가입 하기</Link>
        </div>
      </>
    );
  };
  

export default LoginPage;