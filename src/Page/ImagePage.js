import React from 'react';
import ImageUpload from '../components/ImageUpload';
import ImageList from '../components/ImageList';

const ImagePage = () => {
  return (
    <div>
      <h1>이미지 관리 페이지</h1>
      <ImageUpload />
      <ImageList />
    </div>
  );
};

export default ImagePage;