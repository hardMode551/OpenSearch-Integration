import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import styles from '../styles/Json.module.scss';

const CommentDetails = () => {
  const { id } = useParams();
  const openSearchData = useSelector((state: RootState) => state.openSearch.data);
  const comment = openSearchData.find((item) => item.id === parseInt(id!));

  if (!comment) {
    return <div>Комментарий не найден</div>;
  }

  const commentJson = JSON.stringify(comment, null, 2); // Форматированный JSON с отступами

  return (
    <div className={styles.root}>
      <h1>Comment Detail Page</h1>
      <h2>Comment ID: {comment.id}</h2>
      <pre>{commentJson}</pre>
    </div>
  );
};

export default CommentDetails;
