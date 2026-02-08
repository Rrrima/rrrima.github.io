import React, { useState, useEffect, useRef } from "react";
import activitiesData from "../data/activities.json";
import { ExternalLink } from "lucide-react";

const ActivityLog = () => {
  const [selectedTag, setSelectedTag] = useState("now & Then");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const filtered = activitiesData.activities.filter((activity) =>
      activity.tags.includes(selectedTag)
    );
    setFilteredActivities(filtered);
  }, [selectedTag]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px threshold
    setIsAtBottom(isBottom);
  };

  // Function to render content with hyperlinks as icon buttons
  const renderContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="activity-link-button"
            title={part}
          >
            <ExternalLink size={13} />
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Function to check if activity is current/ongoing
  const isCurrentActivity = (activity) => {
    // First check if the activity has an explicit iscurrent flag
    if (activity.iscurrent === true) {
      return true;
    }

    const time = activity.time;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (time.includes("?")) {
      return true;
    }

    // Check if the time contains current year and is ongoing
    if (time.includes(currentYear.toString())) {
      // Check if it's a range that includes current month
      if (time.includes("-")) {
        const [start, end] = time.split("-");
        const startParts = start.split(".");
        const endParts = end.split(".");

        if (startParts.length === 2 && endParts.length === 2) {
          const startMonth = parseInt(startParts[1]);
          const endMonth = parseInt(endParts[1]);
          const activityYear = parseInt(startParts[0]);

          if (
            activityYear === currentYear &&
            currentMonth >= startMonth &&
            currentMonth <= endMonth
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const tags = ["now & Then", "education"];

  return (
    <div className="activity-log-inline">
      <div className="activity-log-tags-inline">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`activity-tag-inline ${
              selectedTag === tag ? "active" : ""
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>
      <div
        className={`activity-log-content-inline ${
          isAtBottom ? "at-bottom" : ""
        }`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {filteredActivities.map((activity, index) => (
          <div
            key={index}
            className={`activity-item-inline ${
              isCurrentActivity(activity) ? "current" : ""
            }`}
          >
            <span
              className={`activity-time-inline ${
                isCurrentActivity(activity) ? "current" : ""
              }`}
            >
              {activity.time}
            </span>
            <span className="activity-content-inline">
              {renderContent(activity.content)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
