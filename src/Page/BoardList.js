import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchPost, createPost, uploadImage } from '../api/board';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const quillRef = useRef(null); // Quill 인스턴스 참조

  // 게시글 목록 불러오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPost();
        setPosts(data);
      } catch (error) {
        console.error('게시글 목록 불러오기 실패:', error);
      }
    };
    getPosts();
  }, []);

  // Quill 인스턴스가 마운트된 후 이미지 핸들러 연결
  useEffect(() => {
    const quill = quillRef.current.getEditor(); // Quill 인스턴스 가져오기
    const toolbar = quill.getModule('toolbar'); // 툴바 모듈 가져오기

    toolbar.addHandler('image', imageHandler); // 이미지 핸들러 연결
  }, []);

  const handleContentChange = (value) => {
    setContent(value); // 에디터 내용 상태 업데이트
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        const url = await uploadImage(file); // 업로드 후 URL 반환
        const quill = quillRef.current.getEditor(); // Quill 인스턴스 가져오기

        const range = quill.getSelection(true); // 현재 커서 위치 가져오기
        quill.insertEmbed(range.index, 'image', url); // 이미지 삽입
        quill.setSelection(range.index + 1); // 이미지 삽입 후 커서를 다음으로 이동
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image'], // 이미지 버튼 추가
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content });
      alert('게시글이 작성되었습니다.');
      setTitle('');
      setContent('');
      const updatedPosts = await fetchPost();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  return (
    <div className="board-container">
      <h1>게시판</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </li>
        ))}
      </ul>

      <hr />

      <h2>새 게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <ReactQuill
          ref={quillRef} // Quill 인스턴스에 대한 ref 설정
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          placeholder="내용을 입력하세요"
          style={{ height: '300px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ marginTop: '70px' }}>
          작성하기
        </button>
      </form>
    </div>
  );
};

export default BoardList;
