import React, { useEffect, useState } from 'react';
import { useGetProductQuery, useUpdateProductMutation, useAddCommentMutation, useDeleteCommentMutation } from '../redux/products/productApiSlice';
import ProductFormModal from './ProductFormModal';
import CommentForm from './CommentForm';

const Product = ({ productId }) => {
  const { data: product, isLoading, isError, error } = useGetProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = async updatedProduct => {
    await updateProduct(updatedProduct);
    setShowEditModal(false);
  };

  const handleAddComment = async comment => {
    await addComment(comment);
  };

  const handleDeleteComment = async commentId => {
    await deleteComment(commentId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Count: {product.count}</p>
      <p>Weight: {product.weight}</p>
      <button onClick={() => setShowEditModal(true)}>Edit</button>

      {product.comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.description}</p>
          <p>{comment.date}</p>
          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
        </div>
      ))}
      <CommentForm productId={productId} onSubmit={handleAddComment} />

      {showEditModal && <ProductFormModal product={product} onClose={() => setShowEditModal(false)} onSubmit={handleEdit} />}
    </div>
  );
};

export default Product;
