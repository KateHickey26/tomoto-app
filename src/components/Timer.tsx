import React, { useEffect, useState } from "react";

interface TimerProps {
  onBreak: () => void;
}

const WORK_TIME = 25 * 60;

export default function Timer({ onBreak }: TimerProps) {
  const [time, setTime] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      onBreak();
    }
    return () => clearInterval(timer);
  }, [running, time, onBreak]);

  const format = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="text-center">
      <div className="text-6xl font-mono mb-4">{format(time)}</div>
      <button
        onClick={() => setRunning((r) => !r)}
        className="px-6 py-2 bg-blue-500 text-white rounded"
      >
        {running ? "Pause" : "Start"}
      </button>
    </div>
  );
}