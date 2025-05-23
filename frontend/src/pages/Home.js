import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

// Strip HTML tags from summary/content safely
function stripHtmlTags(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts')
      .then(res => {
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post =>
    (post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.summary?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container my-5">
      <div className="container" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <h2
          className="text-center"
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span role="img" aria-label="posts">📄</span>
          All Blog Posts
        </h2>
      </div>

      <div className="d-flex align-items-center mb-4" style={{ maxWidth: '400px' }}>
        {/* Search Input Group with icon */}
        <div className="input-group">
          <span
            className="input-group-text"
            style={{
              background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
              color: 'white',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'default',
            }}
          >
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              borderColor: '#6a11cb',
              boxShadow: '0 0 8px rgba(106, 17, 203, 0.3)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
          <p className="mt-3 text-muted fs-5">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="alert alert-info text-center fs-5 shadow-sm rounded">
          No posts found. Try another search!
        </div>
      ) : (
        <div className="row g-4">
          {filteredPosts.map(post => (
            <div
              key={post._id || post.id}
              className="col-12 col-md-6 col-lg-4"
            >
              <div
                className="card h-100 shadow border-0 rounded"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.transition = 'all 0.3s ease';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.backgroundColor = '#e6f4ea'; // Light green shade
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.backgroundColor = '';
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-semibold">
                    <Link
                      to={`/post/${post._id || post.id}`}
                      className="text-decoration-none stretched-link"
                    >
                      {post.title || 'Untitled Post'}
                    </Link>
                  </h5>
                  <p className="card-text text-secondary flex-grow-1" style={{ minHeight: '90px' }}>
                    {post.summary
                      ? stripHtmlTags(post.summary).substring(0, 50) + '...'
                      : 'No content available'}
                  </p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <small className="fst-italic" style={{ color: 'black', fontWeight: '700' }}>
                      by {post.author?.username || post.author || 'Unknown Author'}
                    </small>
                    {post.created_at && (
                      <small className="text-muted">
                        {new Date(post.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
