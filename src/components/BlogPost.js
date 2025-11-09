import React, { useState, useEffect, useRef } from "react";
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
  const [showTitleInHeader, setShowTitleInHeader] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const titleBottom = titleRef.current.getBoundingClientRect().bottom;
        // Show title in header when the title has scrolled past the header (approximately 80px)
        setShowTitleInHeader(titleBottom < 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return (
      <div className="blog-post">
        <div className="blog-post-header">
          <div className="blog-post-header-content">
            <Link to="/" className="blog-back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
        <div className="blog-post-content">
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
      <div
        className={`blog-post-header ${showTitleInHeader ? "with-title" : ""}`}
      >
        <div className="blog-post-header-content">
          <Link to="/" className="blog-back-link">
            ← Back to Home
          </Link>
          {showTitleInHeader && (
            <h2 className="blog-post-header-title">{blog.title}</h2>
          )}
        </div>
      </div>
      <div className="blog-post-content">
        <p className="blog-post-date">{blog.date}</p>
        <h1 ref={titleRef} className="blog-post-title">
          {blog.title}
        </h1>
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
