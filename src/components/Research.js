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
            Our digital workspaces should not remain static backdrops to our
            activity—they should evolve with us: responsive to our dynamic and
            personalized needs. I am interested in exploring the fundamental
            components of our current interfaces and examining how they can be
            reimagined to better align with human thinking processes.
          </p>
          <p>
            My Ph.D research focuses on how computational structures, as one of
            the foundamental components. can be generated, composed, and
            synchronized to support complex information activities.
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
