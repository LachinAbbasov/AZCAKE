import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/userSlice/';
import { useNavigate } from 'react-router-dom';
import '../../Scss/login.scss'; 
import '../../Scss/logres.scss';
import '../../Scss/responsivedesign.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, token } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (token) {
    navigate('/dashboard');
  }

  const handleMouseDown = () => {
    setShowPassword(true); 
  };

  const handleMouseUp = () => {
    setShowPassword(false); 
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password" className="label">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
         
          <span
            className="eye-icon"
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" disabled={status === 'loading'} className="button">
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
