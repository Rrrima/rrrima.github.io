import React, { useEffect, useRef, useState } from "react";

// A recorded scroll through an essay, held on its first frame. While the pointer
// is over it (wearing the essay's own cursor), the wheel scrubs the recording, as
// if you were scrolling the essay itself. Scrolling on past the end starts it
// again; scrolling up past the start hands the scroll back to the page.
// Leaving resets it.
const SECONDS_PER_PX = 1 / 120;

export default function ScrubClip({ src, poster, label, cursor }) {
  const box = useRef(null);
  const video = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = box.current;
    const v = video.current;
    let target = 0;
    let frame = 0;
    const seek = () => {
      frame = 0;
      if (v.duration) v.currentTime = target;
    };
    const onWheel = (e) => {
      const end = v.duration || 9;
      const next = target + e.deltaY * SECONDS_PER_PX;
      // Up past the start: the page takes the scroll.
      if (next <= 0 && target <= 0) return;
      e.preventDefault();
      // Down past the end: start again.
      target = next >= end ? 0 : Math.max(0, next);
      setProgress(target / end);
      if (!frame) frame = requestAnimationFrame(seek);
    };
    const onEnter = () => {
      setActive(true);
      if (v.preload !== "auto") {
        v.preload = "auto";
        v.load();
      }
    };
    const onLeave = () => {
      setActive(false);
      target = 0;
      setProgress(0);
      if (v.duration) v.currentTime = 0;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={box} className={`xp-scrub${active ? " is-active" : ""}`} style={cursor ? { cursor } : undefined}>
      <video
        ref={video}
        className="chatlet-loop"
        src={src}
        poster={poster}
        muted
        playsInline
        preload="none"
        aria-label={label}
      />
      <span className="xp-scrub-hint" aria-hidden="true">scroll to preview</span>
      <span className="xp-scrub-bar" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </span>
    </div>
  );
}
