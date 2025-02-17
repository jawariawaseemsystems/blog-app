import React from "react";
import { Layout } from "./components/Layout";
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { Blogs } from "./components/blogs/Blogs";
import { BlogDetail } from "./components/blogs/BlogDetail";
import { EditBlog } from "./components/blogs/EditBlog";

const App = () => {
  return (
    <Router>  
      <Layout>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<BlogDetail />} />
            <Route path="/blogs/edit/:blogId" element={<EditBlog />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
