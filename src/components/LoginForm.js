import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(email);

    if (!emailRegex.test(email)) {
      return '이메일 형식에 맞지 않습니다.';
    }
    if (hasKorean) {
      return '이메일 주소에는 한글을 포함할 수 없습니다.';
    }
    return ''; // 에러가 없으면 빈 문자열 반환
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 비밀번호 길이 검사
    if (password.length < 8) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    return ''; // 에러가 없으면 빈 문자열 반환
  };

  // 입력값 변경 시 유효성 검사
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
      const error = validateEmail(value);
      setEmailError(error);
    }

    if (name === 'password') {
      setPassword(value);
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이메일 유효성 검사
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      alert(emailValidationError); // 이메일 형식 오류 알림
      return;
    }

    // 비밀번호 유효성 검사
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      alert(passwordValidationError); // 비밀번호 형식 오류 알림
      return;
    }

    // 모든 검사가 통과한 경우 onLogin 호출
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="email"
        type="email"
        value={email}
        onChange={handleInputChange}
        placeholder="이메일을 입력해주세요"
      />
      <InputField
        name="password"
        type="password"
        value={password}
        onChange={handleInputChange}
        placeholder="비밀번호를 입력해주세요"
      />
      
      <SubmitButton text="로그인" />
    </form>
  );
};

export default LoginForm;
