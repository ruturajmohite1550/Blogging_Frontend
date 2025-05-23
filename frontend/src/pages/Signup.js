import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../utils/auth';

const SITE_KEY = '6LezvUUrAAAAAPOilTfAUP_k45yMCqibfY9x2unj'; // Use your actual reCAPTCHA site key

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    try {
      const res = await api.post('/signup', {
        username,
        email,
        password,
        recaptchaToken
      });

      saveAuth(res.data.token, {
        id: res.data.userId,
        username: res.data.username
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={token => setRecaptchaToken(token)}
        />
      </div>
      <button className="btn btn-primary">Signup</button>
    </form>
  );
}

export default Signup;
