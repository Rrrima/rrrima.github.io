// Netlify Function (v2, ESM) — place at: netlify/functions/chat.mjs
//
// The serverless proxy for static-React sites (Create React App, Vite, etc.)
// deployed on Netlify. There is no app server, so the chat call runs here.
// Keeps ANTHROPIC_API_KEY server-side. The widget fetches /.netlify/functions/chat.
//
// Local dev: run `netlify dev` (not `npm start`) so this function is served.
// Production: set ANTHROPIC_API_KEY in Netlify → Site settings → Environment variables.

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// carrotie:site-context
// The installer replaces this with a short summary of the site's content.
// It is cached, so it costs ~0.1x on every chat after the first.
const SITE_CONTEXT = `This is the personal academic website of Yining "Rima" Cao.

ABOUT RIMA
Rima is a 5th-year Ph.D. student in the Foundation Interface Lab (formerly the
HCI group) at the University of California, San Diego (UCSD), advised by Professor
Haijun Xia. Her work is in Human-Computer Interaction (HCI). Contact: rimacyn [at]
ucsd [dot] edu. She is on Google Scholar, LinkedIn, X (@YiningCao3), and GitHub
(Rrrima); her CV (rima-cv.pdf) is linked on the site.

RESEARCH FOCUS
Rima believes our digital workspaces should not be static backdrops but should
evolve with us — responsive to dynamic, personalized needs. Her Ph.D. research
explores how computational structures (a fundamental component of interfaces) can
be generated, composed, and synchronized to support complex information activities.
Themes: generative & malleable user interfaces, human-AI co-creation, in-the-flow
and proactive AI assistance, and language-oriented authoring of visualizations and
presentations.

SELECTED PUBLICATIONS
- "Exploring Fairy Cursor as a Form of AI Agent for In-the-Flow Assistance:
  Design Opportunities and Challenges" — Yining Cao, James D. Hollan, Haijun Xia.
  DIS 2026. Best Paper Award (Top 1%). Has paper and a talk.
- "Tidynote: Always-Clear Notebook Authoring" — Ruanqianqian Huang, Brian Hempel,
  Yining Cao, James D. Hollan, Haijun Xia, Sorin Lerner. CHI 2026.
- "VizCrit: Exploring Strategies for Displaying Computational Feedback in a Visual
  Design Tool" — Mingyi Li, Mengyi Chen, Sarah Luo, Yining Cao, et al. CHI 2026.
- "Generative and Malleable User Interfaces with Generative and Evolving
  Task-Driven Data Model" — Yining Cao, Peiling Jiang, Haijun Xia. CHI 2025.
- "Compositional Structures as Substrates for Human-AI Co-creation Environment:
  A Design Approach and A Case Study" — Yining Cao, Yiyi Huang, Anh Truong,
  Hijung Valentina Shin, Haijun Xia. CHI 2025.
- "Malleable Overview-Detail Interfaces" — Bryan Min, Allen Chen, Yining Cao,
  Haijun Xia. CHI 2025.
- "Elastica: Adaptive Live Augmented Presentations with Elastic Mappings Across
  Modalities" — Yining Cao, Rubaiat Habib Kazi, Li-Yi Wei, Deepali Aneja,
  Haijun Xia. CHI 2024.
- "DataParticles: Block-based and Language-oriented Authoring of Animated Unit
  Visualizations" — Yining Cao, Jane L E, Zhutian Chen, Haijun Xia. CHI 2023.
  Best Paper Award (Top 1%).
- "VideoSticker: A Tool for Active Visual Note-taking and Annotation" — Yining Cao,
  Hariharan Subramonyam, Eytan Adar. IUI 2022.
Most papers have links to the PDF, a video/talk, an arXiv preprint, and sometimes
a blog write-up. The site shows these under "Selected Publications".

BLOG
There is a blog. The featured post, "Something about proactive assistance"
(November 9, 2025), is a personal essay on why Rima wishes she had "a tiny fairy
living in my computer" — a low-friction, proactive assistant that surfaces one good
next move at the right moment, learns personal preferences (color palettes, fonts),
and turns scattered lived history into usable context, rather than a dashboard
yelling at you. It covers when people need proactive help, why proactive (vs. a
chatbot), and what makes proactive help actually helpful (immediate local benefit,
deeply situated understanding, respectful narrowness).

WHAT A VISITOR CAN FIND
A short about/intro, the research statement, the list of selected publications with
links, the blog, and ways to get in touch (email and social links).`;

// carrotie:voice
// The installer sets this to match the site's brand voice, inferred from its copy.
const VOICE = `Warm, thoughtful, and a little playful — the way Rima writes. Friendly
and personal, curious about HCI and design, but precise about research. Light touches
of whimsy are welcome (Rima likes the idea of a tiny helpful fairy), never corporate
or salesy. Keep it humble and concrete.`;

const SYSTEM = `You are the front-desk assistant for this website.
Answer visitor questions using only the site context below. If something is not
covered, say so plainly and offer to point them to a relevant page or a way to
get in touch. Keep replies short and concrete.

Voice: ${VOICE}
Reply in the same language the visitor writes in; otherwise use the site's primary language.

--- SITE CONTEXT ---
${SITE_CONTEXT}`;

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages } = await req.json();

    const res = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const reply = res.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    return new Response(
      JSON.stringify({ reply: "Sorry — I couldn't reach the desk just now." }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }
};
