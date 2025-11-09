import React from "react";
import BlogCard from "./BlogCard";
import blogData from "../data/blogData";

const Blogs = () => {
  return (
    <div className="blogs">
      <div className="blogs-content">
        <h2 className="research-title">Before I Forget...</h2>
        {blogData.length === 0 ? (
          <p className="blogs-empty-message">
            Coming soon! Stay tuned for updates.
          </p>
        ) : (
          <div className="blogs-list">
            {blogData.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
