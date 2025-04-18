import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DOMPurify from 'dompurify';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  // store content as HTML string
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  // initialize date state as Date or null
  const [date, setDate] = useState(post?.date ? new Date(post.date) : null);
  const [editing] = useState(!!(post?.title || post?.content || post?.author || post?.date));
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // sanitize HTML content
      const sanitizedContent = DOMPurify.sanitize(content);
      // format date as YYYY-MM-DD
      const dateString = date.toISOString().split('T')[0];
      onSubmit({ title, content: sanitizedContent, author, date: dateString });
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>

      <div className={styles.formGroup}>
        <label>Content</label>
        <SunEditor
          setContents={content}
          onChange={setContent}
          height="500px"
          setOptions={{
            // define the exact toolbar rows and buttons you want:
            buttonList: [
              // first row
              ['formatBlock', 'fontSize', 'fontColor', 'hiliteColor'],
              // second row
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              // third row
              ['align', 'list', 'lineHeight'],
              // fourth row
              ['link', 'image', 'video', 'table'],
              // fifth row
              ['undo', 'redo'],
              // sixth row
              ['fullScreen', 'codeView']
            ],
            // you can also tweak other options here:
            defaultStyle: 'font-family:Arial; font-size:14px;',
            font: ['Arial', 'Helvetica', 'Times New Roman', 'Courier New'],
            formats: ['p', 'h1', 'h2', 'h3', 'blockquote']
          }}
        />
        {errors.content && <p className={styles.error}>{errors.content}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <p className={styles.error}>{errors.author}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Date</label>
        <ReactDatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
        {errors.date && <p className={styles.error}>{errors.date}</p>}
      </div>

      <button type="submit">{editing ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default BlogPostForm;
