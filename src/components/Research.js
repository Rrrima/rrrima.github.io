import React from "react";
import Paper from "./Paper";
import paperData from "../data/paperData";

const Research = () => {
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
        <h2 className="research-title">Selected Publications</h2>
        <div className="papers-list">
          {paperData.map((paper) => (
            <Paper key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Research;
