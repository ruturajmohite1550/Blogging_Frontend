import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const res = await api.get('/my-posts');
        setPosts(res.data);
      } catch {
        alert('Failed to fetch your posts');
      }
    }
    fetchUserPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      alert('Failed to delete post');
      console.error(err.response?.data || err.message);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Posts</h2>
        <Link to="/new" className="btn btn-success btn-lg">
          <i className="bi bi-plus-lg me-1"></i>Create New
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="alert alert-info text-center py-4 fs-5 shadow-sm rounded">
          No posts found. Create one!
        </div>
      ) : (
        posts.map(post => (
          <div key={post.id} className="card mb-4 shadow rounded border-0">
            <div className="card-body">
              <h4 className="card-title text-dark fw-semibold">{post.title}</h4>
              <p className="card-text text-secondary small mb-3">
                Created on {new Date(post.created_at).toLocaleDateString()}
              </p>
              <div className="d-flex gap-2">
                <Link to={`/edit/${post.id}`} className="btn btn-outline-primary">
                  <i className="bi bi-pencil-square me-1"></i>Edit
                </Link>
                <button className="btn btn-outline-danger" onClick={() => handleDelete(post.id)}>
                  <i className="bi bi-trash me-1"></i>Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
