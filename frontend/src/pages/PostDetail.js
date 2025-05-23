import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        console.error('Error fetching post:', err);
        alert('Post not found');
      });
  }, [id]);

  if (!post) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0">
        {/* Title without icon */}
        <h2 className="fw-bold mb-3 text-dark">
          {post.title}
        </h2>

        {/* Author and date with black icons */}
        <div className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
          <i className="bi bi-person-fill me-1" style={{ color: 'black' }}></i>
          {post.author || 'Unknown'}
          <span className="mx-2">|</span>
          <i className="bi bi-calendar-event me-1" style={{ color: 'black' }}></i>
          {new Date(post.created_at || post.createdAt).toLocaleDateString()}
        </div>

        <hr />

        {/* Content with nice font */}
        <div
          style={{
            marginTop: 0,
            lineHeight: '1.75',
            fontSize: '1.1rem',
            fontFamily: `'Merriweather', 'Georgia', serif`,
            color: '#333',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}

export default PostDetail;
