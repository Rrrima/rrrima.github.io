import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./components/Home";
import BlogPost from "./components/BlogPost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/main.scss";

function AppContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on a blog post page
  const isBlogPost = /^\/(blog|project)\//.test(location.pathname);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`app ${isScrolled ? "scrolled" : ""}`}>
      {!isBlogPost && <Header isScrolled={isScrolled} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/project/:id" element={<BlogPost />} />
      </Routes>
      {!isBlogPost && <Footer />}
      {/* <Cursor /> */}
      {/* The home page's tint; posts and project pages show at full color. */}
      {!isBlogPost && <div className="container-overlay"></div>}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
