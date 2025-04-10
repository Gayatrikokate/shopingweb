
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <img src={product.image} alt={product.title} width="100" />
      <h2>{product.title}</h2>
      <p><strong>${product.price}</strong></p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
