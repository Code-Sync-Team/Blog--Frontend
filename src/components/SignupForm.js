import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const SignupForm = ({ credentials, setCredentials, onSignup, onCheckEmailDuplicate, isEmailDuplicate, isChecking }) => {
  const [passwordConfirm, setPasswordConfirm] = useState(''); // 비밀번호 확인
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 유효성 검사
  const [emailError, setEmailError] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 여부 상태
  
  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    const isLengthValid = password.length >= 8 && password.length <= 20;

    if (!hasLetter || !hasNumber || !hasSpecialChar) {
      return '비밀번호는 영문자, 숫자, 특수 문자를 포함해야 합니다.';
    }
    if (!hasNoSpaces) {
      return '비밀번호에 공백이 포함될 수 없습니다.';
    }
    if (!isLengthValid) {
      return '비밀번호는 8자 이상 20자 이하이어야 합니다.';
    }
    return ''; // 에러가 없으면 빈 문자열 반환
  }

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
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));

    // 이메일 입력 시 유효성 검사
    if (name === 'email') {
      const error = validateEmail(value);
      setEmailError(error);
    }

    // 비밀번호 입력 시 유효성 검사
    if (name === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  }

  const handleCheckEmailDuplicate = async () => {
    // 이메일 유효성 검사
    const emailValidationError = validateEmail(credentials.email);
    if (emailValidationError) {
      alert(emailValidationError);
      return;
    }

    setIsEmailChecked(true);
    await onCheckEmailDuplicate(); // 중복 확인 API 호출
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 비밀번호 유효성 검사
    if (passwordError) {
      alert('비밀번호 형식에 맞게 입력해주세요!');
      return;
    }

    // 비밀번호와 비밀번호 확인 일치 여부 확인
    if (credentials.password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    // 이메일 중복 확인 여부 확인
    if (!isEmailChecked) {
      alert('이메일 중복 확인 버튼을 눌러주세요.');
      return;
    }

    // 이메일 유효성 검사
    if (emailError) {
      alert(emailError);
      return;
    }

    // 이메일 중복 확인 통과 후 회원가입 처리
    if (isEmailDuplicate === false) {
      onSignup();
    } else if (isEmailDuplicate === true) {
      alert('사용중인 이메일입니다.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <InputField
        name="nickname"
        value={credentials.nickname}
        onChange={handleInputChange}
        placeholder="사용자 이름"
      />
      <div className="email-container">
        <InputField
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          placeholder="이메일"
        />
        <button 
          type="button" 
          onClick={handleCheckEmailDuplicate} 
          disabled={isChecking}
        >
          이메일 중복 확인
        </button>
      </div>
      <InputField
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
        placeholder="비밀번호"
        type='password'
      />
      <InputField
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
        placeholder="비밀번호 확인"
        type='password'
      />
      <SubmitButton text="회원가입" />
    </form>
  );
};

export default SignupForm;
