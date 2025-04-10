
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleCategory = async (category) => {
    if (!category) return setFiltered(products);

    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    setFiltered(data);
  };

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFiltered(products.filter(p => p.title.toLowerCase().includes(val)));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Products</h2>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <select onChange={e => handleCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          style={{ flex: '1', padding: '0.5rem' }}
        />
      </div>

      <div className="products-container">
        {filtered.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
