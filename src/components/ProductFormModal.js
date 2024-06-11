import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../redux/products/productSlice';

const ProductFormModal = ({ product = {}, onClose, onSubmit }) => {
  const [name, setName] = useState(product.name || '');
  const [count, setCount] = useState(product.count || 0);
  const [width, setWidth] = useState(product.size?.width || 0);
  const [height, setHeight] = useState(product.size?.height || 0);
  const [weight, setWeight] = useState(product.weight || '');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newProduct = {
      id: product.id || Date.now(),
      name,
      count,
      size: { width, height },
      weight,
    };

    if (product.id) {
      dispatch(updateProduct(newProduct));
    } else {
      dispatch(addProduct(newProduct));
    }

    if (onSubmit) {
      onSubmit(newProduct);
    }
    onClose();
  };

  return (
    <div className="modal">
      <h2>{product.id ? 'Edit Product' : 'Add Product'}</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))} placeholder="Count" required />
      <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} placeholder="Width" required />
      <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} placeholder="Height" required />
      <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" required />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ProductFormModal;
