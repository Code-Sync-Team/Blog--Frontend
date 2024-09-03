import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import { signup, checkEmailDuplicate } from '../api/auth.js';

const SignupPage = () => {
  const [credentials, setCredentials] = useState({ nickname: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleSignup = async () => {
    try {
      console.log('회원가입요청데이터', credentials);
      await signup(credentials);
      setIsSignupSuccessful(true);
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleCheckEmailDuplicate = async () => {
    setIsChecking(true);
    try {
      const response = await checkEmailDuplicate(credentials.email);
      alert(response)
      setIsEmailDuplicate(response.isDuplicate);  // 응답에 따라 상태 설정
      setError(response.isDuplicate ? '이메일이 이미 사용 중입니다.' : '');
    } catch (err) {
      console.error('이메일 중복 확인 오류:', err);
      setError('이메일 중복 확인에 실패했습니다.');
    } finally {
      setIsChecking(false);
    }
  };
  

  return (
    <div className="signup-page">
      {isSignupSuccessful ? (
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
            onCheckEmailDuplicate={handleCheckEmailDuplicate}
            isEmailDuplicate={isEmailDuplicate}
            isChecking={isChecking}
          />
        </>
      )}
    </div>
  );
};

export default SignupPage;
