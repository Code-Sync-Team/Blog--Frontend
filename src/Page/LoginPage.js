import React from 'react';
import '../Styles/index.css';
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
    return  (
        <div className='login-container'>
            <h2>로그인</h2>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;