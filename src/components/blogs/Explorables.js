import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Section, Subtitle, Paragraph, Highlight, Divider } from "./BlogComponents";
import ScrubClip from "./explorables/ScrubClip";

const IMG = "/images/blog/explorables";
const SITE = "https://explorables.fly.dev";

// Each essay's own cursor (from its css/ or js/cursor.js); Promoted keeps the system one.
const CURSORS = {
  "determien-dogs": "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2226%22%20height%3D%2226%22%20viewBox%3D%220%200%2026%2026%22%3E%3Cg%20fill%3D%22%23231d1a%22%20opacity%3D%22.88%22%3E%3Cellipse%20cx%3D%2213%22%20cy%3D%2216.5%22%20rx%3D%225.6%22%20ry%3D%224.6%22%2F%3E%3Cellipse%20cx%3D%226.2%22%20cy%3D%2210.2%22%20rx%3D%222.1%22%20ry%3D%222.7%22%20transform%3D%22rotate%28-20%206.2%2010.2%29%22%2F%3E%3Cellipse%20cx%3D%2210.6%22%20cy%3D%226.6%22%20rx%3D%222.1%22%20ry%3D%222.8%22%2F%3E%3Cellipse%20cx%3D%2215.6%22%20cy%3D%226.6%22%20rx%3D%222.1%22%20ry%3D%222.8%22%2F%3E%3Cellipse%20cx%3D%2219.9%22%20cy%3D%2210.2%22%20rx%3D%222.1%22%20ry%3D%222.7%22%20transform%3D%22rotate%2820%2019.9%2010.2%29%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\") 13 13, auto",
  "oysters-v2": "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2722%27%20height%3D%2722%27%3E%3Ccircle%20cx%3D%279%27%20cy%3D%279%27%20r%3D%276.2%27%20fill%3D%27%23fbf3e2%27%20stroke%3D%27%232b3440%27%20stroke-width%3D%271.6%27%2F%3E%3Ccircle%20cx%3D%277.2%27%20cy%3D%277%27%20r%3D%271.6%27%20fill%3D%27%23ffffff%27%2F%3E%3C%2Fsvg%3E\") 9 9, auto",
  "wine": "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2222%22%20height%3D%2224%22%20viewBox%3D%22-1%20-1%2022%2024%22%3E%3Cpath%20d%3D%22M1.2%201.4%20L1.6%2019.2%20C1.6%2020.1%202.7%2020.5%203.3%2019.8%20L7.6%2014.9%20C7.9%2014.6%208.3%2014.4%208.7%2014.4%20L15.2%2014.2%20C16.1%2014.2%2016.5%2013.1%2015.8%2012.5%20L2.8%200.7%20C2.2%200.2%201.2%200.6%201.2%201.4%20Z%22%20fill%3D%22%23e2643a%22%20transform%3D%22translate%281.6%201.3%29%22%2F%3E%3Cpath%20d%3D%22M1.2%201.4%20L1.6%2019.2%20C1.6%2020.1%202.7%2020.5%203.3%2019.8%20L7.6%2014.9%20C7.9%2014.6%208.3%2014.4%208.7%2014.4%20L15.2%2014.2%20C16.1%2014.2%2016.5%2013.1%2015.8%2012.5%20L2.8%200.7%20C2.2%200.2%201.2%200.6%201.2%201.4%20Z%22%20fill%3D%22none%22%20stroke%3D%22%232b4ca0%22%20stroke-width%3D%221.7%22%20stroke-linejoin%3D%22round%22%20style%3D%22mix-blend-mode%3Amultiply%22%2F%3E%3C%2Fsvg%3E\") 2 2, auto"
};

// Four with a scroll-through clip, then the rest as stills.
const featured = [
  { id: "determien-dogs", title: "Sit, Stay, Think", style: "needle-felted fur", text: "how we test the minds of dogs and cats, and why breed explains only nine percent." },
  { id: "peter", title: "Promoted", style: "crayon, a simulation you run", text: "why promoting your best people, every time, can make the whole company worse." },
  { id: "oysters-v2", title: "The Half Shell", style: "sunlit watercolour", text: "why oysters taste of their water, and cost a dollar or a hundred." },
  { id: "wine", title: "The Shelf", style: "a printed essay", text: "eight thousand years of wine, and why one bottle costs more than a house." },
];
const more = [
  { id: "luck", title: "Lucky", text: "talent, luck, and who ends up on top." },
  { id: "thinking", title: "Thinking Inside the Box", text: "do LLMs make us think worse?" },
  { id: "bags", title: "Unstitched", text: "why a leather bag costs ten thousand dollars." },
  { id: "paper", title: "Fibre by Fibre", text: "what a sheet of paper is made of." },
];

const Loop = ({ name, title }) => (
  <ScrubClip src={`${IMG}/${name}.mp4`} poster={`${IMG}/${name}.jpg`} label={`Scroll through ${title}`} cursor={CURSORS[name]} />
);

// A small inked play button: a hand-drawn ring and a filled triangle.
const InkPlay = () => (
  <svg className="xp-play" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
    <path d="M11 1.6c5.3-.1 9.5 4 9.4 9.3-.1 5.4-4.2 9.6-9.5 9.5C5.6 20.3 1.5 16.2 1.6 10.9 1.7 5.7 5.9 1.7 11 1.6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 6.9l6 3.9c.4.3.4.8 0 1.1l-6 3.8c-.5.3-1-.1-1-.6V7.5c0-.5.5-.9 1-.6z" fill="currentColor" />
  </svg>
);

const ext = { target: "_blank", rel: "noopener noreferrer" };

const Explorables = () => (
  <div className="chatlet-page xp-page">
    <p className="chatlet-tagline">
      A fun exploration of how I can get my hundred whys answered, with scrolly articles and explainer videos.
    </p>

    <Paragraph>
      I love the explorable explanations, the ones where you scroll and the
      drawing does the explaining. They take weeks to make. So I wanted to see
      how far one prompt could go: ask a question, attach a picture you like,
      and get back{" "}
      <Highlight>
        a researched, illustrated essay drawn in that picture's style
      </Highlight>
      , plus a short video you can pause and ask questions to.
    </Paragraph>

    <Divider />

    <Section id="examples">
      <Subtitle>A few explorables</Subtitle>
      <div className="chatlet-examples">
        {featured.map((e) => (
          <figure key={e.id} className="chatlet-example xp-example">
            <a href={`${SITE}/e/${e.id}/`} {...ext} aria-label={`Open ${e.title}`}>
              <Loop name={e.id} title={e.title} />
            </a>
            <figcaption>
              <strong>{e.title}</strong> <span className="xp-style">{e.style}</span>{" "}
              {e.text}
              <a className="xp-explainer" href={`${SITE}/v/${e.id}/`} {...ext}>
                <InkPlay /> Watch the explainer
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="xp-more">
        {more.map((e) => (
          <a key={e.id} className="xp-card" href={`${SITE}/e/${e.id}/`} {...ext}>
            <img src={`${IMG}/${e.id}.jpg`} alt={e.title} loading="lazy" />
            <span>
              <strong>{e.title}</strong> {e.text}
            </span>
          </a>
        ))}
      </div>
      <div className="chatlet-links xp-links">
        <a href={SITE} {...ext}>See them live <ArrowUpRight size={15} /></a>
        <a href="https://github.com/Rrrima/explorables" {...ext}>GitHub <ArrowUpRight size={15} /></a>
      </div>
    </Section>

    <Divider />

    <Section id="make">
      <Subtitle>Make your own</Subtitle>
      <Paragraph>
        Now a Claude skill. Drop it into Claude Code, then ask away:
      </Paragraph>
      <pre className="xp-cmd">
        <span className="xp-dim"># install</span>
        {"\n"}git clone https://github.com/Rrrima/explorables.git ~/.claude/skills/explorable
        {"\n\n"}
        <span className="xp-dim"># then, in Claude Code</span>
        {"\n"}/explorable how does a sourdough starter work?{" "}
        <span className="xp-dim">[attach a picture]</span>
      </pre>
    </Section>
  </div>
);

export default Explorables;
