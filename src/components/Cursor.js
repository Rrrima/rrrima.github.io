import "../styles/cursor.scss";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Cursor = () => {
  const fairyCursorRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hint, setHint] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [linkDimensions, setLinkDimensions] = useState({ width: 0, height: 0 });
  const [linkPosition, setLinkPosition] = useState({ top: 0, left: 0 });

  useGSAP(() => {
    gsap.to(fairyCursorRef.current, {
      top: isHoveringLink ? linkPosition.top : mouseY + 22,
      left: isHoveringLink ? linkPosition.left : mouseX + 6,
      width: isHoveringLink ? linkDimensions.width : 10,
      height: isHoveringLink ? linkDimensions.height : 10,
      ease: "power2.out",
      duration: isHoveringLink ? 0.5 : 0.3,
    });
  }, [mouseX, mouseY, isHoveringLink, linkDimensions, linkPosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const heroLabLinks = document.querySelectorAll(".hero-lab-link");

    const handleMouseEnter = (e) => {
      const rect = e.target.getBoundingClientRect();
      setIsHoveringLink(true);
      setLinkDimensions({
        width: rect.width,
        height: rect.height,
      });
      setLinkPosition({
        top: rect.top,
        left: rect.left,
      });
    };

    const handleMouseLeave = () => {
      setIsHoveringLink(false);
    };

    heroLabLinks.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      heroLabLinks.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  //   useEffect(() => {
  //     const targetElement = document.getElementById("current-intro-text");

  //     if (targetElement) {
  //       const handleMouseEnter = () => {
  //         setHint("she is planning to graduate next year ");
  //       };

  //       const handleMouseLeave = () => {
  //         setHint(false);
  //       };

  //       targetElement.addEventListener("mouseenter", handleMouseEnter);
  //       targetElement.addEventListener("mouseleave", handleMouseLeave);

  //       return () => {
  //         targetElement.removeEventListener("mouseenter", handleMouseEnter);
  //         targetElement.removeEventListener("mouseleave", handleMouseLeave);
  //       };
  //     }
  //   }, []);

  return (
    <>
      {/* <div className="cursor" ref={cursorRef}></div> */}
      <div
        className={`fairy-cursor ${hint ? "hint" : ""} ${
          isHoveringLink ? "hover-link" : ""
        }`}
        ref={fairyCursorRef}
      >
        {hint && <div className="hint-message">{hint}</div>}
      </div>
    </>
  );
};

export default Cursor;
