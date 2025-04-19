import React, { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-title">Rima</h1>
        <h2 className="hero-subtitle">Cao, Yining</h2>

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
          </div>

          <div className="hero-text hero-intro">
            <p className="hero-caption">CURRENT</p>
            <p id="current-intro-text">
              Hi, I am currently a 4th year Ph.D. student in{" "}
              <a
                href="https://hci.ucsd.edu/"
                className="hero-lab-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Foundation Interface Lab
              </a>{" "}
              at University of California, San Deigo, advised with Professor
              Haijun Xia
            </p>
            <p className="hero-caption">PAST</p>
            <p>
              I had two amazing internships at Adobe Research, mentered by{" "}
              <a
                href="https://research.adobe.com/person/anh-truong/"
                className="hero-lab-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anh
              </a>{" "}
              and{" "}
              <a
                href="https://rubaiathabib.me/"
                className="hero-lab-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rubaiat
              </a>{" "}
              <br />I had my master degree at University of Michigan, Ann Arbor,
              worked with Professor{" "}
              <a
                href="https://www.cond.org/"
                className="hero-lab-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Eytan Adar
              </a>
              <br />I got my Bachelor's degree from Tsinghua University, China
            </p>
            <p className="hero-caption">UPCOMING</p>
            <p>
              I am attending CHI 2025 in Yokohama, Japan, presenting two papers
              <br />I will be joining Microsoft Research{" "}
              <a
                href="https://www.microsoft.com/en-us/research/group/epic/"
                className="hero-lab-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                EPIC Group
              </a>
              in Redmond, WA, as a Research Scientist intern in Summer 2025
            </p>
          </div>
        </div>

        <div className="hero-text">
          <p className="hero-caption2">My Research</p>
          <p>
            Our digital workspaces should not remain static backdrops to our
            activity—they should evolve with us; responsive to our ex/implicit
            intentions and personal preferences.
          </p>
          <p>
            Towards this vision, my research explores - How information
            structures should be generated, composed, and synchronized to
            support information activities? What are the fundamental components
            of our current interfaces that can be reimagined or reinvented?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
