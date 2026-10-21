import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Chatlet as the little pet from its landing page (and the sign-up page): it rests,
// breathes, now and then hops, and looks toward the pointer. Its bubble is a link.
// Motion and styles follow chatlet-signup/public/pet.js and style.css.
const MOVES = ["hop", "hop", "double", "squish", "look"];

export default function ChatletPet({ href, children }) {
  const root = useRef(null);
  const [move, setMove] = useState("");
  const [up, setUp] = useState(false);

  // Now and then, a little move.
  useEffect(() => {
    let timer;
    const next = () => {
      timer = setTimeout(() => {
        setMove(MOVES[Math.floor(Math.random() * MOVES.length)]);
        next();
      }, 2600 + Math.random() * 3200);
    };
    next();
    return () => clearTimeout(timer);
  }, []);

  // It looks toward the pointer.
  useEffect(() => {
    const look = (e) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(1, Math.hypot(dx, dy));
      el.style.setProperty("--pet-lx", ((dx / d) * Math.min(1, d / 240)).toFixed(3));
      el.style.setProperty("--pet-ly", ((dy / d) * Math.min(1, d / 240)).toFixed(3));
    };
    window.addEventListener("pointermove", look, { passive: true });
    return () => window.removeEventListener("pointermove", look);
  }, []);

  const hello = () => {
    setUp(true);
    setMove("double");
  };

  return (
    <div className={`chatlet-pet${up ? " is-up" : ""}`} ref={root}>
      <span className="pet-shadow" aria-hidden="true" />
      <div className="pet-body">
        <div
          className={`pet-move${move ? ` is-${move}` : ""}`}
          onAnimationEnd={() => setMove("")}
        >
          <span className="pet-bob">
            <span className="pet-dot" />
          </span>
        </div>
        <a
          className="pet-bubble"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onPointerEnter={hello}
          onPointerLeave={() => setUp(false)}
          onFocus={hello}
          onBlur={() => setUp(false)}
        >
          {children} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
