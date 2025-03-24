import React, { useEffect, useState } from "react";

interface TimerProps {
  onBreak: () => void;
}

// const WORK_TIME = 25 * 60; // 25 minutes in seconds
const WORK_TIME = 10; // 10 seconds for testing

export default function Timer({ onBreak }: TimerProps) {
  const [time, setTime] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      // Play break start sound when timer ends
      const audio = new Audio("/sounds/sweetalert.wav");
      audio.play();
      onBreak();
    }
    return () => clearInterval(timer);
  }, [running, time, onBreak]);

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  const handleReset = () => {
    setTime(WORK_TIME);
    setRunning(false);
  };

  // Force a break immediately
  const forceBreak = () => {
    const audio = new Audio("/sounds/sweetalert.wav");
    audio.play();
    onBreak();
  };

  return (
    <div className="text-center">
      <div className="text-6xl font-mono mb-4">{formatTime(time)}</div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={forceBreak}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Break Now
        </button>
      </div>
    </div>
  );
}