


import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 👈 added Link
import api from '../api/axios';
import { AuthContext } from '../context/authContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={brandText}>SANSERA</h1>
        <h2 style={titleStyle}>Login</h2>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          style={inputStyle}
          required
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>Login</button>

        {/* 👇 Signup link */}
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Don’t have an account?{' '}
          <Link to="/signup" style={{ color: 'rgba(212, 149, 227, 1)', textDecoration: 'underline' }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

const pageStyle = {
  backgroundColor: '#ffffff', // white background
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI',
  color: '#003366' // deep blue text (professional tone)
};

const formStyle = {
  backgroundColor: '#f5faff', // very light blue-gray
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 51, 102, 0.2)', // soft blue shadow
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '400px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#0078d7', // strong Sansera blue
  fontSize: '1.8rem'
};

const inputStyle = {
  backgroundColor: '#ffffff',
  color: '#003366',
  border: '1px solid #0078d7',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '20px',
  fontSize: '1rem'
};

const buttonStyle = {
  backgroundColor: '#0078d7', // brand-aligned blue
  color: '#ffffff',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem'
};

const brandText = {
  fontSize: '2.4rem',
  fontWeight: 'bold',
  color: '#0078d7',
  letterSpacing: '1.5px',
};
