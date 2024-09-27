import React, { useState } from 'react';
import { deleteImage, updateImage } from '../api/imageAPI';

const ImageEdit = ({ image }) => {
  const [newFile, setNewFile] = useState(null);

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (newFile) {
      try {
        await updateImage(image.id, newFile);
        alert('이미지 수정 성공!');
      } catch (error) {
        console.error('이미지 수정 실패:', error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteImage(image.id);
      alert('이미지 삭제 성공!');
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
    }
  };

  return (
    <div>
      <img src={image.url} alt={image.name} width="100" />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default ImageEdit;
