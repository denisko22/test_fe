import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/comments/commentSlice';

const CommentForm = ({ productId }) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newComment = {
      id: Date.now(),
      productId,
      description,
      date: new Date().toLocaleString(),
    };
    
    dispatch(addComment(newComment));
    setDescription('');
  };

  return (
    <div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a comment"></textarea>
      <button onClick={handleSubmit}>Add Comment</button>
    </div>
  );
};

export default CommentForm;
