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
                data-umami-event="outbound-click"
                data-umami-event-to="scholar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Scholar
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://www.linkedin.com/in/yining-rima-cao-7141a6198/"
                data-umami-event="outbound-click"
                data-umami-event-to="linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://x.com/rrrima_"
                data-umami-event="outbound-click"
                data-umami-event-to="x"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://github.com/Rrrima"
                data-umami-event="outbound-click"
                data-umami-event-to="github"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="/rima-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="cv-download"
              >
                CV
              </a>
            </div>
            <div className="hero-contact">
              <a
                href="https://rrrima.github.io/"
                data-umami-event="outbound-click"
                data-umami-event-to="old-website"
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
              I am an (incoming) research scientist at Adobe Research - just
              finished my Ph.D. at{" "}
              <a
                href="https://hci.ucsd.edu/"
                className="hero-lab-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Foundation Interface Lab
              </a>{" "}
              at University of California, San Diego.
            </p>
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
