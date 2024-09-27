import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // 서버에서 이미지 목록 가져오기
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/v1/images');
        setImages(response.data);
      } catch (error) {
        console.error('이미지 목록 불러오기 실패:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>업로드된 이미지</h2>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.url} alt={image.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
