import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plus, Minus, Maximize2 } from "lucide-react";
import relatedWork from "./relatedWork";

// The related work as a zoomable map. Five bodies of work sit around this
// dissertation; each holds its strands, each strand its works. Zooming is
// semantic: from far away works are a little sunflower of dots, closer in they
// unfold into a labelled list, and a click opens a card. A second lens lays
// every work out on one line of years instead.
//
// Everything is drawn in screen space from a camera { x, y, k } (the world
// point at the center, and the zoom), so text stays the same size at any zoom.

const RING = 400; // distance from the center to each body of work
const YEAR0 = 1955;
const YEAR1 = 2027;
const TL_X0 = -720;
const TL_X1 = 720;
const LANE = 140;
const K_MIN = 0.25;
const K_MAX = 14;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// 0 below a, 1 above b, linear between.
const band = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
const yearX = (year) => TL_X0 + ((year - YEAR0) / (YEAR1 - YEAR0)) * (TL_X1 - TL_X0);

// Ink: a hand-drawn circle in screen space. The radius wobbles a little (never
// more than a few pixels, however far you zoom), and the stroke runs past where
// it started, the way a pen does. Each seed draws the same wobble every time.
const wobble = (seed, a) =>
  Math.sin(a * 2 + seed * 1.7) * 0.5 + Math.sin(a * 3 + seed * 4.1) * 0.3 + Math.sin(a * 5 + seed * 2.3) * 0.2;

function inkCircle(cx, cy, r, seed) {
  const amp = Math.min(r * 0.03, 2.6);
  const start = seed * 2.1;
  const sweep = Math.PI * 2 + 0.3;
  const n = Math.round(clamp(r / 3, 32, 160));
  let d = "";
  for (let i = 0; i <= n; i++) {
    const a = start + (sweep * i) / n;
    const rr = r + amp * wobble(seed, a) + (i / n) * amp * 0.9;
    d += `${i ? "L" : "M"}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr * 0.99).toFixed(1)}`;
  }
  return d;
}

// Ink: a line with a slight hand-drawn bow.
function inkLine(x1, y1, x2, y2, seed) {
  const bow = Math.min(Math.hypot(x2 - x1, y2 - y1) * 0.04, 10) * (seed % 2 ? 1 : -1);
  const mx = (x1 + x2) / 2 - ((y2 - y1) / (Math.hypot(x2 - x1, y2 - y1) || 1)) * bow;
  const my = (y1 + y2) / 2 + ((x2 - x1) / (Math.hypot(x2 - x1, y2 - y1) || 1)) * bow;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function buildLayout() {
  const regions = relatedWork.map((r, i) => {
    const count = r.strands.reduce((n, s) => n + s.works.length, 0);
    const R = 120 + Math.sqrt(count) * 14;
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / relatedWork.length;
    const x = Math.cos(a) * RING;
    const y = Math.sin(a) * RING;
    const n = r.strands.length;
    const sr = Math.min(R * 0.48, R * 0.5 * Math.sin(Math.PI / n) * 0.96);
    const laneY = (i - (relatedWork.length - 1) / 2) * LANE;
    const stacks = {};

    const strands = r.strands.map((s, j) => {
      const b = -Math.PI / 2 + (j * 2 * Math.PI) / n + (n === 2 ? Math.PI / 2 : 0);
      const sx = x + Math.cos(b) * R * 0.5;
      const sy = y + Math.sin(b) * R * 0.5;
      const m = s.works.length;
      const rowH = Math.min((2 * sr * 0.8) / m, sr * 0.22);

      const works = s.works.map((w, t) => {
        // Map: a sunflower when far, a list when close.
        const rr = sr * 0.78 * Math.sqrt((t + 0.5) / m);
        const ang = t * 2.39996;
        // Timeline: on this body's lane, stacked when years crowd together.
        const bucket = Math.round(w.year / 2);
        const c = (stacks[bucket] = (stacks[bucket] || 0) + 1);
        const off = c === 1 ? 0 : (c % 2 === 0 ? 1 : -1) * Math.ceil((c - 1) / 2) * 9;
        return {
          ...w,
          id: `${r.id}-${j}-${t}`,
          order: t,
          fx: sx + Math.cos(ang) * rr,
          fy: sy + Math.sin(ang) * rr,
          lx: sx - sr * 0.55,
          ly: sy + (t - (m - 1) / 2) * rowH,
          tx: yearX(w.year) + ((c % 3) - 1) * 3,
          ty: laneY + off,
        };
      });
      return { ...s, id: `${r.id}-${j}`, x: sx, y: sy, r: sr, works };
    });

    return { ...r, i, x, y, R, laneY, strands };
  });

  const extent = Math.max(...regions.map((r) => Math.hypot(r.x, r.y) + r.R)) + 130;
  return { regions, extent };
}

export default function RelatedWorkMap() {
  const { regions, extent } = useMemo(buildLayout, []);
  const byId = useMemo(() => {
    const m = {};
    regions.forEach((r) => {
      m[r.id] = { region: r };
      r.strands.forEach((s) => {
        m[s.id] = { region: r, strand: s };
        s.works.forEach((w) => (m[w.id] = { region: r, strand: s, work: w }));
      });
    });
    return m;
  }, [regions]);

  const frame = useRef(null);
  const [size, setSize] = useState({ W: 900, H: 640 });
  const [cam, setCam] = useState({ x: 0, y: 0, k: 0.5 });
  const [lensT, setLensT] = useState(0);
  const [lens, setLens] = useState("map");
  const [focus, setFocus] = useState(null); // a region or strand id
  const [selected, setSelected] = useState(null); // a work id, or "center"
  const [hover, setHover] = useState(null);
  const [appear, setAppear] = useState(0);
  const [touched, setTouched] = useState(false);

  const camRef = useRef(cam);
  camRef.current = cam;
  const lensRef = useRef(lensT);
  lensRef.current = lensT;
  const tweenRef = useRef(0);
  const dragged = useRef(false);

  // --- Fitting the camera ---------------------------------------------------

  const fitAll = useCallback(() => ({ x: 0, y: 0, k: Math.min(size.W, size.H) / (2 * extent) }), [size, extent]);
  const fitRegion = useCallback(
    (r) => ({ x: r.x, y: r.y, k: Math.min(size.W, size.H) / (2 * r.R * 1.3) }),
    [size]
  );
  const fitStrand = useCallback(
    (s) => ({ x: s.x + s.r * 0.35, y: s.y, k: Math.min(size.W / (2 * s.r * 2.1), size.H / (2 * s.r * 1.45)) }),
    [size]
  );
  const fitTimeline = useCallback(
    () => ({ x: 0, y: 0, k: Math.min(size.W / (TL_X1 - TL_X0 + 120), size.H / (LANE * relatedWork.length + 120)) }),
    [size]
  );

  // --- Animation ------------------------------------------------------------

  const tween = useCallback((to, duration = 800) => {
    cancelAnimationFrame(tweenRef.current);
    const c0 = camRef.current;
    const l0 = lensRef.current;
    const c1 = to.cam || c0;
    const l1 = to.lensT ?? l0;
    const t0 = performance.now();
    const step = (now) => {
      const t = ease(clamp((now - t0) / duration, 0, 1));
      setCam({
        x: lerp(c0.x, c1.x, t),
        y: lerp(c0.y, c1.y, t),
        k: Math.exp(lerp(Math.log(c0.k), Math.log(c1.k), t)),
      });
      setLensT(lerp(l0, l1, t));
      if (t < 1) tweenRef.current = requestAnimationFrame(step);
    };
    tweenRef.current = requestAnimationFrame(step);
  }, []);

  // Size to the frame, and start fitted.
  useEffect(() => {
    const el = frame.current;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setSize({ W: width, H: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setCam(lensRef.current > 0.5 ? fitTimeline() : fitAll());
    setFocus(null);
    // Only when the frame changes size.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  // Draw in the first time the map scrolls into view.
  useEffect(() => {
    const el = frame.current;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now) => {
        const t = clamp((now - t0) / 1800, 0, 1);
        setAppear(t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // --- Navigation -----------------------------------------------------------

  const goTo = useCallback(
    (id) => {
      setTouched(true);
      if (!id) {
        setFocus(null);
        tween({ cam: fitAll() });
        return;
      }
      const hit = byId[id];
      setFocus(id);
      tween({ cam: hit.strand ? fitStrand(hit.strand) : fitRegion(hit.region) });
    },
    [byId, fitAll, fitRegion, fitStrand, tween]
  );

  const zoomOut = useCallback(() => {
    if (selected) return setSelected(null);
    if (lens === "time") return tween({ cam: fitTimeline() });
    if (!focus) return;
    const hit = byId[focus];
    goTo(hit.strand ? hit.region.id : null);
  }, [selected, lens, focus, byId, goTo, tween, fitTimeline]);

  const setLensTo = (next) => {
    if (next === lens) return;
    setTouched(true);
    setLens(next);
    setSelected(null);
    setFocus(null);
    tween({ cam: next === "time" ? fitTimeline() : fitAll(), lensT: next === "time" ? 1 : 0 }, 1300);
  };

  const zoomAt = useCallback((px, py, f) => {
    cancelAnimationFrame(tweenRef.current);
    setCam((c) => {
      const k = clamp(c.k * f, K_MIN, K_MAX);
      const wx = c.x + px / c.k;
      const wy = c.y + py / c.k;
      return { x: wx - px / k, y: wy - py / k, k };
    });
  }, []);

  // Pinch (or ⌘/ctrl + scroll) zooms; a plain scroll keeps scrolling the page.
  useEffect(() => {
    const el = frame.current;
    const onWheel = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      setTouched(true);
      const r = el.getBoundingClientRect();
      zoomAt(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2, Math.exp(-e.deltaY * 0.01));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // Drag to pan; two fingers to pinch.
  const pointers = useRef(new Map());
  const onPointerDown = (e) => {
    if (e.target.closest(".rw-ui")) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    cancelAnimationFrame(tweenRef.current);

    const move = (ev) => {
      const p = pointers.current;
      if (!p.has(ev.pointerId)) return;
      const prev = p.get(ev.pointerId);
      if (p.size === 1) {
        const dx = ev.clientX - prev.x;
        const dy = ev.clientY - prev.y;
        if (Math.abs(dx) + Math.abs(dy) > 0) {
          if (Math.hypot(dx, dy) > 3) dragged.current = true;
          setCam((c) => ({ ...c, x: c.x - dx / c.k, y: c.y - dy / c.k }));
        }
      } else if (p.size === 2) {
        const [a, b] = [...p.entries()].map(([id, v]) => (id === ev.pointerId ? { x: ev.clientX, y: ev.clientY } : v));
        const [a0, b0] = [...p.values()];
        const d0 = Math.hypot(a0.x - b0.x, a0.y - b0.y);
        const d1 = Math.hypot(a.x - b.x, a.y - b.y);
        const r = frame.current.getBoundingClientRect();
        dragged.current = true;
        zoomAt((a.x + b.x) / 2 - r.left - r.width / 2, (a.y + b.y) / 2 - r.top - r.height / 2, d1 / d0);
      }
      p.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      setTouched(true);
    };
    const up = (ev) => {
      pointers.current.delete(ev.pointerId);
      if (pointers.current.size === 0) {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
      }
    };
    if (pointers.current.size === 1) {
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    }
  };

  // A click that wasn't the end of a drag.
  const tap = (fn) => (e) => {
    e.stopPropagation();
    if (dragged.current) return;
    fn();
  };

  const onKey = (e) => {
    if (e.key === "Escape") zoomOut();
    if (e.key === "+" || e.key === "=") zoomAt(0, 0, 1.5);
    if (e.key === "-") zoomAt(0, 0, 1 / 1.5);
  };

  // --- Drawing --------------------------------------------------------------

  const { W, H } = size;
  const narrow = W < 640;
  const { k } = cam;
  const sx = (wx) => (wx - cam.x) * k + W / 2;
  const sy = (wy) => (wy - cam.y) * k + H / 2;
  const inView = (x, y, pad = 200) => x > -pad && x < W + pad && y > -pad && y < H + pad;

  const mapA = 1 - ease(lensT); // map-only things fade out on the timeline
  const listT = ease(band(k, 1.9, 3.0));
  const strandA = band(k, 0.75, 1.15) * mapA;
  const strandLabelA = band(k, 0.95, 1.35) * mapA;
  const workLabelA = band(k, 2.6, 3.2) * mapA;
  const dotR = clamp(1.6 + k * 0.9, 2.2, 4.2);

  const focusHit = focus ? byId[focus] : null;
  const hoverHit = hover && byId[hover];
  // The pane shows the work you're pointing at, or the one you clicked, which
  // stays until you close it or click another.
  const hoverWork = hoverHit?.work ? hover : null;
  const paneId = hoverWork || selected;
  const paneHit = paneId && paneId !== "center" ? byId[paneId] : null;
  const lit = hoverHit?.region || focusHit?.region || paneHit?.region;

  // A click on the circle you're in zooms back out; on any other, it zooms in.
  // The cursor says which.
  const regionInside = (r) => focusHit?.region.id === r.id;
  const clickRegion = (r) => goTo(regionInside(r) ? null : r.id);
  const clickStrand = (r, s) => goTo(focus === s.id ? r.id : s.id);
  const zoomClass = (out) => (out ? " zoom-out" : " zoom-in");

  return (
    <div className="rw">
      <div
        ref={frame}
        className={`rw-frame${lens === "time" ? " is-time" : ""}${focus || selected ? " zoom-out" : ""}`}
        onPointerDown={onPointerDown}
        onClick={(e) => !e.target.closest(".rw-ui") && tap(zoomOut)(e)}
        onKeyDown={onKey}
        tabIndex={0}
        role="application"
        aria-label="A zoomable map of the dissertation's related work"
      >
        <svg width={W} height={H} className="rw-svg">
          <title>Related work</title>
          {/* Timeline: lanes and the line of years */}
          {lensT > 0.01 && (
            <g opacity={ease(lensT)}>
              {regions.map((r) => (
                <g key={r.id}>
                  <line x1={sx(TL_X0 - 20)} x2={sx(TL_X1 + 20)} y1={sy(r.laneY)} y2={sy(r.laneY)} className="rw-lane" />
                  <text x={sx(TL_X0 - 20)} y={sy(r.laneY) - 10} className="rw-lane-label">
                    {narrow ? r.short : r.title}
                  </text>
                </g>
              ))}
              {[1960, 1970, 1980, 1990, 2000, 2010, 2020].map((yr) => {
                const y0 = sy(regions[regions.length - 1].laneY + LANE * 0.62);
                return (
                  <g key={yr}>
                    <line x1={sx(yearX(yr))} x2={sx(yearX(yr))} y1={sy(regions[0].laneY - LANE * 0.5)} y2={y0 - 16} className="rw-tick" />
                    <text x={sx(yearX(yr))} y={y0} textAnchor="middle" className="rw-year">
                      {yr}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Map: lines from each body of work to the center */}
          <g opacity={mapA}>
            {regions.map((r) => {
              const d = Math.hypot(r.x, r.y);
              const ux = r.x / d;
              const uy = r.y / d;
              const on = lit?.id === r.id;
              const draw = ease(clamp(appear * 2 - 0.3 - r.i * 0.08, 0, 1));
              return (
                <path
                  key={r.id}
                  d={inkLine(
                    sx(ux * 28),
                    sy(uy * 28),
                    sx(ux * 28 + (r.x - ux * (r.R + 28)) * draw),
                    sy(uy * 28 + (r.y - uy * (r.R + 28)) * draw),
                    r.i
                  )}
                  className={`rw-link${on ? " is-on" : ""}`}
                />
              );
            })}
          </g>

          {/* Map: bodies of work and their strands */}
          {regions.map((r) => {
            const draw = ease(clamp(appear * 1.6 - r.i * 0.1, 0, 1));
            const on = lit?.id === r.id;
            const cx = sx(r.x);
            const cy = sy(r.y);
            // Titles sit on the outward side, clear of the center and of the
            // strand titles once those appear.
            const below = r.y > 1;
            const lift = strandLabelA > 0.5 ? 18 : 12;
            const title = narrow ? r.short : r.title;
            return (
              <g key={r.id} opacity={mapA}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r.R * k}
                  className={`rw-region${on ? " is-on" : ""}${zoomClass(regionInside(r))}`}
                  onClick={tap(() => clickRegion(r))}
                  onPointerEnter={() => setHover(r.id)}
                  onPointerLeave={() => setHover(null)}
                />
                {[0, 1].map((pass) => (
                  <path
                    key={pass}
                    d={inkCircle(cx, cy, r.R * k, r.i + 1 + pass * 0.6)}
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset={1 - draw}
                    className={`rw-ink rw-ink-${pass}${on ? " is-on" : ""}`}
                  />
                ))}
                <g opacity={strandA}>
                  {r.strands.map((s, j) => (
                    <g key={s.id}>
                      <circle
                        cx={sx(s.x)}
                        cy={sy(s.y)}
                        r={s.r * k}
                        className={`rw-strand${focus === s.id ? " is-on" : ""}${zoomClass(focus === s.id)}`}
                        onClick={tap(() => clickStrand(r, s))}
                      />
                      <path
                        d={inkCircle(sx(s.x), sy(s.y), s.r * k, r.i * 7 + j + 3)}
                        className={`rw-ink rw-ink-strand${focus === s.id ? " is-on" : ""}`}
                      />
                    </g>
                  ))}
                  {strandLabelA > 0.01 &&
                    r.strands.map(
                      (s) =>
                        inView(sx(s.x), sy(s.y - s.r)) && (
                          <text
                            key={s.id}
                            x={sx(s.x)}
                            y={sy(s.y - s.r) - 8}
                            textAnchor="middle"
                            opacity={strandLabelA}
                            className={`rw-strand-label${zoomClass(focus === s.id)}`}
                            onClick={tap(() => clickStrand(r, s))}
                          >
                            {s.title}
                          </text>
                        )
                    )}
                </g>
                <g
                  opacity={draw}
                  onClick={tap(() => clickRegion(r))}
                  className={`rw-region-label${zoomClass(regionInside(r))}`}
                >
                  <text
                    x={cx}
                    y={below ? sy(r.y + r.R) + 30 : sy(r.y - r.R) - lift}
                    textAnchor="middle"
                    className="rw-title"
                  >
                    {title}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Works */}
          {regions.map((r) =>
            r.strands.map((s) =>
              s.works.map((w) => {
                // Each work leaves for the timeline a little after the one before
                // it in time, so the dots travel as a wave.
                const delay = ((w.year - YEAR0) / (YEAR1 - YEAR0)) * 0.4;
                const lt = ease(clamp((lensT - delay) / 0.6, 0, 1));
                const mx = lerp(w.fx, w.lx, listT);
                const my = lerp(w.fy, w.ly, listT);
                const x = sx(lerp(mx, w.tx, lt));
                const y = sy(lerp(my, w.ty, lt));
                if (!inView(x, y, 300)) return null;
                const pop = ease(clamp(appear * 2.2 - 0.5 - r.i * 0.1 - w.order * 0.03, 0, 1));
                const isHover = hover === w.id;
                const isSel = selected === w.id;
                const labelA = Math.max(workLabelA, isHover || isSel ? 1 : 0);
                return (
                  <g
                    key={w.id}
                    className={`rw-work${isHover ? " is-hover" : ""}${isSel ? " is-sel" : ""}`}
                    onClick={tap(() => setSelected(w.id))}
                    onPointerEnter={() => setHover(w.id)}
                    onPointerLeave={() => setHover(null)}
                  >
                    <circle cx={x} cy={y} r={Math.max(8, dotR + 4)} className="rw-hit" />
                    <circle cx={x} cy={y} r={(isHover || isSel ? dotR + 1.5 : dotR) * pop} className="rw-dot" />
                    {labelA > 0.01 && (
                      <text x={x + 9} y={y + 4} opacity={labelA} className="rw-work-label">
                        {w.name}
                        <tspan className="rw-work-meta"> {w.year}</tspan>
                      </text>
                    )}
                  </g>
                );
              })
            )
          )}

          {/* This dissertation, in the middle */}
          <g
            opacity={mapA * ease(clamp(appear * 3, 0, 1))}
            className="rw-center"
            onClick={tap(() => setSelected("center"))}
          >
            <circle cx={sx(0)} cy={sy(0)} r={16} className="rw-center-halo" />
            <circle cx={sx(0)} cy={sy(0)} r={6} className="rw-center-dot" />
            <text x={sx(0)} y={sy(0) + 30} textAnchor="middle" className="rw-center-label">
              GenUI based on Task Structures
            </text>
            <text x={sx(0)} y={sy(0) + 46} textAnchor="middle" className="rw-center-sub">
              this dissertation
            </text>
          </g>
        </svg>

        {/* Where am I */}
        <nav className="rw-ui rw-crumbs" aria-label="Where you are in the map">
          <button onClick={() => (lens === "time" ? setLensTo("map") : goTo(null))}>Related work</button>
          {lens === "map" && focusHit && (
            <>
              <span>›</span>
              <button onClick={() => goTo(focusHit.region.id)}>{focusHit.region.title}</button>
            </>
          )}
          {lens === "map" && focusHit?.strand && (
            <>
              <span>›</span>
              <button onClick={() => goTo(focusHit.strand.id)}>{focusHit.strand.title}</button>
            </>
          )}
          {lens === "time" && (
            <>
              <span>›</span>
              <span className="rw-crumb-here">by year</span>
            </>
          )}
        </nav>

        <div className="rw-ui rw-lens" role="tablist">
          {["map", "time"].map((l) => (
            <button key={l} role="tab" aria-selected={lens === l} className={lens === l ? "is-on" : ""} onClick={() => setLensTo(l)}>
              {l === "map" ? "Map" : "Timeline"}
            </button>
          ))}
        </div>

        <div className="rw-ui rw-zoom">
          <button aria-label="Zoom in" onClick={() => zoomAt(0, 0, 1.6)}>
            <Plus size={14} strokeWidth={1.5} />
          </button>
          <button aria-label="Zoom out" onClick={() => zoomAt(0, 0, 1 / 1.6)}>
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <button aria-label="Fit" onClick={() => (lens === "time" ? tween({ cam: fitTimeline() }) : goTo(null))}>
            <Maximize2 size={13} strokeWidth={1.5} />
          </button>
        </div>

        <div className="rw-fade" aria-hidden="true" />

        <p className={`rw-ui rw-hint${touched || paneId ? " is-gone" : ""}`}>
          Click to dive in · drag to pan · pinch or ⌘-scroll to zoom
        </p>

        {/* The paper you're pointing at; click to keep it here */}
        <aside
          className={`rw-ui rw-pane${paneId ? " is-open" : ""}${selected && !hoverWork ? " is-pinned" : ""}`}
          aria-live="polite"
        >
          {paneId === "center" && (
            <>
              <p className="rw-pane-where">This dissertation</p>
              <h4>GenUI based on Task Structures</h4>
              <p>
                Explicit, computational representations of a task's objects and
                relationships, turned into interfaces through patterns, as a
                shared ground for people and AI.
              </p>
            </>
          )}
          {paneHit && (
            <>
              <p className="rw-pane-where">
                {paneHit.region.title} · {paneHit.strand.title}
              </p>
              <h4>{paneHit.work.name}</h4>
              <p className="rw-pane-by">
                {paneHit.work.by}, {paneHit.work.year}
              </p>
              <p>{paneHit.work.note}</p>
              <a
                href={`https://scholar.google.com/scholar?q=${encodeURIComponent(`${paneHit.work.name} ${paneHit.work.by}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find it on Google Scholar ↗
              </a>
            </>
          )}
          {selected && (
            <button className="rw-pane-close" aria-label="Close" onClick={() => setSelected(null)}>
              ×
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
