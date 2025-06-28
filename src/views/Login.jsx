// src/views/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import "./Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import { baseUrl } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { user, login, loginWithGoogle, checkAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login tradicional con email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      if (data.error) {
        toast.error("Usuario no encontrado", {
          position: 'top-center',
          autoClose: 3500,
          theme: 'colored',
        });
        return;
      }
      sessionStorage.setItem('access_token', data.access_token);
      const authData = await checkAuth();
      if (authData.error) {
        navigate('/login', { replace: true });
      } else {
        navigate('/profile');
      }
    } catch (err) {
      toast.error("Error de conexión", {
        position: 'top-center',
        autoClose: 3500,
        theme: 'colored',
      });
    }
  };

  if (user) return <Navigate to="/profile" replace />;

  return (
    <div className='w-100 mx-auto' style={{ minHeight: '100vh', padding: '90px' }}>
      <div className="view-container">
        <div className="login-box">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                className={`form-control`}
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3 input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                className={`form-control`}
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <a href="#" className="text-decoration-none mb-3 " onClick={() => navigate('/forgot')}>
                Forgot Password?
              </a>
            </div>
            <button className="btn btn-primary mb-3 w-100" type="submit">
              Login
            </button>
          {/*   <GoogleLogin 
              onSuccess={(response) => {
                fetch(`${baseUrl}/api/verificar-token`, {
                  method: 'POST',
                  body: JSON.stringify({ token: response.credential }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then((response) => response.json())
                  .then((data) => {
                    sessionStorage.setItem('access_token', data.access_token);
                    sessionStorage.setItem('tokenExpirationTime', Date.now() + data.expires_in);
                    const authData = checkAuth();
                    if (authData.error) {
                      navigate('/login', { replace: true });
                    } else {
                      navigate('/profile');
                    }
                  });
              }}
              onError={() => {
                console.log("Error de Authentication");
              }}
            /> */}
          </form>
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <a href="#" className="text-decoration-none" onClick={() => navigate('/register')}>
              Register
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
