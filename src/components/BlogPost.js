import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../data/blogData";

// Import all blog components
import ProactiveAssistance from "./blogs/ProactiveAssistance";

// Map component names to actual components
const blogComponents = {
  ProactiveAssistance: ProactiveAssistance,
  // Add more blog components here as you create them
  // AnotherBlog: AnotherBlog,
};

const BlogPost = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="blog-post">
        <div className="blog-post-content">
          <div className="blog-post-header">
            <Link to="/" className="blog-back-link">
              ← Back to Home
            </Link>
          </div>
          <h1 className="blog-post-title">Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Get the blog component
  const BlogComponent = blogComponents[blog.component];

  return (
    <div className="blog-post">
      <div className="blog-post-content">
        <div className="blog-post-header">
          <Link to="/" className="blog-back-link">
            ← Back to Home
          </Link>
        </div>
        <p className="blog-post-date">{blog.date}</p>
        <h1 className="blog-post-title">{blog.title}</h1>
        {blog.thumbnail && (
          <div className="blog-post-thumbnail">
            <img src={blog.thumbnail} alt={blog.title} />
          </div>
        )}
        <div className="blog-post-body">
          {BlogComponent ? (
            <BlogComponent />
          ) : (
            <p>Blog content coming soon...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
