// Static React (Create React App / Vite) — place at: src/components/Carrotie.js
// Mount once in your root component (e.g. src/App.js): <Carrotie />
//
// Visitor mode: talks to the Netlify Function (read-only Q&A).
// Admin mode (LOCAL ONLY): if a `carrotie admin` server is running on your
// machine, the widget auto-detects it and lets you edit the site by chatting —
// it shows the diff and waits for you to Publish (commit + push) or Discard.
// On the live site there is no admin server reachable, so visitors only ever
// get visitor mode.

import { useEffect, useRef, useState } from "react";

// carrotie:theme
const THEME = {
  accent: "#319ace", // button + user-bubble background ($accent-color)
  accentText: "#ffffff", // text/icon shown on top of the accent colour
  surface: "#ffffff", // chat panel background ($secondary-color)
  text: "#333333", // assistant text + input text ($primary-color)
  botBubble: "#eaf5fb", // assistant bubble background (soft tint of the accent)
  fontFamily: '"Barlow", sans-serif', // $font-family-base
  radius: 16, // panel corner radius in px
};

// carrotie:copy
const COPY = {
  buttonLabel: "Chat with Rima's front desk",
  header: "Ask about Rima",
  greeting: "Hi! I'm a little helper at Rima's desk — ask me about her research, papers, or writing :)",
  adminGreeting: "Admin mode ✏️ — tell me what to change (e.g. “add my new paper…”) and I'll edit the site, then you review the diff before it goes live.",
  placeholder: "Type a message…",
  errorText: "Sorry — I couldn't reach the desk just now.",
  publish: "Publish",
  discard: "Discard",
  publishedOk: "✅ Published. Your site will rebuild in a minute or two.",
  publishedFail: "⚠️ Committed locally, but the push failed — check your terminal/git.",
  discarded: "Discarded those changes.",
};

const VISITOR_ENDPOINT = "/.netlify/functions/chat";
const ADMIN_URL = "http://localhost:4317";

export default function Carrotie() {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);

  // Local-only auto-detect: is a `carrotie admin` server running on this machine?
  useEffect(() => {
    let alive = true;
    fetch(`${ADMIN_URL}/admin/ping`)
      .then((r) => r.ok && alive && setAdmin(true))
      .catch(() => {}); // no admin server (every public visitor) → stay in visitor mode
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 9999,
        fontFamily: THEME.fontFamily,
      }}
    >
      {open && <ChatPanel admin={admin} />}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={COPY.buttonLabel}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: THEME.accent,
          boxShadow: "0 6px 24px rgba(0,0,0,.25)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Eyes />
      </button>
    </div>
  );
}

/** Two eyes whose pupils follow the cursor. Pure DOM — no AI involved. */
function Eyes() {
  const ref = useRef(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const a = Math.atan2(e.clientY - cy, e.clientX - cx);
      setP({ x: Math.cos(a) * 3, y: Math.sin(a) * 3 });
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <svg ref={ref} width="26" height="15" viewBox="0 0 34 20" aria-hidden>
      {[8, 26].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="10" r="8" fill={THEME.accentText} />
          <circle cx={cx + p.x} cy={10 + p.y} r="3.5" fill={THEME.accent} />
        </g>
      ))}
    </svg>
  );
}

function ChatPanel({ admin }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [pending, setPending] = useState(false); // uncommitted admin edits awaiting Publish/Discard
  const [lastUserMsg, setLastUserMsg] = useState("");
  const scroller = useRef(null);

  useEffect(() => {
    scroller.current?.scrollTo(0, scroller.current.scrollHeight);
  }, [messages, pending]);

  function pushAssistant(content, diff) {
    setMessages((m) => [...m, { role: "assistant", content, diff }]);
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      if (admin) {
        const res = await fetch(`${ADMIN_URL}/admin/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, sessionId }),
        });
        const data = await res.json();
        setSessionId(data.sessionId || sessionId);
        pushAssistant(data.reply || COPY.errorText, data.hasChanges ? data.diff : undefined);
        if (data.hasChanges) {
          setPending(true);
          setLastUserMsg(text);
        }
      } else {
        const res = await fetch(VISITOR_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, { role: "user", content: text }] }),
        });
        const data = await res.json();
        pushAssistant(data.reply || COPY.errorText);
      }
    } catch {
      pushAssistant(COPY.errorText);
    } finally {
      setBusy(false);
    }
  }

  async function publish() {
    setBusy(true);
    try {
      const res = await fetch(`${ADMIN_URL}/admin/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: lastUserMsg }),
      });
      const data = await res.json();
      pushAssistant(data.pushed ? COPY.publishedOk : COPY.publishedFail);
    } catch {
      pushAssistant(COPY.errorText);
    } finally {
      setPending(false);
      setBusy(false);
    }
  }

  async function discard() {
    setBusy(true);
    try {
      await fetch(`${ADMIN_URL}/admin/discard`, { method: "POST" });
      pushAssistant(COPY.discarded);
    } catch {
      pushAssistant(COPY.errorText);
    } finally {
      setPending(false);
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        width: 340,
        height: 460,
        marginBottom: 12,
        background: THEME.surface,
        borderRadius: THEME.radius,
        boxShadow: "0 10px 40px rgba(0,0,0,.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "12px 16px", background: THEME.accent, color: THEME.accentText, fontWeight: 600 }}>
        {COPY.header}
        {admin && (
          <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.8, fontWeight: 500 }}>· admin</span>
        )}
      </div>

      <div
        ref={scroller}
        style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#888", fontSize: 14 }}>{admin ? COPY.adminGreeting : COPY.greeting}</p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "90%" }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                fontSize: 14,
                lineHeight: 1.4,
                whiteSpace: "pre-wrap",
                background: m.role === "user" ? THEME.accent : THEME.botBubble,
                color: m.role === "user" ? THEME.accentText : THEME.text,
              }}
            >
              {m.content || "…"}
            </div>
            {m.diff && (
              <pre
                style={{
                  marginTop: 6,
                  padding: 10,
                  background: "#0d1117",
                  color: "#d1d5da",
                  borderRadius: 8,
                  fontSize: 11,
                  lineHeight: 1.4,
                  maxHeight: 180,
                  overflow: "auto",
                  whiteSpace: "pre",
                }}
              >
                {m.diff}
              </pre>
            )}
          </div>
        ))}
      </div>

      {pending && (
        <div style={{ display: "flex", gap: 8, padding: "8px 12px", borderTop: "1px solid #eee", background: "#fafafa" }}>
          <button
            onClick={publish}
            disabled={busy}
            style={{
              flex: 1,
              border: "none",
              background: THEME.accent,
              color: THEME.accentText,
              borderRadius: 8,
              padding: "8px 0",
              cursor: "pointer",
              opacity: busy ? 0.5 : 1,
            }}
          >
            {COPY.publish}
          </button>
          <button
            onClick={discard}
            disabled={busy}
            style={{
              flex: 1,
              border: "1px solid #ddd",
              background: "#fff",
              color: THEME.text,
              borderRadius: 8,
              padding: "8px 0",
              cursor: "pointer",
              opacity: busy ? 0.5 : 1,
            }}
          >
            {COPY.discard}
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #eee" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={COPY.placeholder}
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 14,
            color: THEME.text,
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={busy}
          style={{
            border: "none",
            background: THEME.accent,
            color: THEME.accentText,
            borderRadius: 10,
            padding: "0 14px",
            cursor: "pointer",
            opacity: busy ? 0.5 : 1,
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
