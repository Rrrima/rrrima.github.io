// Blog metadata - each blog references its own component file
const blogData = [
  {
    // A paper's project page: linked from its entry in Selected Publications
    // (paperData.js), not listed under Before I Forgot.
    id: "jelly",
    section: "project",
    listed: false,
    title: "Jelly",
    date: "CHI 2025",
    excerpt: "generative and malleable user interfaces, built on a task-driven data model.",
    thumbnail: null,
    component: "Jelly", // References blogs/Jelly.js
  },
  {
    id: "dissertation",
    title: "Generative and Composable User Interfaces via Task Structures",
    date: "October 28, 2026",
    excerpt: "my dissertation talk, the short version: from the history of GUIs to interfaces generated from task structures.",
    thumbnail: null,
    component: "Dissertation", // References blogs/Dissertation.js
  },
  {
    id: "chatlet",
    title: "Chatlet",
    date: "October 21, 2026",
    excerpt: "an interface that starts from the group chat, and keeps evolving with it.",
    thumbnail: null,
    component: "Chatlet", // References blogs/Chatlet.js
  },
  {
    id: "explorables",
    title: "Explorables",
    date: "October 20, 2026",
    excerpt: "a fun exploration of how i can get my hundred whys answered, with scrolly articles and explainer videos.",
    thumbnail: null,
    component: "Explorables", // References blogs/Explorables.js
  },
  {
    id: "proactive-assistance",
    title: "Something about proactive assistance",
    date: "November 9, 2025",
    excerpt: "thoughts on why i want a tiny fairy living in my computer...",
    thumbnail: null, // optional: "/images/blog/proactive-assistance-thumbnail.png"
    component: "ProactiveAssistance", // References blogs/ProactiveAssistance.js
  },
];

export default blogData;
