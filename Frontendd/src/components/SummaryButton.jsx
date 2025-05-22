import React from "react";
import axios from "axios";

function SummaryButton({ onSummaryComplete }) {
  const handleClick = async () => {
    try {
      const res = await axios.post("/api/summarize");
      onSummaryComplete(res.data.message);
    } catch  {
      onSummaryComplete("Failed to send summary to Slack.");
    }
  };

  return (
    <button onClick={handleClick} className="bg-green-600 text-white px-4 py-2">
      Summarize and Send to Slack
    </button>
  );
}

export default SummaryButton;