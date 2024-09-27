import React, { useState } from 'react';
import { uploadImage } from '../api/auth';

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const response = await uploadImage(file);
        alert('이미지 업로드 성공!');
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">업로드</button>
    </form>
  );
};

export default ImageUpload;
