import axios from 'axios';

const API_URL = 'http://15.165.121.152:8080';

export const login = async(credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/user/login`, credentials);
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        return token;
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      }
}

export const signup = async(credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/user/join`,credentials);
        //회원가입 성공시의 처리
        return response.data;
    }catch(error){
        console.error('회원가입 오류',error)
        throw error
    }
}
export const getProfile = async () => {
    try {
        const token = localStorage.getItem('authToken');  // 저장된 토큰을 가져옴
        const response = await axios.get(`${API_URL}/api/v1/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,  // 헤더에 토큰을 포함
            },
        });
        return response.data;  // 서버로부터 받은 사용자 정보
    } catch (error) {
        console.error('Failed to fetch profile', error);
        throw error;
    }
}