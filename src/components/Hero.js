import React, { useRef } from "react";
import ActivityLog from "./ActivityLog";

const Hero = () => {
  const heroRef = useRef(null);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-flex-container">
          <div className="hero-image">
            <img src="/images/profile.png" alt="Rima" />
            <div className="hero-contact-email">
              rimacyn [at] ucsd [dot] edu
            </div>
            <div className="hero-contact">
              <a
                href="https://scholar.google.com/citations?user=RXdvYDoAAAAJ&hl=en&oi=ao"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Scholar
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://www.linkedin.com/in/yining-rima-cao-7141a6198/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://x.com/YiningCao3"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://github.com/Rrrima"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="hero-contact">
              <a href="/rima-cv.pdf" target="_blank" rel="noopener noreferrer">
                CV
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://rrrima.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                My Old Website :)
              </a>
            </div>
          </div>

          <div className="hero-text hero-intro">
            <p className="hero-caption">ABOUT ME</p>
            <p id="current-intro-text">
              Hi, I am currently a 5th year Ph.D. student in{" "}
              <a
                href="https://hci.ucsd.edu/"
                className="hero-lab-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Foundation Interface Lab
              </a>{" "}
              at University of California, San Diego, advised by Professor
              Haijun Xia. I am also a Microsoft Research fellow.
            </p>
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
