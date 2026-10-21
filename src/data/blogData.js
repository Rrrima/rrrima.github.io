// Blog metadata - each blog references its own component file
const blogData = [
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
