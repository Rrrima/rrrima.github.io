import React, { useEffect, useRef, useState } from "react";

// How we got here, from the opening of the talk: a track of eras along one
// thin line, the way the slides did. Scrolling over it moves it sideways.

const IMG = "/images/blog/dissertation";

const ERAS = [
  {
    year: "1960s",
    title: "The terminal: command and response",
    img: null, // drawn below, so it reads as plain text on a screen
    text: "Type a command, read the response, type the next one.",
  },
  {
    year: "1962",
    title: "Sketchpad: leverage spatial thinking",
    img: "sketchpad",
    text: "Computing became visible. For the first time, we could draw on the screen and think with our eyes and hands.",
  },
  {
    year: "1968",
    title: "NLS: hyperlinks, multiple views, pointers",
    img: "nls",
    text: "The mouse and the hyperlink made information something to navigate and point at, not a single linear thread.",
  },
  {
    year: "1981",
    title: "Xerox Star: the office metaphor",
    img: "xerox-star",
    text: "The screen started to feel like a space, the foundation of the operating systems we use today.",
  },
  {
    year: "1984",
    title: "Macintosh",
    img: "macintosh",
    text: "Apple picked up the idea…",
  },
  {
    year: "1990s",
    title: "Microsoft Windows",
    img: "windows",
    text: "…and graphical interfaces reached millions of information workers.",
  },
  {
    year: "1990s",
    title: "Windows + Office: software distribution",
    img: "office",
    text: "Applications arrived: containers of packaged files and functions, easy to distribute and sell.",
  },
  {
    year: "today",
    title: "The application-centric paradigm",
    img: "apps",
    text: "More and more apps that don't talk to each other. Static, low-level, and the coordination between them is left to us.",
  },
  {
    year: "Nov 30, 2022",
    title: "ChatGPT: ask anything",
    img: "chatgpt",
    text: "Flexible enough for any request, but without the external representations we think with.",
  },
  {
    year: "next",
    title: "?",
    img: "lineup",
    text: "Terminal, GUI applications, chat. What comes after?",
  },
];

const LAST = ERAS.length - 1;

const TERMINAL = [
  ["$", "ls"],
  [null, "README.md   docs/   src/"],
  ["$", "cd src"],
  ["$", "make build"],
  [null, "Building..."],
  [null, "Build complete."],
  ["$", "./app --help"],
  [null, "Usage: app [options]"],
];

const Terminal = () => (
  <div className="gt-terminal" role="img" aria-label="A terminal: commands typed, responses printed">
    <div className="gt-terminal-bar">
      <i />
      <i />
      <i />
    </div>
    <pre>
      {TERMINAL.map(([prompt, text], i) => (
        <span key={i} className={prompt ? "is-cmd" : ""}>
          {prompt && <b>{prompt} </b>}
          {text}
          {"\n"}
        </span>
      ))}
      <b>$ </b>
      <span className="gt-cursor" />
    </pre>
  </div>
);

// How many pixels of scrolling move the track by one era.
const PER_ERA = 260;

export default function GuiTimeline() {
  const stage = useRef(null);
  const [pos, setPos] = useState(0);
  const posRef = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    let frame = 0;
    let settle = 0;

    // Glide toward the target; a moment after the last input, settle on the
    // nearest era.
    const glide = () => {
      const d = target.current - posRef.current;
      posRef.current = Math.abs(d) < 0.001 ? target.current : posRef.current + d * 0.18;
      setPos(posRef.current);
      frame = posRef.current === target.current ? 0 : requestAnimationFrame(glide);
    };
    const moveBy = (eras) => {
      target.current = Math.min(LAST, Math.max(0, target.current + eras));
      if (!frame) frame = requestAnimationFrame(glide);
      clearTimeout(settle);
      settle = setTimeout(() => {
        target.current = Math.round(target.current);
        if (!frame) frame = requestAnimationFrame(glide);
      }, 160);
    };

    // While the timeline sits in the middle of the screen, scrolling moves it
    // sideways and the page stays put. Past the first or last era, the scroll
    // goes back to the page.
    const onWheel = (e) => {
      const r = stage.current.getBoundingClientRect();
      const mid = (r.top + r.bottom) / 2;
      const h = window.innerHeight;
      if (mid < h * 0.2 || mid > h * 0.8) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if ((delta > 0 && target.current >= LAST) || (delta < 0 && target.current <= 0)) return;
      e.preventDefault();
      moveBy(delta / PER_ERA);
    };

    // Swipe or drag sideways (vertical swipes still scroll the page).
    const el = stage.current;
    let drag = null;
    const onDown = (e) => {
      drag = { x: e.clientX, w: el.querySelector(".gt-era").offsetWidth };
    };
    const onMove = (e) => {
      if (!drag) return;
      moveBy(-(e.clientX - drag.x) / drag.w);
      drag.x = e.clientX;
    };
    const onUp = () => (drag = null);

    window.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="gt" style={{ "--gt-steps": ERAS.length }}>
      <div ref={stage} className="gt-stage">
        <ol className="gt-track" style={{ "--gt-pos": pos }}>
          {ERAS.map((era, i) => (
            <li
              key={i}
              className="gt-era"
              style={{ opacity: 1 - Math.min(1, Math.abs(i - pos)) * 0.8 }}
              aria-current={Math.round(pos) === i ? "step" : undefined}
            >
              <span className="gt-year">{era.year}</span>
              <h4 className="gt-title">{era.title}</h4>
              <div className="gt-picture">
                {era.img ? (
                  <img src={`${IMG}/${era.img}.jpg`} alt={era.title} draggable={false} />
                ) : (
                  <Terminal />
                )}
              </div>
              <p className="gt-text">{era.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
