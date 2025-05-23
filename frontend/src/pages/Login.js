import React, { useState, useRef } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../utils/auth';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showCaptcha && !captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/login', {
        email,
        password,
        token: captchaToken // send captcha token only if available
      });

      saveAuth(res.data.token, {
        id: res.data.userId,
        username: res.data.username
      });

      if (captchaRef.current) {
        captchaRef.current.reset();
      }
      setCaptchaToken(null);
      setShowCaptcha(false);

      navigate('/dashboard');
    } catch (err) {
      const response = err.response || {};
      if (response.data && response.data.showCaptcha) {
        setShowCaptcha(true);
      } else {
        alert(response.data?.message || 'Login failed');
      }

      if (captchaRef.current) {
        captchaRef.current.reset();
      }
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="mb-3">
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
        />
      </div>

      {showCaptcha && (
        <div className="mb-3">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={token => setCaptchaToken(token)}
            ref={captchaRef}
          />
        </div>
      )}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading || (showCaptcha && !captchaToken)}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;
