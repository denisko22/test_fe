import React from 'react';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this product?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default ConfirmDeleteModal;
