// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Header from './components/Header';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <Router>
      {localStorage.getItem('token') && <Header cartCount={cart.length} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
