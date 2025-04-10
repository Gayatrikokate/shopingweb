
import React, { useState } from 'react';

const Cart = ({ cart, setCart }) => {
  const [showMsg, setShowMsg] = useState(false);

  const updateQty = (id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const checkout = () => {
    setCart([]);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 4000);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Cart</h2>
      {showMsg && <div style={{ color: 'green' }}>Order placed successfully!</div>}
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <>
          {cart.map(item => (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <p>${item.price} x 
                <input type="number" value={item.qty} onChange={e => updateQty(item.id, Number(e.target.value))} style={{ width: '60px', marginLeft: '10px' }} />
              </p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
