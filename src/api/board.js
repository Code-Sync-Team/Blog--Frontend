import axios from 'axios';

const API_URL = 'http://15.165.121.152:8080';

//게시글 목록 조회
export const fetchPost = async () => {
    const response = await axios.get(`${API_URL}/api/boards`);
    return response.data;
}
//특정 게시글 조회
export const fetchPostById = async (boardId) => {
    const response = await axios.get(`${API_URL}/api/boards/{boardId}`);
    return response.data;
}
//게시글 생성
export const createPost = async(post) => {
    const response = await axios.post(`${API_URL}/api/boards`,post);
    return response.data;
}
//게시글 수정
export const updatePost = async(boardId, post) =>{
    const response = await axios.put(`${API_URL}/api/boards/{boardId}`,post);
    return response.data
} 
//게시글 삭제
export const deletePost = async(id) => {
    await axios.delete(`${API_URL}/api/boards/{boardId}`)
}

// 이미지 업로드 API 호출
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    return axios.post(`${API_URL}/api/v1/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
