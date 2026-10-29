// The related work of the dissertation (Chapter 2), as a catalogue: five bodies
// of work, each split into strands, each strand a handful of works. `gap` is
// where that body of work stops short of task structures (from the chapter's
// summary); `short` is the title for narrow screens; `note` is what each
// work contributes, in a line.

const relatedWork = [
  {
    id: "activity",
    title: "Human information activity",
    short: "Information activity",
    gap: "Complex work has real structure, but it's invisible to today's interfaces.",
    strands: [
      {
        title: "Ill-structured, reflective work",
        works: [
          { name: "The Structure of Ill Structured Problems", by: "Simon", year: 1973, note: "Some problem spaces can only be built while solving them." },
          { name: "The Reflective Practitioner", by: "Schön", year: 1983, note: "Skilled work as a conversation with the materials of the situation." },
          { name: "Plans and Situated Actions", by: "Suchman", year: 1987, note: "Plans are resources for action, not scripts that determine it." },
          { name: "Prototyping Tools and Techniques", by: "Beaudouin-Lafon & Mackay", year: 2007, note: "Prototypes are where intent gets formed, not transcribed." },
          { name: "Sketching User Experiences", by: "Buxton", year: 2007, note: "Sketches are the medium of design thinking." },
        ],
      },
      {
        title: "Sensemaking & information seeking",
        works: [
          { name: "Berrypicking", by: "Bates", year: 1989, note: "Every item found shifts the query; needs evolve as you search." },
          { name: "The Cost Structure of Sensemaking", by: "Russell et al.", year: 1993, note: "Most of the cost of sensemaking is restructuring representations." },
          { name: "The Sensemaking Process", by: "Pirolli & Card", year: 2005, note: "Foraging alternates with structuring evidence into schemas." },
        ],
      },
      {
        title: "Distributed cognition & activity theory",
        works: [
          { name: "Learning by Expanding", by: "Engeström", year: 1987, note: "Activities transform through the contradictions met in the work." },
          { name: "The Marks Are on the Knowledge Worker", by: "Kidd", year: 1994, note: "Piles, drafts and notes are the medium of thinking, not records of it." },
          { name: "Cognition in the Wild", by: "Hutchins", year: 1995, note: "Cognition is spread across people, artifacts and representations." },
          { name: "Context and Consciousness", by: "Nardi (ed.)", year: 1996, note: "Activity theory for HCI: activities, actions, operations." },
          { name: "Information Ecologies", by: "Nardi & O'Day", year: 1999, note: "Structure woven through people, tools and shared artifacts." },
          { name: "Distributed Cognition for HCI", by: "Hollan, Hutchins & Kirsh", year: 2000, note: "A new foundation for HCI research, grounded in distributed cognition." },
        ],
      },
      {
        title: "Information work, observed",
        works: [
          { name: "A Cognitive Process Theory of Writing", by: "Flower & Hayes", year: 1981, note: "Writing is recursive: planning, translating and revising interleave." },
          { name: "Constant, Constant, Multi-tasking Craziness", by: "González & Mark", year: 2004, note: "Work is organized in many interleaved working spheres." },
          { name: "No Task Left Behind?", by: "Mark et al.", year: 2005, note: "About 12 minutes on a task before switching; 3 uninterrupted." },
          { name: "On the Need for Attention-Aware Systems", by: "Bailey & Konstan", year: 2006, note: "Interruptions cost time, errors and stress." },
          { name: "Personal Information Management", by: "Whittaker", year: 2011, note: "From consuming information to curating it." },
          { name: "More Than Telling a Story", by: "Lee et al.", year: 2015, note: "Data storytelling loops between insight, narrative and communication." },
          { name: "Communicating with Interactive Articles", by: "Hohman et al.", year: 2020, note: "Iteration in authoring data-driven articles." },
          { name: "How Do Data Science Workers Collaborate?", by: "Zhang et al.", year: 2020, note: "The structure of an analysis emerges through coordinating tools." },
          { name: "Towards a Dynamic Multiscale Personal Information Space", by: "Fox et al.", year: 2020, note: "Beyond application- and document-centered views." },
          { name: "VizFlow", by: "Sultanum et al.", year: 2021, note: "Iterative deepening between data, structure and story." },
          { name: "Tabs.do", by: "Chang et al.", year: 2021, note: "Task-centric browser tab management." },
          { name: "When the Tab Comes Due", by: "Chang et al.", year: 2021, note: "Tabs stand in for activities, at real cognitive cost." },
        ],
      },
    ],
  },
  {
    id: "acc",
    title: "Activity-centered computing",
    short: "Activity-centered",
    gap: "Activity is treated as a container, not as a structure.",
    strands: [
      {
        title: "Critiques of the desktop",
        works: [
          { name: "The Anti-Mac Interface", by: "Gentner & Nielsen", year: 1996, note: "The office metaphor becomes a constraint as work grows richer." },
          { name: "Beyond the Desktop Metaphor", by: "Kaptelinin & Czerwinski", year: 2007, note: "Two decades of critique: activities stay computationally invisible." },
        ],
      },
      {
        title: "Activity-based computing",
        works: [
          { name: "Activity-Based Computing", by: "Bardram", year: 2005, note: "Activities as first-class objects that bundle resources and state." },
          { name: "Human-Centered Design Considered Harmful", by: "Norman", year: 2005, note: "Design around activities, not single tools." },
          { name: "When Second Wave HCI Meets Third Wave Challenges", by: "Bødker", year: 2006, note: "Interaction understood at the level of activity." },
          { name: "Giornata", by: "Voida, Mynatt & Edwards", year: 2008, note: "The desktop reframed as a set of activity workspaces." },
          { name: "It Feels Better Than Filing", by: "Voida & Mynatt", year: 2009, note: "A field study of living with activity-based organization." },
        ],
      },
      {
        title: "Workspaces around tasks",
        works: [
          { name: "Rooms", by: "Henderson & Card", year: 1986, note: "Task-specific virtual workspaces instead of one flat desktop." },
          { name: "GroupBar", by: "Smith et al.", year: 2003, note: "Group taskbar windows by task, switch them as units." },
          { name: "Scalable Fabric", by: "Robertson et al.", year: 2004, note: "Set task groups aside in the periphery without closing them." },
          { name: "Code Bubbles", by: "Bragdon et al.", year: 2010, note: "An IDE of task-relevant working sets, not files." },
        ],
      },
      {
        title: "Activity-aware information",
        works: [
          { name: "Lifestreams", by: "Freeman & Gelernter", year: 1996, note: "A time-ordered stream of documents instead of folders." },
          { name: "Haystack", by: "Adar, Karger & Stein", year: 1999, note: "A personal data model across application boundaries." },
          { name: "Time-Machine Computing", by: "Rekimoto", year: 1999, note: "Navigate the whole desktop as it was at any moment." },
          { name: "Stuff I've Seen", by: "Dumais et al.", year: 2003, note: "One index over everything you've encountered." },
          { name: "UMEA", by: "Kaptelinin", year: 2003, note: "Interaction histories turned into project contexts." },
          { name: "TaskTracer", by: "Dragunov et al.", year: 2005, note: "Learns which files and apps belong to the current task." },
          { name: "Documents at Hand", by: "Bondarenko & Janssen", year: 2005, note: "People work in projects; tools scatter them across silos." },
        ],
      },
      {
        title: "Cross-application surfaces",
        works: [
          { name: "Webstrates", by: "Klokmose et al.", year: 2015, note: "Shareable, programmable dynamic media." },
          { name: "Dynamicland", by: "Victor", year: 2020, note: "A shared, physical computational substrate." },
          { name: "SurfaceFleet", by: "Brudy et al.", year: 2020, note: "Applets that travel across devices, apps, people and time." },
        ],
      },
    ],
  },
  {
    id: "dynamic",
    title: "Dynamic information spaces",
    short: "Dynamic interfaces",
    gap: "Each strand fixes one layer: the data model, the rules, the policy, or the code.",
    strands: [
      {
        title: "Malleable software & end-user programming",
        works: [
          { name: "Smalltalk", by: "Kay", year: 1972, note: "A dynamic, personal medium you can reach into." },
          { name: "HyperCard", by: "Atkinson", year: 1987, note: "Link objects in a GUI, script them when you need more." },
          { name: "A Small Matter of Programming", by: "Nardi", year: 1993, note: "Perspectives on end-user computing." },
          { name: "OpenDoc", by: "Apple", year: 1995, note: "Compound documents assembled from parts." },
          { name: "Transclusion", by: "Nelson", year: 1995, note: "Hypermedia unified by including content by reference." },
          { name: "C3W", by: "Fujima et al.", year: 2004, note: "Clip, connect and clone pieces of the web." },
          { name: "Vegemite", by: "Lin et al.", year: 2009, note: "End-user programming of mashups by demonstration." },
          { name: "Scratch", by: "Resnick et al.", year: 2009, note: "Visual programming for everyone." },
          { name: "Prefab", by: "Dixon & Fogarty", year: 2010, note: "Reverse-engineer interface structure from pixels." },
          { name: "Fusion", by: "Zhang & Guo", year: 2018, note: "Opportunistic web prototyping with UI mashups." },
          { name: "PUMICE", by: "Li et al.", year: 2019, note: "Teach an agent concepts from language and demonstration." },
          { name: "Wildcard", by: "Litt & Jackson", year: 2020, note: "Customize web apps through a spreadsheet of their data." },
          { name: "Screen Recognition", by: "Zhang et al.", year: 2021, note: "Recover UI structure from screenshots with ML." },
          { name: "Embark", by: "Sonnentag, Obenauer & Litt", year: 2023, note: "Dynamic documents as personal software." },
        ],
      },
      {
        title: "Model-based user interfaces",
        works: [
          { name: "MIKE", by: "Olsen", year: 1986, note: "Menus and dialogs generated from function signatures." },
          { name: "ITS", by: "Wiecha et al.", year: 1990, note: "Rapid application development from interface specifications." },
          { name: "UIDE", by: "Foley et al.", year: 1991, note: "Dialog boxes generated by assigning data types to widgets." },
          { name: "User Interface Management Systems", by: "Olsen", year: 1992, note: "Decouple application functionality from the UI." },
          { name: "HUMANOID", by: "Szekely, Luo & Neches", year: 1992, note: "Explore design alternatives through reusable templates." },
          { name: "BOSS", by: "Schreiber", year: 1994, note: "Specification and generation of user interfaces." },
          { name: "MASTERMIND", by: "Szekely et al.", year: 1995, note: "Declarative interface models for construction tools." },
          { name: "TRIDENT", by: "Vanderdonckt", year: 1995, note: "Automated generation, balanced with manual refinement." },
          { name: "TIMM", by: "Puerta & Eisenstein", year: 1998, note: "Manage abstract-to-concrete mappings explicitly." },
          { name: "Personal Universal Controller", by: "Nichols et al.", year: 2002, note: "Appliance interfaces generated from specifications." },
          { name: "Bespoke", by: "Vaithilingam & Guo", year: 2019, note: "GUIs for command-line tools, by demonstration." },
          { name: "DynaVis", by: "Vaithilingam et al.", year: 2024, note: "Widgets synthesized from language for editing charts." },
        ],
      },
      {
        title: "Context-based adaptation",
        works: [
          { name: "Towards a Better Understanding of Context", by: "Abowd et al.", year: 1999, note: "What context and context-awareness mean." },
          { name: "The Context Toolkit", by: "Dey, Abowd & Salber", year: 2001, note: "Prototyping context-aware applications." },
          { name: "SUPPLE", by: "Gajos & Weld", year: 2004, note: "Interfaces generated as optimization over device constraints." },
          { name: "UNIFORM", by: "Nichols, Myers & Rothrock", year: 2006, note: "Consistent remote controls from interaction history." },
          { name: "Huddle", by: "Nichols et al.", year: 2006, note: "Interfaces for systems of connected appliances." },
          { name: "SUPPLE++", by: "Gajos, Wobbrock & Weld", year: 2007, note: "Adapted to users' motor and vision abilities." },
          { name: "Ability-Based Design", by: "Wobbrock et al.", year: 2011, note: "Design around what people can do." },
          { name: "Context-Aware Online Adaptation of MR Interfaces", by: "Lindlbauer et al.", year: 2019, note: "How much to show, and where, as the situation changes." },
        ],
      },
      {
        title: "Generative interfaces with LLMs",
        works: [
          { name: "What Is It Like to Program with AI?", by: "Sarkar et al.", year: 2022, note: "Programming changes when an AI writes the code." },
          { name: "Why Johnny Can't Prompt", by: "Zamfirescu-Pereira et al.", year: 2023, note: "Non-experts struggle to steer LLMs through prompts." },
          { name: "v0", by: "Vercel", year: 2023, note: "UI code generated from a prompt." },
          { name: "Claude", by: "Anthropic", year: 2024, note: "Renders generated UI code in conversation." },
          { name: "UICoder", by: "Wu et al.", year: 2024, note: "Fine-tuning LLMs on automated feedback for UI code." },
        ],
      },
    ],
  },
  {
    id: "hai",
    title: "Human-AI collaborative workspaces",
    short: "Human-AI workspaces",
    gap: "Structure helps control, but there's no shared substrate for the workspace itself.",
    strands: [
      {
        title: "Frameworks for working with AI",
        works: [
          { name: "Man-Computer Symbiosis", by: "Licklider", year: 1960, note: "Humans set goals and judge; machines do the routine." },
          { name: "Principles of Mixed-Initiative Interfaces", by: "Horvitz", year: 1999, note: "When an agent should act, ask, or stay out of the way." },
          { name: "Guidelines for Human-AI Interaction", by: "Amershi et al.", year: 2019, note: "Eighteen guidelines, from context to learning from users." },
          { name: "AI Alignment in the Design of Interactive AI", by: "Terry et al.", year: 2023, note: "The process gulf between intent and model behavior." },
          { name: "Bridging the Gulf of Envisioning", by: "Subramonyam et al.", year: 2024, note: "Hard to imagine what to ask an LLM for." },
        ],
      },
      {
        title: "AI as an assistant",
        works: [
          { name: "Knowledge Navigator", by: "Apple", year: 1987, note: "A humanized agent you talk to." },
          { name: "Clippy", by: "Microsoft", year: 1997, note: "A proactive character inside Office." },
          { name: "Siri", by: "Apple", year: 2011, note: "Voice requests on the phone." },
          { name: "ChatGPT", by: "OpenAI", year: 2022, note: "Ask anything, in a chat thread." },
        ],
      },
      {
        title: "Automation inside direct manipulation",
        works: [
          { name: "Direct Manipulation Interfaces", by: "Hutchins, Hollan & Norman", year: 1985, note: "The feeling of acting on the objects themselves." },
          { name: "Direct Manipulation vs. Interface Agents", by: "Shneiderman & Maes", year: 1997, note: "Keep users' sense of control and responsibility." },
          { name: "Wrangler", by: "Kandel et al.", year: 2011, note: "Infers transformation scripts from direct interaction." },
          { name: "Using Hierarchical Data in Spreadsheets", by: "Chang & Myers", year: 2016, note: "Structure inferred while people work in a familiar tool." },
          { name: "Agency Plus Automation", by: "Heer", year: 2019, note: "Design AI into interactive systems, not around them." },
          { name: "CrossData", by: "Chen & Xia", year: 2022, note: "Text-data links for authoring data documents." },
          { name: "CrossTalk", by: "Xia et al.", year: 2023, note: "Intelligent substrates for language-oriented interaction." },
          { name: "Semantic Commit", by: "Vaithilingam et al.", year: 2025, note: "Helping users update intent specifications for AI memory." },
        ],
      },
      {
        title: "Structure in generation",
        works: [
          { name: "Design Guidelines for Prompt Engineering", by: "Liu & Chilton", year: 2022, note: "How to phrase prompts for text-to-image models." },
          { name: "AI Chains", by: "Wu, Terry & Cai", year: 2022, note: "Break a task into chained steps you can revise." },
          { name: "Chain-of-Thought Prompting", by: "Wei et al.", year: 2022, note: "Stepwise reasoning improves generation." },
          { name: "ControlNet", by: "Zhang, Rao & Agrawala", year: 2023, note: "Poses and shapes as controls beyond the prompt." },
          { name: "GLIGEN", by: "Li et al.", year: 2023, note: "Grounded, layout-aware image generation." },
          { name: "Tree of Thoughts", by: "Yao et al.", year: 2023, note: "Deliberate search over reasoning paths." },
          { name: "Promptify", by: "Brade et al.", year: 2023, note: "Explore prompts for image generation interactively." },
          { name: "PromptPaint", by: "Chung & Adar", year: 2023, note: "Steer image generation like mixing paint." },
          { name: "Cells, Generators, and Lenses", by: "Kim et al.", year: 2023, note: "Object-oriented interaction with LLMs." },
          { name: "EvalLM", by: "Kim et al.", year: 2023, note: "Evaluate prompts against your own criteria." },
          { name: "XCreation", by: "Yan et al.", year: 2023, note: "An entity-relation graph for cross-modal storybooks." },
          { name: "Graphologue", by: "Jiang et al.", year: 2023, note: "LLM responses as interactive diagrams." },
          { name: "Sensecape", by: "Suh et al.", year: 2023, note: "Multilevel exploration and sensemaking with LLMs." },
          { name: "Luminate", by: "Suh et al.", year: 2024, note: "Generate and explore a structured design space." },
          { name: "Collage Is the New Writing", by: "Buschek", year: 2024, note: "AI writing tools as collages of fragmented views." },
        ],
      },
    ],
  },
  {
    id: "patterns",
    title: "Design patterns",
    short: "Design patterns",
    gap: "Patterns are references for human designers, not rules a system can run.",
    strands: [
      {
        title: "Pattern languages",
        works: [
          { name: "A Pattern Language", by: "Alexander", year: 1977, note: "Recurring problems paired with adaptable solutions." },
          { name: "Model-View-Controller", by: "Krasner & Pope", year: 1988, note: "Separate data, presentation and control." },
          { name: "Human Interface Guidelines", by: "Apple", year: 2021, note: "Platform-wide design conventions." },
        ],
      },
      {
        title: "UI design patterns",
        works: [
          { name: "A Pattern Language for HCI Design", by: "Tidwell", year: 1997, note: "Interface design as a pattern language." },
          { name: "Dashboard Design Patterns", by: "Bach et al.", year: 2022, note: "Page-layout, screen-space and structure patterns." },
          { name: "UI Patterns", by: "Toxboe", year: 2024, note: "A living collection of interface patterns." },
          { name: "User Interface Design Patterns", by: "Laakso", year: 2024, note: "Patterns for common interaction problems." },
        ],
      },
      {
        title: "Compositional structures",
        works: [
          { name: "Video Mosaic", by: "Mackay & Pagani", year: 1994, note: "Lay out time in a physical space." },
          { name: "Constructing Table-of-Content for Videos", by: "Rui, Huang & Mehrotra", year: 1999, note: "Structure that makes video navigable." },
          { name: "Screenplay", by: "Field", year: 2005, note: "The three-act structure for film." },
          { name: "Exploded View Diagrams", by: "Li et al.", year: 2008, note: "Show how parts compose, to assemble and repair." },
          { name: "Interactive Paper Substrates for Music", by: "Garcia et al.", year: 2012, note: "Structures for composing music." },
          { name: "Reverse Outlining", by: "King", year: 2012, note: "Revise a document's structure from its outline." },
          { name: "Video Digests", by: "Pavel et al.", year: 2014, note: "Skimmable chapters for lecture videos." },
          { name: "SceneSkim", by: "Pavel et al.", year: 2015, note: "Browse movies through captions, scripts and plots." },
        ],
      },
      {
        title: "Structures for co-creation",
        works: [
          { name: "Beyond Text Generation", by: "Dang et al.", year: 2022, note: "Continuous summaries that show writers their structure." },
          { name: "Metaphorian", by: "Kim et al.", year: 2023, note: "Extended metaphors through congruent concept structure." },
          { name: "VISAR", by: "Zhang et al.", year: 2023, note: "Argumentative writing with visual programming." },
        ],
      },
    ],
  },
];

export default relatedWork;
