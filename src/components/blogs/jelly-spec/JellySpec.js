import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// The paper's attribute-types figure, with the four types the playground uses
// labeled on it, above Jelly's schema-labels playground (the real one, built from
// the custard repo into /embed/jelly, see ~/project/jelly-embed). A label opens
// that type in the playground; opening a type there lights up its label here.
const IMG = "/images/blog/jelly";

// Where each type sits in the figure (its tag, as % of the image), and the
// paper's name and color for it.
const TYPES = [
  { tab: "value", paper: "SVAL", x: 45.56, y: 11.6, tone: "blue" },
  { tab: "array", paper: "ARRY", x: 45.56, y: 22.1, tone: "orange" },
  { tab: "object", paper: "DICT", x: 45.7, y: 42.6, tone: "purple" },
  { tab: "pointer", paper: "PNTR", x: 45.56, y: 71.7, tone: "green" },
];

export default function JellySpec() {
  const frame = useRef(null);
  const [height, setHeight] = useState(720);
  const [tab, setTab] = useState("value");
  // The labels pulse until the reader has picked one.
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const on = (e) => {
      if (e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "jelly-height" && e.data.height > 0) setHeight(Math.ceil(e.data.height));
      if (e.data?.type === "jelly-tab") setTab(e.data.tab);
    };
    window.addEventListener("message", on);
    return () => window.removeEventListener("message", on);
  }, []);

  const open = (next) => {
    setTab(next);
    setTouched(true);
    frame.current?.contentWindow?.postMessage({ type: "jelly-set-tab", tab: next }, "*");
  };

  return (
    <div className="jl-spec">
      <figure className="jl-types">
        <div className={`jl-types-img${touched ? "" : " is-inviting"}`}>
          <img
            src={`${IMG}/schema.jpg`}
            alt="From the paper: an object-relational schema for a weekly meal plan, its four attribute types (single value, array, dictionary, pointer), how each attribute is annotated, and the rendered UI."
          />
          {TYPES.map((t) => (
            <button
              key={t.tab}
              type="button"
              className={`jl-type jl-type-${t.tone}${tab === t.tab ? " is-on" : ""}`}
              style={{ left: `${t.x}%`, top: `${t.y}%`, "--i": TYPES.indexOf(t) }}
              onClick={() => open(t.tab)}
              aria-pressed={tab === t.tab}
              title={`${t.paper} in the paper: open "${t.tab}" below`}
            >
              {t.tab}
              <ChevronDown size={12} strokeWidth={2.5} aria-hidden="true" />
            </button>
          ))}
        </div>
        <figcaption>
          From the paper: a schema, its four attribute types, their labels, and
          the UI they render. <strong>Click a type</strong> to try it
          below.
        </figcaption>
      </figure>
      <iframe
        ref={frame}
        src="/embed/jelly/index.html"
        title="Jelly's schema labels: a field's spec and the widget it renders"
        style={{ height }}
        loading="lazy"
      />
    </div>
  );
}
