import React, { useState, useEffect } from "react";

const ClickTheCircle: React.FC = () => {
  const [circleVisible, setCircleVisible] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [circleStyle, setCircleStyle] = useState<React.CSSProperties>({});

  // When the component mounts, wait a random delay before showing the circle.
  useEffect(() => {
    const delay = Math.floor(Math.random() * 2000) + 1000; // delay between 1 and 3 seconds
    const timer = setTimeout(() => {
      setCircleVisible(true);
      setStartTime(Date.now());
      // Random position inside the container
      const top = Math.floor(Math.random() * 200);
      const left = Math.floor(Math.random() * 200);
      setCircleStyle({
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#4CAF50",
        cursor: "pointer",
      });
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (circleVisible && startTime) {
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setCircleVisible(false);
    }
  };

  const handleReset = () => {
    setCircleVisible(false);
    setReactionTime(null);
    setStartTime(null);
    setCircleStyle({});
    // Trigger the effect again to show the circle after a random delay.
    const delay = Math.floor(Math.random() * 2000) + 1000;
    const timer = setTimeout(() => {
      setCircleVisible(true);
      setStartTime(Date.now());
      const top = Math.floor(Math.random() * 200);
      const left = Math.floor(Math.random() * 200);
      setCircleStyle({
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#4CAF50",
        cursor: "pointer",
      });
    }, delay);
    return () => clearTimeout(timer);
  };

  return (
    <div className="relative w-64 h-64 bg-gray-100 border border-gray-300 rounded">
      {circleVisible && (
        <div style={circleStyle} onClick={handleClick} />
      )}
      {reactionTime !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold">Reaction Time: {reactionTime} ms</p>
          <button
            onClick={handleReset}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      )}
      {!circleVisible && reactionTime === null && (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">Wait for the circle...</p>
        </div>
      )}
    </div>
  );
};

export default ClickTheCircle;