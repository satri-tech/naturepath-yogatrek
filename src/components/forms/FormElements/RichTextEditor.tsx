"use client"
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className, placeholder }) => {
  useEffect(() => {
    const Quill = require('quill'); 
   
  }, []);

  return (
    <ReactQuill
    
      theme="snow"
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      }}
    />
  );
};

export default RichTextEditor;