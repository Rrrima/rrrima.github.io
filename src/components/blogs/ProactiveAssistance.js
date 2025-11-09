import React, { useState, useEffect } from "react";
import {
  Section,
  Subtitle,
  Paragraph,
  Emphasis,
  Highlight,
  Wiggle,
  TalkingBubble,
  Quote,
  List,
  ListItem,
  BlockImage,
  Divider,
  MarginNote,
  InlineQuote,
} from "./BlogComponents";

const sections = [
  { id: "tiny-thing", title: "The tiny thing I wish I had" },
  {
    id: "global-preferences",
    title: "Global preferences that never get global",
  },
  { id: "future-selves", title: "We're Bad at Helping Our Future Selves" },
  { id: "when-help", title: "When People Need Proactive Help" },
  { id: "why-proactive", title: "But still, Why Proactive?" },
  {
    id: "actually-helpful",
    title: "What Makes Proactive Help Actually Helpful",
  },
  { id: "end-notes", title: "End Notes" },
];

const ProactiveAssistance = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're near the bottom of the page (within 200px)
      const isNearBottom =
        windowHeight + window.scrollY >= documentHeight - 200;

      // If near bottom, highlight the last section
      if (isNearBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let foundSection = false;

      // Check from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;

          // Check if we're in this section or past it
          if (scrollPosition >= sectionTop - 100) {
            setActiveSection(sections[i].id);
            foundSection = true;
            break;
          }
        }
      }

      // If we're before the first section, clear active state
      if (!foundSection) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="blog-with-toc">
      <nav className="blog-toc">
        <div className="toc-content">
          <h3 className="toc-title">Contents</h3>
          <ul className="toc-list">
            {sections.map((section) => (
              <li
                key={section.id}
                className={activeSection === section.id ? "active" : ""}
              >
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="blog-content-wrapper">
        <Emphasis>why i want a tiny gremlin living in my computer.</Emphasis>

        <Divider />

        <Paragraph>
          A typical morning ritual: I finish breakfast, open my Mac, stare at a
          graveyard of tabs, papers, half-written drafts, Slack messages, and
          grading spreadsheets — feel like doing everything and nothing at the
          same time.
        </Paragraph>

        <Paragraph>
          I know I have
          <List type="bullet">
            <ListItem>a draft to write</ListItem>
            <ListItem>code to test</ListItem>
            <ListItem>related work to read</ListItem>
            <ListItem>
              TA gradings that have aged into historical artifacts 🗿
            </ListItem>
            <ListItem>...</ListItem>
          </List>
        </Paragraph>

        <Paragraph>
          But I don't keep a real todo list. All of the 42 things just… float in
          my head.
        </Paragraph>

        <Paragraph>
          Sometimes, I'll dump it all into a Notion page or an Apple Note. But
          the things that make it onto that list are always the{" "}
          <Wiggle>time-blockable</Wiggle> ones — stuff that feels concrete
          enough to schedule, like "grade assignments" or "submit draft." The
          others — like "read that paper that might reframe my argument" or "fix
          the intro" — are the dangerous kind. They takes up the minial space on
          the my todo list but can quietly eat an entire afternoon.
        </Paragraph>
        <Paragraph>
          I know if I write them down, they'll sit there mocking me when I
          inevitably don't finish them. So I don't.
        </Paragraph>

        <Paragraph>
          But even when I do check things off, it's oddly unsatisfying. The list{" "}
          <Highlight>
            never captures where my time actually went, or what progress
            actually felt like
          </Highlight>
          .
        </Paragraph>

        <Paragraph>So instead: no list.</Paragraph>
        <Paragraph>Also instead: not working.</Paragraph>

        <Paragraph>
          Like this morning, my brain decided its in a kinda productive mode so
          grading would be a waste of energy 🤗.{" "}
        </Paragraph>

        <Paragraph>
          So I spent 20 minutes scrolling shopping apps buffering.
        </Paragraph>

        <Divider />
        <Section id="tiny-thing">
          <Subtitle>The tiny thing I wish I had</Subtitle>

          <Paragraph>
            I keep wishing I had a little creature on my desktop. Something I
            can squish, and it bubble out something like:
          </Paragraph>

          {/* <TalkingBubble>
          "Hey, grade 5 A3 assignments (30 min based on last time)"
        </TalkingBubble> */}
          <BlockImage
            src="/images/tiny-gremlin-bubble.png"
            alt="tiny gremlin bubble"
            caption="generated by GPT-5"
            width="30%"
          />

          <Paragraph>
            Not a whole productivity system. Not a life plan.{" "}
            <Highlight>
              Just one plausible move, with a believable time estimate
            </Highlight>
            —ideally using how long I took before on similar tasks (e.g.,
            "grading one assignment typically takes you 6–8 minutes, here's one
            now").
          </Paragraph>

          <Paragraph>
            It's never true that I have nothing to do --{" "}
            <Wiggle>The todos exists</Wiggle> , they're just hiding in:
            <List type="bullet">
              <ListItem>emails: that form due by 11/15</ListItem>
              <ListItem>Slack messages: someone needs those materials</ListItem>
              <ListItem>
                texts: your friend is still waiting for a reply
              </ListItem>
              <ListItem>
                canvas: those students have been waiting two weeks, hi 👋
              </ListItem>
            </List>
          </Paragraph>

          <Paragraph>The real problem is:</Paragraph>

          <List type="dash">
            <ListItem>
              surfacing them feels like more work than doing them;
            </ListItem>
            <ListItem>
              and once I go to the effort to list them, I feel like I've already
              failed by not just doing them
            </ListItem>
          </List>

          <Paragraph>
            If something could lightly surface one good option, at the right
            moment, I'd take it.
          </Paragraph>
        </Section>

        <Divider />

        <Section id="global-preferences">
          <Subtitle>Global preferences that never get global </Subtitle>

          <Paragraph>
            Today I opened yet another new note-taking app on my iPad{" "}
            <MarginNote>
              There is just no "perfect notes app" because notes should not be
              confined to an app in the first place, same as todos, but that's
              another rant.
            </MarginNote>
            . The default color palette is… not inviting. Did I go back to my
            old app, copy over my carefully curated palette , retype every hex
            code? Absolutely not. I eyeballed something "good enough" and moved
            on, mildly annoyed, like always.
          </Paragraph>

          <Paragraph>
            We already accept <Wiggle>password managers</Wiggle> as a global
            layer because everyone clearly needs passwords across many things.
            But there are other personal globals that are{" "}
            <Highlight>
              deeply individual, incredibly useful, but currently trapped
            </Highlight>
          </Paragraph>
          <Paragraph>
            For me, my color palette, my usual serif/sans-serif/script fonts,
            the under-saturated 'feel' of my workspace.
          </Paragraph>
          <Paragraph>
            For someone else, may be their preferred file naming structure,
            default export formats, recurring snippets.
          </Paragraph>
          <Paragraph>
            None of these are "universal enough" for Apple or Chrome to bake in
            as system-level features. But they are stable, expressive signals
            about who we are and how we like things to look and work.
          </Paragraph>

          <Paragraph>
            A proactive assistant that quietly learns and gives a hand when i
            was struggling with the color wheel, would save me micro-annoyances
            and make my tools feel more like mine.
          </Paragraph>

          {/* <TalkingBubble>
          "Here you go, the colors we had in your last figma file: … "
        </TalkingBubble> */}
          <BlockImage
            src="/images/gremlin-color.png"
            alt="gremlin color"
            caption="generated by GPT-5"
            width="30%"
          />
        </Section>

        <Divider />

        <Section id="future-selves">
          <Subtitle>We're Bad at Helping Our Future Selves</Subtitle>

          <Paragraph>
            All these cases share one truth:{" "}
            <Highlight>
              humans (like me) aren't good at making future life easier.
            </Highlight>
          </Paragraph>
          <Paragraph>
            For example, I could attach all relevant docs and links to every
            recurring calendar meetings. But:
          </Paragraph>

          <List type="dash">
            <ListItem>
              if notes are easy to find, I don't feel the need, i can just find
              it 1min before meeting!
            </ListItem>
            <ListItem>
              if notes are hard to find, that means they're NOT important enough
              to ceremonially link.
            </ListItem>
            <ListItem>Result: I link nothing.</ListItem>
          </List>

          <Paragraph>
            My friend has a "which credit card should I use?" DM thread with
            GPT. Whenever she makes a big purchase, she goes to that chat, which
            she's already pinned, re-asks the question, re-enters context.
            That's the best she can do with the tools she has. It definitely
            feels unnecessary to pin this chat on the desktop.
          </Paragraph>

          <Paragraph>
            Many tasks are highly situated. Our brains don't think they'll be
            persistent enough to justify organizing. Or we just have no good way
            to do it without proactive help. We definitely lack a system that
            says:
          </Paragraph>

          <TalkingBubble>
            "I've seen what you've done before. Here's what you probably need
            now."
          </TalkingBubble>

          <Paragraph>
            There lacks a <Wiggle>low-friction</Wiggle> way to turn{" "}
            <Wiggle>lived history</Wiggle> into usable{" "}
            <Wiggle>future context</Wiggle>.
          </Paragraph>
        </Section>

        <Section id="when-help">
          <Subtitle>When People Need Proactive Help</Subtitle>

          <Paragraph>
            Proactive assistance matters when we can't move as fast as we'd
            like.
          </Paragraph>
          <Paragraph>This often happens in three scenarios: </Paragraph>
          <Paragraph>
            <strong> We're Stuck</strong>: the perceived cost is too high for
            the benefit, someone needs to give you a shortcut (e.g., my color
            picker problem).
          </Paragraph>

          <Paragraph>
            <strong> We Have Too Many Choices</strong>: you need more
            information to decide (e.g., my morning paralysis—which task
            first?).
          </Paragraph>
          <Paragraph>
            <strong> We Don't Realize we Need Help</strong>: this can be:
            <List type="bullet">
              <ListItem>
                a reminder (the "fill this form or get a hold" email hiding
                somewhere in my inbox—which, yes, put me in trouble)
              </ListItem>
              <ListItem>
                a recommendation (those meeting materials I could technically
                find, but wow, it would be nice if they just appeared).
              </ListItem>
            </List>
          </Paragraph>
        </Section>

        <Section id="why-proactive">
          <Subtitle>But still, Why Proactive?</Subtitle>

          <Paragraph>
            … but can't a chatbot do that? In theory, yes — but in practice, no.
          </Paragraph>
          <Paragraph>
            Because to even ask for help, I'd need to know{" "}
            <Wiggle>what I'm missing</Wiggle>, and have{" "}
            <Wiggle>the right words for it</Wiggle>.{" "}
          </Paragraph>
          <Paragraph>
            In the situations I had above (and many in my life), I often don't
            know what I need until I see it.
          </Paragraph>

          <Paragraph>
            <Highlight>
              Most of what would make proactive help actually helpful lives
              across a long time horizon
            </Highlight>{" "}
            — in scattered traces, invisible habits, and contextual clues that
            no single app or model currently holds together.
          </Paragraph>

          <Paragraph>
            That's why our systems still can't handle queries like:{" "}
            <InlineQuote>
              Show me the link my labmate shared on PBD during our group meeting
            </InlineQuote>{" "}
            or{" "}
            <InlineQuote>
              Something I found about someone established in [field] when I read
              Gingold's thesis.
            </InlineQuote>{" "}
            <MarginNote>
              Real case, again: when writing about my gaming project, I want to
              quote someone famous who said something like "everyone knows how
              to play." I remember reading it the afternoon I read Gingold's
              Play Design thesis. I asked my labmate Dev about it, so I search
              Slack for that message, get the date, check my Chrome history for
              that day… Too many tabs. I give up. Still a mystery who said what.
              I literally remember no identifiable words to search for it.
            </MarginNote>
          </Paragraph>

          <Paragraph>
            There's a lovely old line from Time Machine Computing (1999):
          </Paragraph>

          <Quote>
            "There are various ways to specify time. The simplest one is to
            directly say 'go to January 1, 1999' … but it is also possible to
            say 'go to when this file was created,' 'go to when I received this
            e-mail,' or 'go to when I attached a PostIt note that contains the
            string project ABC.'"
          </Quote>

          <Paragraph>
            It's a deeply human way of remembering{" "}
            <Wiggle>by situation, not by keyword</Wiggle>— and our tools don't.
          </Paragraph>
          <Paragraph>This is still a problem today.</Paragraph>
        </Section>

        <Section id="actually-helpful">
          <Subtitle>What Makes Proactive Help Actually Helpful</Subtitle>
          <Paragraph>
            It's really hard to get proactive help right.. and failed by many
            past attempts. For proactive assistance to work, it should kick in
            when people have no easy way or no incentive to ask for help
            themselves. This means:
          </Paragraph>
          <Paragraph>
            <strong>Immediate, local benefit</strong>
          </Paragraph>
          <List type="dash">
            <ListItem>
              It should help in the exact moment I'm stuck or choosing.
            </ListItem>
            <ListItem>
              It should not require me to stop and talk to a system to get the
              benefit.
            </ListItem>
          </List>
          <Paragraph>
            <strong>Deeply situated understanding</strong>
          </Paragraph>
          <List type="dash">
            <ListItem>
              It needs to know my patterns, preferences, habits.
            </ListItem>
            <ListItem>
              It needs to see my artifacts (files, tabs, chats, calendar) as one
              connected landscape.
            </ListItem>
            <ListItem>
              It should be able to say: "Given all this, right now this seems
              useful."
            </ListItem>
          </List>
          <Paragraph>
            <strong>Respectful narrowness</strong>
          </Paragraph>
          <List type="dash">
            <ListItem>
              It shouldn't solve "life", it should solve specific,
              high-leverage, recurring frictions.
            </ListItem>
            <ListItem>
              like suggesting one task to start the day; surfacing SPECIFIC
              materials for THIS meeting; remembering my visual language etc;
              offering shortcuts right when I start repeating myself etc.
            </ListItem>
          </List>
          <Paragraph>And these requires:</Paragraph>
          <Paragraph>
            <strong>A robust material graph:</strong>{" "}
          </Paragraph>
          <Paragraph>
            All the stuff I touch, how it relates, how often, in what contexts.
          </Paragraph>
          <Paragraph>
            <strong>A clever runtime brain:</strong>{" "}
          </Paragraph>
          <Paragraph>
            Something like self-adapting RAG that can say, "Given this moment,
            here's what from that graph matters."
          </Paragraph>
          <Paragraph>
            {" "}
            <strong>Carefully chosen use-cases:</strong>{" "}
          </Paragraph>
          <Paragraph>
            As the types of tasks mentioned above, where people won't
            self-organize, can't easily search, and maybe don't even know what
            to ask.{" "}
          </Paragraph>
        </Section>

        <Divider />

        <Section id="end-notes" marginTop={false}>
          <Subtitle>End Notes.</Subtitle>

          <Paragraph>
            Proactive assistance should feel less like a dashboard yelling at
            you, and more like a tiny, well-informed gremlin that
            <List>
              <ListItem>knows my taste,</ListItem>
              <ListItem> remembers my trail, and</ListItem>
              <ListItem>
                taps my shoulder only when it can make the next step
              </ListItem>
            </List>
          </Paragraph>
          <Paragraph>
            We don't just need "an AI"{" "}
            <Wiggle>stuck on top of existing mess</Wiggle>.{" "}
          </Paragraph>
          <Paragraph>
            But also, the tiny help that we didn't know to ask for—but needed
            anyway.
          </Paragraph>
        </Section>
      </div>
    </div>
  );
};

export default ProactiveAssistance;
