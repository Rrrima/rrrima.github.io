import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Research from "./components/Research";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/main.scss";
import Cursor from "./components/Cursor";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <Header />
      <Hero />
      <Research />
      <Footer />
      <Cursor />
      <div className="container-overlay"></div>
    </div>
  );
}

export default App;
