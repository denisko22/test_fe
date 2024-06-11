import React, { useState } from 'react';
import { useGetProductsQuery, useAddNewProductMutation, useDeleteProductMutation } from '../redux/products/productApiSlice';
import ProductFormModal from './ProductFormModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const ProductList = () => {
  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  const [addNewProduct] = useAddNewProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDelete = async () => {
    await deleteProduct({ id: productToDelete.id });
    setShowDeleteModal(false);
  };

  const handleAddOrEditSubmit = async product => {
    await addNewProduct(product);
    setShowAddModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.status}</div>;

  return (
    <div>
      <button onClick={() => setShowAddModal(true)}>Add Product</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.count}
            <button onClick={() => {
              setProductToDelete(product);
              setShowDeleteModal(true);
            }}>Delete</button>
          </li>
        ))}
      </ul>

      {showAddModal && <ProductFormModal onClose={() => setShowAddModal(false)} onSubmit={handleAddOrEditSubmit} />}
      {showDeleteModal && <ConfirmDeleteModal onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />}
    </div>
  );
};

export default ProductList;
