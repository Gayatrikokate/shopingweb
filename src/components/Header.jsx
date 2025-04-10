
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '1rem', backgroundColor: '#007bff', color: 'white'
    }}>
      <nav>
        <Link to="/products" style={{ marginRight: '1rem', color: 'white' }}>Home</Link>
        <Link to="/cart" style={{ marginRight: '1rem', color: 'white' }}>
          Cart ({cartCount})
        </Link>
      </nav>
      <button onClick={handleLogout} style={{
        background: 'white', color: '#007bff',
        padding: '0.5rem 1rem', border: 'none', borderRadius: '4px'
      }}>
        Logout
      </button>
    </header>
  );
};

export default Header;
