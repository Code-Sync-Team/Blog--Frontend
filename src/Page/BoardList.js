import React, { useEffect, useState } from 'react';
import { fetchPost, createPost } from '../api/board';
import ReactQuill from 'react-quill';
import styles from '../Styles/BoardList.modules.css'
import 'react-quill/dist/quill.snow.css'; //Quill 에디터 기본 스타일
import { Link, useNavigate} from 'react-router-dom';

const BoardList = () => {
    const [posts,setPosts] = useState([]); //게시글 목록 상태
    const [title, setTitle] = useState('') //게시글 제목 상태
    const [content, setContent] = useState('') //quill 에디터 내용 상태
    const navigate = useNavigate();

    //게시글 목록 불러오기
    useEffect(() => {
        const getPosts = async () => {
            try{
                const data = await fetchPost();
                setPosts(data);
            }catch(error){
                console.log('게시글 목록 불러오기 실패', error);
            }
        };
        getPosts();
    },[]);
    //게시글 작성함수

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await createPost({title, content}); //api 호출
            alert('게시글이 작성되었습니다.');
            setTitle('') //입력값 초기화
            setContent('');
            const updatedPost = await fetchPost(); //목록 갱신
            setPosts(updatedPost);
        }catch(error){
            console.log('게시글 작성 실패', error);
        }
    }
    return(
        <div className='board-container'>
      <h1>게시판</h1>

      {/* 게시글 목록 */}
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '20px' }}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} /> {/* HTML 출력 */}
          </li>
        ))}
      </ul>

      <hr />

      {/* 게시글 작성 폼 */}
      <h2>새 게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div className="editor-container">
            <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="내용을 입력하세요"
            style={{ height: '300px', width: '100%'}} /* 에디터의 최소 높이를 설정 */
        />
        </div>
      </form>
    </div>
    
  );
};


export default BoardList;