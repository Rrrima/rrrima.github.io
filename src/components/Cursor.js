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
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [iframePosition, setIframePosition] = useState({ top: 0, left: 0 });
  const iframeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    if (!isIframeOpen) {
      gsap.to(fairyCursorRef.current, {
        top: isHoveringLink ? linkPosition.top : mouseY + 22,
        left: isHoveringLink ? linkPosition.left : mouseX + 6,
        width: isHoveringLink ? linkDimensions.width : 10,
        height: isHoveringLink ? linkDimensions.height : 10,
        ease: "power2.out",
        duration: isHoveringLink ? 0.5 : 0.3,
      });
    }
  }, [
    mouseX,
    mouseY,
    isHoveringLink,
    linkDimensions,
    linkPosition,
    isIframeOpen,
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);

      if (isDragging && iframeRef.current) {
        setIframePosition({
          top: e.clientY - dragOffset.y,
          left: e.clientX - dragOffset.x,
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

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

    const handleClick = (e) => {
      e.preventDefault();
      const url = e.target.href;
      setIframeUrl(url);
      setIsIframeOpen(true);
      setIframePosition({
        top: e.clientY + 15,
        left: window.innerWidth - 520,
      });
      setIsHoveringLink(false);
    };

    heroLabLinks.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
      link.addEventListener("click", handleClick);
    });

    return () => {
      heroLabLinks.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  const handleIframeHeaderMouseDown = (e) => {
    setIsDragging(true);
    const rect = iframeRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const closeIframe = () => {
    setIsIframeOpen(false);
    setIframeUrl("");
  };

  return (
    <>
      {!isIframeOpen && (
        <div
          className={`fairy-cursor ${hint ? "hint" : ""} ${
            isHoveringLink ? "hover-link" : ""
          }`}
          ref={fairyCursorRef}
        >
          {hint && <div className="hint-message">{hint}</div>}
        </div>
      )}

      {isIframeOpen && (
        <div
          className="iframe-window"
          ref={iframeRef}
          style={{
            top: `${iframePosition.top}px`,
            left: `${iframePosition.left}px`,
          }}
        >
          <div
            className="iframe-header"
            onMouseDown={handleIframeHeaderMouseDown}
          >
            <div className="iframe-url">{iframeUrl}</div>
            <button className="iframe-close" onClick={closeIframe}>
              ×
            </button>
          </div>
          <iframe
            src={iframeUrl}
            title="Link Preview"
            className="iframe-content"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Cursor;
