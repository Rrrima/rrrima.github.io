import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, Subtitle, Paragraph, Highlight, Divider } from "./BlogComponents";
import CalendarScrolly from "./chatlet/CalendarScrolly";
import ChatletPet from "./chatlet/ChatletPet";

const IMG = "/images/blog/chatlet";

const people = [
  { name: "Yining 'Rima' Cao", photo: "yining.jpg", url: "https://www.linkedin.com/in/yining-rima-cao-7141a6198/" },
  { name: "Nathalie Henry Riche", photo: "nathalie.jpg", url: "https://www.linkedin.com/in/nathalie-henry-riche-2375b0106/" },
  { name: "Siân Lindley", photo: "sian.jpg", url: "https://www.linkedin.com/in/sianlindley/" },
  { name: "Hugo Romat", photo: "hugo.jpg", url: "https://www.linkedin.com/in/hugo-romat-3a64b188/" },
  { name: "Haijun Xia", photo: "haijun.jpg", url: "https://www.linkedin.com/in/haijunxia/" },
];

const examples = [
  { clip: "brunch", title: "Brunch on Friday", text: "nobody asks. a poll shows up as soon as dates come up." },
  { clip: "constraint", title: "…but it opens at 11", text: "a constraint lands on the map, and the group moves the plan." },
  { clip: "timezone", title: "Schedule a meeting", text: "everyone's availability, across time zones, in one place." },
  { clip: "cover", title: "Choose a cover", text: "the discussion moves onto the designs themselves." },
  { clip: "trip", title: "Plan a whole trip", text: "a sprawling chat becomes a plan you can navigate." },
];

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

const Chatlet = () => (
  <div className="chatlet-page">
    <p className="chatlet-tagline">
      Generative interfaces for collaborative decision-making.
    </p>

    <div className="chatlet-people">
      {people.map((p) => {
        const inner = (
          <>
            <img src={`${IMG}/people/${p.photo}`} alt={p.name} />
            <span>{p.name}</span>
          </>
        );
        return p.url ? (
          <a key={p.photo} className="chatlet-person" href={p.url} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <div key={p.photo} className="chatlet-person">{inner}</div>
        );
      })}
    </div>

    <div className="chatlet-links">
      <a href="https://chatlet-signup.fly.dev/?ref=website" target="_blank" rel="noopener noreferrer">Try it out (sign up for early access) <ArrowUpRight size={15} /></a>
    </div>

    <div className="chatlet-video">
      <iframe
        src="https://www.youtube-nocookie.com/embed/5JdqTr4Muxo?rel=0"
        title="Chatlet: Generative Interfaces for Collaborative Decision-Making"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>

    <Paragraph>
      Group chats are where plans actually get made, and also where they get
      lost. Dates, places, "i can't do mornings", a link someone sent 40
      messages ago… Chatlet lives beside the chat and turns the conversation
      into an interface the group can decide with.{" "}
      <Highlight>You don't have to ask for it.</Highlight> It takes shape as
      people talk, and keeps evolving with the conversation.
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
      <div className="chatlet-flow">
        <span>conversation</span>
        <i><ArrowRight size={14} /></i>
        <span>decision object</span>
        <i><ArrowRight size={14} /></i>
        <span>live interface</span>
      </div>
      <Paragraph>
        Instead of generating a new UI every turn, Chatlet keeps one shared{" "}
        <strong>decision object</strong> per room:
      </Paragraph>
      <ul className="chatlet-steps">
        <li>
          <strong>Things</strong>: typed objects the group talks about, like
          a restaurant with its location, hours and price.
        </li>
        <li>
          <strong>Slots</strong>: facts to settle (dates, budget) and
          decisions with their alternatives, plus who prefers what and the
          constraints that came up.
        </li>
        <li>
          <strong>Views</strong>: each decision picks how to show itself:
          cards, a map, a compare table, a calendar or time pool, a dashboard,
          or custom code when nothing else fits.
        </li>
      </ul>
      <Paragraph>
        As the chat goes on, an agent decides whether a new message changes
        the decision and merges small updates into the object, so the interface{" "}
        <em>evolves</em> instead of being regenerated, and everyone keeps
        working on the same thing in real time.
      </Paragraph>
    </Section>

    <Section id="calendar">
      <Subtitle>Inside one widget: the calendar</Subtitle>
      <Paragraph>
        Here is what that looks like for one decision. On the left, what
        happens in the chat; on the right, the few lines of spec it adds and
        what the calendar draws from them.
      </Paragraph>
      <CalendarScrolly />
    </Section>

    <Divider />

    <Section id="next">
      <Subtitle>We're finding early users</Subtitle>
      <Paragraph>
        We're now putting it in front of real groups and their real
        conversations, to see what happens when the interface keeps up with
        the conversation instead of waiting to be asked.
      </Paragraph>
      <Paragraph>Come try it with us.</Paragraph>
      <div className="chatlet-pet-stage">
        <ChatletPet href="https://chatlet-signup.fly.dev/?ref=website">
          Sign up to try Chatlet early
        </ChatletPet>
      </div>
    </Section>
  </div>
);

export default Chatlet;
