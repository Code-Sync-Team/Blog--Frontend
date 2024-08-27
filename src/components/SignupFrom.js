import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const SignupForm = ({ credentials, setCredentials, onSignup }) => {
    const [passwordConfirm,setPasswordConfirm] = useState('') //비밀번호 유효성 검사

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCredentials(prev => ({ ...prev, [name]: value }));
    };
    
    const handlePasswordConfirmChange = (e) => {
      setPasswordConfirm(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        //비밀번호와 비밀번호 확인 일치 여부 확인
        if (credentials.password !== passwordConfirm){
          alert('비밀번호가 일치하지 않습니다');
          return
        }
        
        onSignup(); // 부모 컴포넌트로부터 전달받은 회원가입 함수 호출
      };

    
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <InputField
        name="nickname"
        value={credentials.nickname}
        onChange={handleInputChange}
        placeholder="사용자 이름"
      />
      <InputField
        name="email"
        value={credentials.email}
        onChange={handleInputChange}
        placeholder="이메일"
      />
      <InputField
        name="name"
        value={credentials.name}
        onChange={handleInputChange}
        placeholder="아이디"
      />
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