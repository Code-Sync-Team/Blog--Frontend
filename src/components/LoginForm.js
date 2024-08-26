import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const LoginForm = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        //로그인 로직 추가
        console.log('이메일:',email);
        console.log('비밀번호:', password)
    };
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                type = "email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="아이디를 입력해주세요"
            />
            <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
            />
            <SubmitButton text="로그인" />
        </form>
    )
}


export default LoginForm;