import React from "react";
import Paper from "./Paper";
import paperData from "../data/paperData";

const Research = () => {
  return (
    <div className="research">
      <div className="research-content">
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
