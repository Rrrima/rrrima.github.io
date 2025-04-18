import React from "react";

const Paper = ({ paper }) => {
  const { title, authors, venue, thumbnail, links, award } = paper;

  // Parse authors and highlight "Yining Cao"
  const renderAuthors = () => {
    if (!authors) return null;

    return authors.split(",").map((author, index, array) => {
      const trimmedAuthor = author.trim();
      const isYiningCao = trimmedAuthor === "Yining Cao";
      return (
        <React.Fragment key={index}>
          <span className={isYiningCao ? "highlighted-author" : ""}>
            {trimmedAuthor}
          </span>
          {index < array.length - 1 && <span>, </span>}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="paper">
      <div className="paper-container">
        <div className="paper-thumbnail">
          <img src={thumbnail} alt={`${title} thumbnail`} />
        </div>
        <div className="paper-details">
          <p className="paper-venue">
            {venue}
            {award && <span className="paper-award"> · {award}</span>}
          </p>
          <h3 className="paper-title">{title}</h3>
          <p className="paper-authors">{renderAuthors()}</p>

          <div className="paper-links">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="paper-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paper;
