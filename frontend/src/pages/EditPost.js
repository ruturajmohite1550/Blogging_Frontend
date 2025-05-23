import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import RichTextEditor from '../components/RichTextEditor';
import { getUser } from '../utils/auth';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch {
        alert('Failed to load post');
        navigate('/dashboard');
      }
    }
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate('/dashboard');
    } catch {
      alert('Failed to update post');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditPost;
