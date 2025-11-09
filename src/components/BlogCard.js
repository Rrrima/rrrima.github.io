import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { id, title, date, excerpt, thumbnail } = blog;

  return (
    <div className="blog-card">
      <Link to={`/blog/${id}`} className="blog-link">
        <div className="blog-container">
          {thumbnail && (
            <div className="blog-thumbnail">
              <img src={thumbnail} alt={`${title} thumbnail`} />
            </div>
          )}
          <div className="blog-details">
            <p className="blog-date">{date}</p>
            <h3 className="blog-title">{title}</h3>
            {excerpt && <p className="blog-excerpt">{excerpt}</p>}
            <span className="blog-read-more">Read more →</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;

