import React from "react";

// Reusable blog content components

export const Section = ({ children, marginTop = true, id }) => (
  <div id={id} className={`blog-section ${marginTop ? "margin-top" : ""}`}>
    {children}
  </div>
);

export const Subtitle = ({ children }) => (
  <h2 className="blog-subtitle">{children}</h2>
);

export const Paragraph = ({ children }) => (
  <p className="blog-paragraph">{children}</p>
);

export const Emphasis = ({ children }) => (
  <span className="blog-emphasis">{children}</span>
);

export const Highlight = ({ children }) => (
  <span className="blog-highlight">{children}</span>
);

export const Wiggle = ({ children }) => (
  <span className="blog-wiggle">{children}</span>
);

export const TalkingBubble = ({ children }) => (
  <div className="blog-talking-bubble">{children}</div>
);

export const Quote = ({ children }) => (
  <blockquote className="blog-quote">{children}</blockquote>
);

export const List = ({ children, type = "bullet" }) => (
  <ul className={`blog-list ${type === "dash" ? "dash-list" : ""}`}>
    {children}
  </ul>
);

export const ListItem = ({ children }) => (
  <li className="blog-list-item">{children}</li>
);

export const Note = ({ children }) => (
  <div className="blog-note">{children}</div>
);

export const InlineImage = ({ src, alt, width = "auto" }) => (
  <img src={src} alt={alt} className="blog-inline-image" style={{ width }} />
);

export const BlockImage = ({ src, alt, caption, width = "100%" }) => (
  <figure className="blog-block-image">
    <img src={src} alt={alt} style={{ width }} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

export const Divider = () => <div className="blog-divider"></div>;

export const InlineQuote = ({ children }) => (
  <span className="blog-inline-quote">{children}</span>
);

export const MarginNote = ({ children, id }) => {
  const noteId = id || `note-${Math.random().toString(36).substr(2, 9)}`;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <span
        className={`blog-margin-note-indicator ${isHovered ? "hovered" : ""}`}
        data-note-id={noteId}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="rotating-block"></span>
      </span>
      <span
        className={`blog-margin-note ${isHovered ? "hovered" : ""}`}
        data-note-id={noteId}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>
    </>
  );
};

// The "Contents" sidebar: lists the sections and marks the one being read.
export const TableOfContents = ({ sections }) => {
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;
      if (nearBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }
      const y = window.scrollY + 150;
      const current = [...sections]
        .reverse()
        .find((s) => {
          const el = document.getElementById(s.id);
          return el && y >= el.offsetTop - 100;
        });
      setActive(current ? current.id : "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <nav className="blog-toc">
      <div className="toc-content">
        <h3 className="toc-title">Contents</h3>
        <ul className="toc-list">
          {sections.map((s) => (
            <li key={s.id} className={active === s.id ? "active" : ""}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s.id);
                }}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
