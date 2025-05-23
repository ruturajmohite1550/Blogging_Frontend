import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    try {
      await api.post('/posts', { title, content });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows={8}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Publish Post</button>
    </form>
  );
}

export default NewPost;
