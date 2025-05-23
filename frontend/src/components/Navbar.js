import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, getUser } from '../utils/auth';

// Simple user profile component (you can replace with your own)
function UserProfile({ onClose, user }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        right: '10px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '1rem',
        zIndex: 1000,
        width: '200px',
      }}
    >
      <h5 className="mb-2">User Profile</h5>
      <p><strong>Name:</strong> {user?.name || user?.username || 'User'}</p>
      {/* Add more profile info here */}
      <button className="btn btn-sm btn-secondary" onClick={onClose}>Close</button>
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const username = user?.name || user?.username || user?.userName || "User";

  // Shared style for text shadows on main links
  const linkShadowStyle = { textShadow: '1px 1px 3px black' };

  return (
    <nav
      className="navbar navbar-expand-lg bg-success shadow px-4"
      style={{
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 128, 0, 0.5), 0 5px 15px rgba(0,0,0,0.3)', // green + black shadow below
      }}
    >
      <Link className="navbar-brand text-white fw-bold" to="/" style={linkShadowStyle}>
        BlogApp
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {isLoggedIn() && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white fw-semibold" to="/dashboard" style={linkShadowStyle}>
                  My Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-semibold" to="/new" style={linkShadowStyle}>
                  New Post
                </Link>
              </li>
            </>
          )}
        </ul>

        {isLoggedIn() && (
          <div className="d-flex align-items-center gap-3 ms-auto">

            {/* Logout button first */}
            <button
              className="btn btn-outline-light btn-sm shadow-sm rounded-pill px-3 fw-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>

            {/* Clickable user icon + username */}
            <div
              onClick={() => setShowProfile(prev => !prev)}
              className="d-flex flex-column align-items-center text-white"
              style={{ minWidth: '50px', cursor: 'pointer', userSelect: 'none' }}
              title="View Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="white"
                viewBox="0 0 24 24"
                stroke="none"
                style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.6))' }}
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 8-4 8-4s8 0 8 4v1H4v-1z" />
              </svg>
              <span
                className="fw-semibold mt-1"
                style={{
                  fontSize: '0.85rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                }}
              >
                {username}
              </span>
            </div>

            {/* UserProfile modal/dropdown */}
            {showProfile && <UserProfile user={user} onClose={() => setShowProfile(false)} />}
          </div>
        )}

        {!isLoggedIn() && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/signup">Signup</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
