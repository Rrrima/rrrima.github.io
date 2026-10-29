import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  Section,
  Subtitle,
  Paragraph,
  Emphasis,
  Highlight,
  Quote,
  Divider,
  TableOfContents,
} from "./BlogComponents";
import GuiTimeline from "./dissertation/GuiTimeline";
import RelatedWorkMap from "./dissertation/RelatedWorkMap";

const IMG = "/images/blog/dissertation";

const ext = { target: "_blank", rel: "noopener noreferrer" };

const sections = [
  { id: "history", title: "How did we get here?" },
  { id: "question", title: "The question" },
  { id: "task-structures", title: "Task structures" },
  { id: "patterns", title: "From structure to interface" },
  { id: "dataparticles", title: "DataParticles" },
  { id: "videorigami", title: "VideOrigami" },
  { id: "jelly", title: "Jelly" },
  { id: "findings", title: "Findings" },
  { id: "next", title: "Where this goes" },
  { id: "related-work", title: "Related work" },
];

// Internal pages open in place; papers and videos open in a new tab.
const Links = ({ links }) => (
  <div className="chatlet-links">
    {links.map((l) =>
      l.to ? (
        <Link key={l.label} to={l.to}>
          {l.label} <ArrowUpRight size={15} />
        </Link>
      ) : (
        <a key={l.label} href={l.href} {...ext}>
          {l.label} <ArrowUpRight size={15} />
        </a>
      )
    )}
  </div>
);

const Figure = ({ src, alt, caption }) => (
  <figure className="jl-figure ds-figure">
    <img src={`${IMG}/${src}.jpg`} alt={alt} loading="lazy" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

const ProjectHead = ({ name, venue, thumb }) => (
  <div className="ds-project-head">
    <img src={thumb} alt="" loading="lazy" />
    <div>
      <Subtitle>{name}</Subtitle>
      <span>{venue}</span>
    </div>
  </div>
);

// The pattern examples from the talk: one task structure, the pattern it
// calls for, and the interface it becomes.
const patterns = [
  { img: "pattern-list", pattern: "List", task: "Shopping for groceries", why: "Shopping items become a checklist, because the goal is to buy them." },
  { img: "pattern-map", pattern: "Map", task: "Shopping for groceries", why: "Stores go on a map, because location matters." },
  { img: "pattern-canvas", pattern: "Canvas", task: "Literature review", why: "Papers go on a canvas, so you can compare them and move them into clusters." },
  {
    img: "pattern-overview",
    pattern: "Overview-detail",
    task: "Literature review",
    why: "A paper has too many attributes for one card: show the important ones, reveal the rest on demand.",
  },
];

const PatternExamples = () => {
  const [on, setOn] = useState(0);
  return (
    <figure className="ds-pattern">
      <div className="ds-pattern-tabs" role="tablist">
        {patterns.map((p, i) => (
          <button key={p.pattern} role="tab" aria-selected={on === i} className={on === i ? "is-on" : ""} onClick={() => setOn(i)}>
            {p.pattern}
          </button>
        ))}
      </div>
      <div className="ds-pattern-stage">
        {patterns.map((p, i) => (
          <img
            key={p.img}
            src={`${IMG}/${p.img}.jpg`}
            alt={`${p.task}: ${p.why}`}
            className={on === i ? "is-on" : ""}
          />
        ))}
      </div>
      <figcaption>
        <span>{patterns[on].task}.</span> {patterns[on].why}
      </figcaption>
    </figure>
  );
};

const Dissertation = () => (
  <div className="blog-with-toc ds-page">
    <TableOfContents sections={sections} />
    <div className="blog-content-wrapper">
      <Emphasis>my dissertation talk, the short version.</Emphasis>

      <Paragraph>
        On May 12, 2026, I defended my PhD in Cognitive Science at UC San
        Diego, with Haijun Xia (chair), Bill Griswold, Jim Hollan, Sorin Lerner
        and Philip Guo on my committee. Here is a much shortened version.
      </Paragraph>

      <Divider />

      <Section id="history">
        <Subtitle>How did we get here?</Subtitle>
        <Paragraph>
          My research is about graphical user interfaces for information work:
          the apps we write, edit and analyze in, where we work by directly
          manipulating what's on the screen. Lately there's a second kind of
          interface everywhere: chat, where we type an instruction and an AI
          answers almost anything. It's much faster for many problems. But a
          loop of command and response is also, in a way, where computers
          started. So, like a lot of HCI researchers right now, I keep asking:{" "}
          <Highlight>how should graphical interfaces evolve?</Highlight> To
          guess where they go next, it helps to look at how they got here.
          Scroll through.
        </Paragraph>
      </Section>
      <GuiTimeline />

      <Section id="question">
        <Subtitle>The question</Subtitle>
        <Paragraph>
          All that effort went into GUIs because their benefits are rooted in
          how we think and work. They support visual and spatial thinking with{" "}
          <strong>multiple external representations</strong>; they let us{" "}
          <strong>engage directly with our materials</strong> and think
          incrementally and reflectively; and they show a whole decision
          space, not one answer, so we can <strong>explore</strong>.
        </Paragraph>
        <Paragraph>
          But applications package those benefits into static containers, and
          attempts like activity-centered computing to organize work around
          activities instead still had to guess what an activity looks like.
          Human intentions are too dynamic for that. Chat handles dynamic
          intentions, but throws away the representations. I wanted the best of
          both, which became the question of my dissertation:{" "}
          <Highlight>
            how can interfaces move from static containers to dynamic
            representations of the task at hand?
          </Highlight>
        </Paragraph>
        <Paragraph>
          My approach is a function from a task to a UI. That splits into three
          questions: how to model the task, how to translate the task into an
          interface, and whether the result actually helps people think and
          work with AI.
        </Paragraph>
        <Quote>
          By generating and composing user interfaces from task structures,
          interfaces can support fluid work and more situated forms of
          human–AI collaboration.
        </Quote>
      </Section>

      <Divider />

      <Section id="task-structures">
        <Subtitle>Task structures</Subtitle>
        <Paragraph>
          I take a data-centric view:{" "}
          <Highlight>
            interfaces are graphic representations of an underlying data model,
            and that data model models a specific task.
          </Highlight>
        </Paragraph>
        <Figure
          src="layers"
          alt="Three layers: the task (shopping for groceries: what to buy, where to buy, how much), its data model (items with status and store, budget, suggestions), and the interface (a checklist item linked to a store on a map, and a budget field)."
          caption="Task, data model, interface."
        />
        <Paragraph>
          A <strong>task structure</strong> is the objects and relationships
          in a task that capture its goals and constraints. Shopping for
          groceries is about the items to buy, the stores to go to, and which
          item you'll buy at which store.
        </Paragraph>
        <Figure
          src="grocery"
          alt="The grocery task structure (shopping items linked to stores) and the interface it becomes: a checklist item linked to a store pin on a map."
        />
        <Paragraph>
          A literature review is about a collection of papers, the themes you
          discover in them, and which papers fall under each theme.
        </Paragraph>
        <Figure
          src="litreview"
          alt="The literature review task structure: papers linked to themes like Creativity Support and Sensemaking, and an interface grouping papers under each theme."
        />
        <Paragraph>
          The task structure anchors both sides. On the <strong>data</strong>{" "}
          side, it decides how entities and attributes are organized in a
          database. On the <strong>UI</strong> side, it informs how that data
          is visually represented, and which handles you need to manipulate it.
        </Paragraph>
      </Section>

      <Section id="patterns">
        <Subtitle>From structure to interface: patterns</Subtitle>
        <Paragraph>
          So how does a task structure become an interface? I take a
          pattern-based approach. Just as <em>A Pattern Language</em> shaped
          how people design physical spaces, digital spaces have their own
          patterns for composing interfaces. A pattern pairs a recurring
          problem with a reusable solution; here,{" "}
          <Highlight>
            the task structure is the problem, and the pattern is a reusable
            interface solution.
          </Highlight>
        </Paragraph>
        <PatternExamples />
        <Paragraph>
          A real interface needs many patterns working together. Here, a paper
          review: topics laid out as a dashboard, each topic's papers as
          overview-detail cards, and an abstraction pattern for the papers
          themselves. Used as composition rules, the same patterns build
          different interfaces for different task structures.
        </Paragraph>
        <Figure
          src="compose"
          alt="A paper review task structure (topics, topic, paper) mapped through dashboard, overview-detail and abstraction patterns, and rendered into an interface of topics with their papers."
          caption="Patterns compose into one interface."
        />
        <Paragraph>
          Over the projects, and an analysis of 55 existing systems across
          writing, music, video and more, these became a vocabulary. A
          workspace is organized through views. <strong>Within-view</strong>{" "}
          patterns describe individual units, how they're organized, and what
          you can do with them. <strong>Across-view</strong> patterns describe
          how units correspond between views, how they stay in sync, and how
          views are laid out. It isn't meant to be complete, but a starting set
          for others to build on.
        </Paragraph>
        <Figure
          src="view-patterns"
          alt="Within-view patterns (individual components, functional affordances, organization rules, external representations, content aspects) and across-view patterns (correspondence, layout, updating mechanism, synchronization)."
        />
      </Section>

      <Divider />

      <Paragraph>
        Three systems put this to work: two start from one specific task to
        work out the design, and one generalizes it.
      </Paragraph>

      <Section id="dataparticles">
        <ProjectHead
          name="DataParticles"
          venue="CHI 2023 · Best Paper"
          thumb="/images/thumbnails/dp-thumbnail.gif"
        />
        <Paragraph>
          Animated unit visualizations, where every dot is a row of data, are
          wonderful for telling data stories and painful to make. Interviews
          with six professional creators and 44 existing stories showed they
          already plan in a two-column table of <em>text ↔ visual</em>, then
          lose that pairing across a pile of tools. DataParticles keeps it as
          the task structure: a story is a list of blocks, each one a{" "}
          <code>{"{narrative, visualization}"}</code>. You write; the
          visualization is completed from your words and the blocks before it.
        </Paragraph>
        <Paragraph>
          Nine experts liked that they could stay in the story. They also told
          me ideas don't always come in a line, and that this was only one
          stage of a longer workflow, which led to the next question:{" "}
          <em>how do you support many representations of the same work?</em>
        </Paragraph>
        <Links
          links={[
            { href: "https://dl.acm.org/doi/full/10.1145/3544548.3581472", label: "Paper" },
            { href: "https://youtu.be/HXTn_OHXZZA", label: "Video" },
          ]}
        />
      </Section>

      <Section id="videorigami">
        <ProjectHead
          name="VideOrigami"
          venue="CHI 2025 · with Adobe Research"
          thumb="/images/thumbnails/videOrigami.png"
        />
        <Paragraph>
          Making a video moves back and forth between collecting assets,
          writing a narrative, planning scenes and pacing a timeline, and each
          of those usually lives in its own app. Underneath, it's just{" "}
          <strong>assets</strong> and <strong>scenes</strong>. VideOrigami gives
          that structure four views (a canvas, a script editor, a scene grid and
          a timeline), each a window onto part of the same scene objects, so
          edits stay in sync and AI fills in what you leave open.
        </Paragraph>
        <Paragraph>
          Creators could stay oriented and start anywhere, with no prescribed
          workflow, and novices said they learned how a video is put together
          from the interface itself. Experts valued the transparency, but
          warned that fast generation can make you stop thinking.
        </Paragraph>
        <Links
          links={[
            {
              href: "https://research.adobe.com/news/an-experimental-new-design-approach-for-human-ai-co-creation/",
              label: "Adobe Research blog",
            },
            { href: "https://dl.acm.org/doi/full/10.1145/3706598.3713401", label: "Paper" },
            { href: "https://youtu.be/U31u_uaBK-Y", label: "Video" },
          ]}
        />
      </Section>

      <Section id="jelly">
        <ProjectHead name="Jelly" venue="CHI 2025" thumb="/images/thumbnails/jelly.png" />
        <Paragraph>
          Jelly takes the framework off a fixed task. From any prompt, it
          generates a task-driven data model built from four kinds of values
          (single values, records, pointers and arrays), turns each into a
          spec that picks a pattern, and renders an interface you can keep
          reshaping, by asking or by editing directly, as your goal changes:
          finding an apartment, then planning a dinner party, then the
          shopping trip for it.
        </Paragraph>
        <Paragraph>
          People liked that it followed their changing needs:{" "}
          <q>so I don't have to choose which app to commit to.</q> And unlike
          chat, it gave them a way to organize the information, not just the
          content. What they missed was serendipity: things not strictly part
          of the task, but interesting to stumble on.
        </Paragraph>
        <Links
          links={[
            { to: "/project/jelly", label: "Project page" },
            { href: "https://dl.acm.org/doi/10.1145/3706598.3713285", label: "Paper" },
            { href: "https://youtu.be/4T2ZaYowubA", label: "Video" },
          ]}
        />
      </Section>

      <Divider />

      <Section id="findings">
        <Subtitle>Findings</Subtitle>
        <Paragraph>
          Across the three studies, interfaces generated from task structures
          showed two main benefits. First, they <strong>enabled fluid work</strong>:
          they reduced the coordination users had to do across tools, and
          accommodated needs that were evolving or still ambiguous. Second,
          they provided a <strong>shared context for human–AI collaboration</strong>:
          users could inspect and reorganize the structure of their own work,
          while the AI gained a structured understanding of the task's goals
          and constraints, and a transparent place to present its outputs.
        </Paragraph>
      </Section>

      <Section id="next">
        <Subtitle>Where this goes</Subtitle>
        <Paragraph>
          With models this capable, it's tempting to think the future of
          interfaces is simply <em>less</em> interface: more automation, more
          chat, more finished outputs. I think chat is, structurally, a step
          back to the command line of the 1960s, a text-only exchange that
          skips the channels we think best with. My answer to more capable AI
          is not less interface but <Highlight>smarter interface</Highlight>:
          visually rich and directly manipulable, yet generated from a real
          understanding of the task.
        </Paragraph>
        <Paragraph>
          <strong>Interfaces for better thinking.</strong> David Kirsh puts it
          simply: much of thinking happens by interacting with external
          representations, and <q>nothing comes without a cost.</q> Some costs
          are wasteful, like leaving your work to do a small data step just to
          check whether a chart makes sense. Others are where the value is:
          articulating a constraint, comparing alternatives side by side,
          revising the structure of a plan. Our industry has optimized
          relentlessly for computational cost. It's time to give cognitive
          benefit equal standing, and to learn when an interface should
          surface structure, when it should automate quietly, and when it
          should ask for deliberate attention.
        </Paragraph>
        <Paragraph>
          <strong>Software is becoming composable.</strong> MCP, the OpenAI
          Apps SDK and similar efforts are pushing apps to expose their data
          and functions as pieces an agent can call. But if those pieces only
          ever surface in a chat thread, the workspace hasn't really changed.
          What's missing is an environment, perhaps a new kind of browser,
          that pulls components from many sources and composes them into a
          workspace shaped like your task, even when no single app's developer
          anticipated the combination. Task structures are a candidate for the
          layer in between.
        </Paragraph>
        <Paragraph>
          <strong>AI-native interfaces.</strong> Today an AI either calls tools
          from a chat, which strips the interface away, or uses the computer by
          reading pixels made for human eyes. Neither works with a native
          representation of what you're doing. An interface generated from a
          task structure can be both: rendered as views and controls for
          people, and read by an agent as what exists, what's done, what's
          uncertain, and what would be a meaningful next action.
        </Paragraph>
        <Paragraph>
          <strong>A new division of labor.</strong> When interfaces are composed
          at runtime, who makes them good? Not an AI inventing whole apps from
          scratch.{" "}
          <em>Developers</em> expose reliable modules that say what objects
          they act on and what constraints they need. <em>Designers</em> turn
          their knowledge into reusable mappings from task structures to
          interface forms, and treat visual style as a composable resource too.{" "}
          <em>Researchers</em> work out when an interface should change, when
          it should stay still, and how people keep their bearings when it
          does. And <em>end users</em> don't have to become interface
          designers: they shape the task (what matters, what to compare, what
          to track), and the interface follows.
        </Paragraph>
        <Paragraph>
          This doesn't end in fully automated work. Complex work is valuable
          because it takes human judgment, interpretation and revision. The
          interface's job is to
        </Paragraph>
        <p className="ds-closing">
          speed up what is wasteful,
          <br />
          and slow down where reflection matters.
        </p>
      </Section>

      <Divider />

      <Section id="related-work">
        <Subtitle>Related work</Subtitle>
        <Paragraph>
          This work builds on five bodies of research, from studies of how
          people do complex information work to generative interfaces and
          design patterns. Click a body of work to zoom in, and hover over a
          paper to read a short note about it; click the paper to keep the
          note open. The timeline shows the same papers by year.
        </Paragraph>
      </Section>
      <RelatedWorkMap />
    </div>
  </div>
);

export default Dissertation;
