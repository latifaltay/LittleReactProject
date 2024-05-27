import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './components/Home/SearchBar';
import PostDetail from './components/Post/PostDetail';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Navbar/Navbar';

const App = () => {

  return (

    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PrivateRoute />}>
          <Route path="/posts" element={<Home />} />
        </Route>
        <Route path="/post/:postId" element={<PrivateRoute />}>
          <Route path="/post/:postId" element={<PostDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
