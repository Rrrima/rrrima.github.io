import React, { useEffect, useRef, useState } from "react";

// One widget, step by step: Chatlet's own calendar for "when should we meet?".
// The text scrolls; the stage pins beside it and holds Chatlet's real components
// (built from the Chatlet repo into /embed/chatlet, see ~/project/chatlet-embed).
// Each step tells the embed which part of the spec to show; a few values in the
// spec can be clicked, and the widget itself can be used.

const STEPS = [
  <>
    Someone types <q>can we meet wed or thu?</q> Chatlet doesn't draw a
    calendar from scratch. It writes a few lines of spec: this decision is
    about <em>time</em>, here are the dates, show it as a{" "}
    <code>calendar</code>.
  </>,
  <>
    Then people mention what's already on their plate: a team sync, a client
    call, a demo. Those become <strong>context events</strong> in the
    schedule. They aren't options, just things in the way.
  </>,
  <>
    With a meeting length, Chatlet proposes a couple of nearby times each day
    that dodge everyone's events. <span className="cs-try">Try it:</span>{" "}
    click <code>durationMinutes</code> and the proposals move.
  </>,
  <>
    Answers live on the candidates themselves. Leo says yes, Maya says{" "}
    <q>maybe wed?</q>, and Thursday fills up with everyone.
  </>,
  <>
    Maya is in London. Same object, her view: the hours relabel, the meeting
    doesn't move. Click <code>viewer</code> to flip it.
  </>,
  <>
    And when a calendar is too much, the decision just switches renderers to a
    time pool. Same alternatives, same answers, nothing copied. Flip{" "}
    <code>drill</code> back and forth.
  </>,
];

export default function CalendarScrolly() {
  const [step, setStep] = useState(0);
  const refs = useRef([]);
  const frame = useRef(null);
  const ready = useRef(false);

  useEffect(() => {
    // Phones pin the stage in the top half, so the reading line is lower.
    const phone = window.matchMedia("(max-width: 860px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStep(Number(e.target.dataset.step));
        }
      },
      { rootMargin: phone ? "-72% 0px -24% 0px" : "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const send = (s) =>
    frame.current?.contentWindow?.postMessage({ type: "chatlet-step", step: s }, "*");

  useEffect(() => {
    const on = (e) => {
      if (e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "chatlet-ready") {
        ready.current = true;
        send(stepRef.current);
      }
    };
    window.addEventListener("message", on);
    return () => window.removeEventListener("message", on);
  }, []);

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
    if (ready.current) send(step);
  }, [step]);

  return (
    <div className="cs">
      <div className="cs-steps">
        {STEPS.map((text, i) => (
          <div
            key={i}
            data-step={i}
            ref={(el) => (refs.current[i] = el)}
            className={`cs-step${i === step ? " is-on" : ""}`}
          >
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="cs-stage">
        <div className="cs-stage-inner">
          <iframe
            ref={frame}
            className="cs-frame"
            src="/embed/chatlet/index.html"
            title="Chatlet's calendar, driven by its spec"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
