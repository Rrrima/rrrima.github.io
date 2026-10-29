import React from "react";
import BlogCard from "./BlogCard";
import allBlogData from "../data/blogData";

// Project pages reached from a paper (listed: false) stay out of this list.
const blogData = allBlogData.filter((b) => b.listed !== false);

// The posts and project pages, as a list (used under the home page's tabs).
export const BlogsList = () =>
  blogData.length === 0 ? (
    <p className="blogs-empty-message">Coming soon! Stay tuned for updates.</p>
  ) : (
    <div className="blogs-list">
      {blogData.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );

const Blogs = () => {
  return (
    <div className="blogs">
      <div className="blogs-content">
        <h2 className="research-title">Before I Forgot</h2>
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
