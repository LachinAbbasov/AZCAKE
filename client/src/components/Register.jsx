import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../slices/userSlice/';
import { useNavigate } from 'react-router-dom';
import '../../Scss/register.scss'; 
import '../../Scss/logres.scss';
import '../../Scss/responsivedesign.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, token } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
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
      <h2 className="heading">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <label htmlFor="name" className="label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>
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
          {/* Göz ikonu */}
          <span
            className="eye-icon"
            onMouseDown={handleMouseDown} // Basılı tutma
            onMouseUp={handleMouseUp} // Bırakma
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" disabled={status === 'loading'} className="button">
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Register;
