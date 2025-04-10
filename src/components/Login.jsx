
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
    
      const loginRes = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!loginRes.ok) throw new Error('Login failed');
      const loginData = await loginRes.json();

      localStorage.setItem('token', loginData.token);

     
      const usersRes = await fetch('https://fakestoreapi.com/users');
      const users = await usersRes.json();
      const user = users.find((u) => u.username === username);

      if (user) {
        localStorage.setItem('userId', user.id);
      }

      navigate('/products');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
