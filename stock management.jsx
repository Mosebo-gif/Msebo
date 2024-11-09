// src/StockManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockManagement.css';

function StockManagement({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stock');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name, category, quantity, price };
    try {
      const response = await axios.post('http://localhost:5000/api/stock/add', newProduct);
      setProducts([...products, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setQuantity('');
    setPrice('');
    setEditId(null);
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setName(product.name);
    setCategory(product.category);
    setQuantity(product.quantity);
    setPrice(product.price);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = { name, category, quantity, price };
    try {
      await axios.put(`http://localhost:5000/api/stock/${editId}`, updatedProduct);
      setProducts(
        products.map((product) =>
          product._id === editId ? { ...product, ...updatedProduct } : product
        )
      );
      resetForm();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stock/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="stock-management">
      <h2>Stock Management</h2>
      <form onSubmit={editId ? handleUpdate : addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (Maluti)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update Product' : 'Add Product'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price (Maluti)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default StockManagement;
