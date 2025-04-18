// src/App.jsx
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';
import { samplePosts } from './mockData';
import './App.css';

const PostDetailPlaceholder = () => {
  const postId = window.location.pathname.split('/').pop();
  const post = samplePosts[postId - 1];
  return (
    <BlogPostDetail
      title={post.title}
      content={post.content}
      author={post.author}
      date={post.date}
    />
  );
};

const PostFormPlaceholder = () => {
  const { state } = useLocation();
  const pageID = state?.pageID;              // undefined if you came from “New Post”
  const post   = pageID
    ? samplePosts[pageID - 1]
    : null;

  console.log('editing post #', pageID);

  return (
    <BlogPostForm
      post={post}
    />
  );
};

// We need our hooks to live _inside_ the Router context,
// so we wrap the inner UI in its own component.
function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  // determines label based on the current path
  const isEditing = location.pathname.includes('/posts/');
  // extract the numeric ID if so
  const postId = isEditing
    ? Number(location.pathname.split('/').pop())
    : null;

  const buttonLabel = isEditing ? 'Edit Post' : 'New Post';

  const handleClick = () => {
    if (isEditing) {
      // navigate and stash the postId in location.state
      navigate('/postform', { state: { pageID: postId } });
    } else {
      navigate('/postform');
    }
  };


  return (
    <div className="App">
      <h1 className="title">Conor&apos;s Epic Blog</h1>
      <button className="editButton" onClick={handleClick}>
        {buttonLabel}
      </button>

      <Routes>
        <Route path="/" element={<BlogPostList posts={samplePosts} />} />
        <Route path="/posts/:postId" element={<PostDetailPlaceholder />} />
        <Route path="/postform" element={<PostFormPlaceholder />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
