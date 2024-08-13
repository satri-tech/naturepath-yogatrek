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
      className={` bg-white  dark:bg-slate-950 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400 dark:text-text-dark/75 dark:placeholder:text-text-dark/75 rounded-md ${className}`}
      placeholder={placeholder}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  );
};

export default RichTextEditor;