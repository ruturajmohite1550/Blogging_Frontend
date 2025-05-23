import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextEditor({ value, onChange }) {
  return (
    <ReactQuill theme="snow" value={value} onChange={onChange} />
  );
}

export default RichTextEditor;
