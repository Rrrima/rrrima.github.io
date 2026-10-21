import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Section, Subtitle, Paragraph, Highlight, Divider } from "./BlogComponents";
import JellySpec from "./jelly-spec/JellySpec";

const IMG = "/images/blog/jelly";
const PEOPLE_IMG = "/images/blog/chatlet/people";

const people = [
  { name: "Yining 'Rima' Cao", photo: `${PEOPLE_IMG}/yining.jpg`, url: "https://www.linkedin.com/in/yining-rima-cao-7141a6198/" },
  { name: "Peiling Jiang", photo: `${PEOPLE_IMG}/peiling.jpg`, url: "https://jiang.pl/" },
  { name: "Haijun Xia", photo: `${PEOPLE_IMG}/haijun.jpg`, url: "https://www.linkedin.com/in/haijunxia/" },
];

const examples = [
  { clip: "moving", title: "Moving to San Francisco", text: "areas on a map, then safety ratings, then a table to compare them, each one a change to the model." },
  { clip: "newyork", title: "What about New York?", text: "the same plan, pointed at another city." },
  { clip: "party", title: "Hosting a dinner party", text: "guests, their dietary restrictions, and a menu that respects them, all linked." },
];

const ext = { target: "_blank", rel: "noopener noreferrer" };

const Loop = ({ name }) => (
  <video
    className="chatlet-loop"
    src={`${IMG}/${name}.mp4`}
    poster={`${IMG}/${name}.jpg`}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
  />
);

const Person = ({ p }) => {
  const inner = (
    <>
      {p.photo ? <img src={p.photo} alt={p.name} /> : <i className="chatlet-initials">{p.initials}</i>}
      <span>{p.name}</span>
    </>
  );
  return p.url ? (
    <a className="chatlet-person" href={p.url} {...ext}>{inner}</a>
  ) : (
    <div className="chatlet-person">{inner}</div>
  );
};

const Jelly = () => (
  <div className="chatlet-page jl-page">
    <p className="chatlet-tagline">
      Generative and malleable user interfaces with a generative and evolving
      task-driven data model.
    </p>

    <div className="chatlet-people">
      {people.map((p) => (
        <Person key={p.name} p={p} />
      ))}
    </div>

    <div className="chatlet-links">
      <a href="https://dl.acm.org/doi/10.1145/3706598.3713285" {...ext}>Paper <ArrowUpRight size={15} /></a>
      <a href="https://arxiv.org/abs/2503.04084" {...ext}>arXiv <ArrowUpRight size={15} /></a>
    </div>

    <div className="chatlet-video">
      <iframe
        src="https://www.youtube-nocookie.com/embed/4T2ZaYowubA?rel=0"
        title="Jelly: Generative and Malleable User Interfaces"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>

    <Paragraph>
      Generated interfaces usually come out as code: you get one, and if it's
      not quite right you ask again and hope. Jelly generates a{" "}
      <Highlight>model of your task</Highlight> instead, and draws the
      interface from it. Because the model is the thing being edited, you can
      keep reshaping the interface as the task changes, by asking or by
      direct manipulation.
    </Paragraph>

    <Divider />

    <Section id="examples">
      <Subtitle>A few examples</Subtitle>
      <div className="chatlet-examples">
        {examples.map((e) => (
          <figure key={e.clip} className="chatlet-example">
            <Loop name={e.clip} />
            <figcaption>
              <strong>{e.title}</strong> {e.text}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>

    <Divider />

    <Section id="how">
      <Subtitle>How it works</Subtitle>
      <figure className="jl-figure">
        <img src={`${IMG}/pipeline.png`} alt="Jelly's pipeline: a user prompt goes through LLM-based task analysis into a task-driven data model (object-relational schema, dependency graph, schema-structured data), then LLM-based UI specification generation (pattern-informed UI mapping rules, UI state management), then rule-based rendering into a generative, malleable UI. End users customize both the interface and the data model." />
        <figcaption>The pipeline, from the paper.</figcaption>
      </figure>
      <Paragraph>
        A prompt is analyzed into a <strong>task-driven data model</strong>:
        the entities in the task, their attributes and relationships, the
        dependencies between them, and data that fits. From that model Jelly
        writes a <strong>UI specification</strong>, and fixed rules render it,
        so the same model always looks the same. Whatever you do next, typing
        a request or editing the interface by hand, changes the model or the
        spec, and the interface follows.
      </Paragraph>
      <Paragraph>
        The spec is small. Every field gets a few labels (its type, what it's
        for, whether it's editable, how to render it), and those pick the
        widget. Here is Jelly's own spec playground: change a label, or the
        spec itself, and Jelly's widget re-renders beside it.
      </Paragraph>
      <JellySpec />
    </Section>
  </div>
);

export default Jelly;
