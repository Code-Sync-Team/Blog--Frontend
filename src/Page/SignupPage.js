import React, { useState } from 'react';
import SignupForm from '../components/SignupFrom';
import { signup } from '../api/auth.js';

const SignupPage = () => {
  const [credentials, setCredentials] = useState({ name: '', nickname: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false); // 회원가입 성공 여부 상태

  const handleSignup = async () => {
    try {
      console.log('회원가입요청데이터',credentials)  
      await signup(credentials);
      setIsSignupSuccessful(true); // 회원가입 성공 시 상태 변경
      // 회원가입 성공 시의 처리 (예: 로그인 페이지로 리다이렉션)
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="signup-page">
      {isSignupSuccessful ? ( // 회원가입 성공 여부에 따라 조건부 렌더링
        <div>
          <h1>회원가입에 성공했습니다!</h1>
          <p>로그인 페이지로 이동합니다...</p>
        </div>
      ) : (
        <>
          <h1>회원가입</h1>
          {error && <p className="error">{error}</p>}
          <SignupForm
            credentials={credentials}
            setCredentials={setCredentials}
            onSignup={handleSignup}
          />
        </>
      )}
    </div>
  );
};

export default SignupPage;
