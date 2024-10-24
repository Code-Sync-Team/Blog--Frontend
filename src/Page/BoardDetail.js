import React, { useEffect, useState } from 'react';
import { fetchPostById, deletePost } from '../api/board';
import { useNavigate, useParams } from 'react-router-dom';

const BoardDetail = () => {
    const {boardId} = useParams() //url에서 게시글 id 추출
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async ()=> {
            try {
                const data = await fetchPostById(boardId);
                setPost(data);
            }catch(error){
                console.error('게시글 불러오기 실패', error);
            }
        };
    getPost();},
    [boardId]);

    const handleDelete = async () => {
        try{
            await deletePost(boardId);
            alert('게시글이 삭제되었습니다');
            navigate('/boardList'); //삭제후 목록 페이지로 이동
        }catch(error){
            console.log('게시글 삭제 실패:' , error);
        }
    };
    if (!post) return <p>로딩 중</p>
    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={handleDelete}>삭제</button>
        </div>
    )
}
export default BoardDetail;