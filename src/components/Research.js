import React, { useState } from "react";
import Paper from "./Paper";
import { BlogsList } from "./Blogs";
import paperData from "../data/paperData";

// Two tabs under My Research: the papers, and what I want to write down before I forget.
const TABS = [
  { id: "papers", label: "Selected Publications" },
  { id: "poking", label: "Before I Forgot" },
];

const Research = () => {
  const [tab, setTab] = useState("papers");
  return (
    <div className="research">
      <div className="research-content">
        <div className="hero-text">
          <p className="hero-caption2">My Research</p>
          <p>
            I work on generative UIs and dynamic interfaces, with the belief
            that computers should help humans think better, not just get things
            done. My research focuses on the fundamental components of our
            current interfaces - explores how they can be reimagined to better
            align with human thinking processes.
          </p>
        </div>
        <div className="section-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`section-tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="section-tab-panel" key={tab} role="tabpanel">
          {tab === "poking" ? (
            <BlogsList />
          ) : (
            <div className="papers-list">
              {paperData.map((paper) => (
                <Paper key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Research;
