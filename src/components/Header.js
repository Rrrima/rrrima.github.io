export default function Header({ isScrolled }) {
  return (
    <div className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <div className="header-hero-titles">
          <h1 className="hero-title">Rima</h1>
          <h2 className="hero-subtitle">Cao, Yining</h2>
        </div>
      </div>
    </div>
  );
}
