import React, { useEffect, useState } from "react";

interface BreakContentProps {
  onDone: () => void;
}

type BreakType = "miniGame" | "wellness" | "fact" | "quote" | "justTimer" | null;

export default function BreakContent({ onDone }: BreakContentProps) {
  // const breakDuration = 5 * 60; // 5 minutes in seconds
  const breakDuration = 5 ; // 5 seconds for testing
  const [timeLeft, setTimeLeft] = useState(breakDuration);
  const [breakType, setBreakType] = useState<BreakType>(null);
  const [item, setItem] = useState("");

  // Play reminder sound every 20 seconds if no break type is selected
  useEffect(() => {
    if (!breakType) {
      const reminderInterval = setInterval(() => {
        const reminderAudio = new Audio("/sounds/message.mp3");
        reminderAudio.play();
      }, 20000); // 20 seconds
      return () => clearInterval(reminderInterval);
    }
  }, [breakType]);

  // Countdown timer: only start when a break type is chosen
  useEffect(() => {
    // Optionally play a sound at the start of the break:
    // const startAudio = new Audio("/sounds/break-start.mp3");
    // startAudio.play();
    if (breakType) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Play break end sound
            const audioEnd = new Audio("/sounds/message.mp3");
            audioEnd.play();
            onDone();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [breakType, onDone]);

  // Function to select a random message based on the break type
  const pickRandomItem = (type: BreakType) => {
    if (type === "miniGame") {
      return "Mini Game: [Game Placeholder]";
    } else if (type === "wellness") {
      const items = [
        "Wellness: Stretch your arms!",
        "Wellness: Take deep breaths!",
        "Wellness: Stand up and move around!",
      ];
      return items[Math.floor(Math.random() * items.length)];
    } else if (type === "fact") {
      const items = [
        "Fun Fact: Honey never spoils.",
        "Fun Fact: Bananas are berries.",
      ];
      return items[Math.floor(Math.random() * items.length)];
    } else if (type === "quote") {
      const items = [
        "Quote: “You miss 100% of the shots you don't take.” – Wayne Gretzky",
        "Quote: “The best time to start was yesterday. The next best time is now.”",
      ];
      return items[Math.floor(Math.random() * items.length)];
    } else if (type === "justTimer") {
      return ""; // No additional message
    }
    return "";
  };

  // Initialize the break content when a type is selected
  useEffect(() => {
    if (breakType && breakType !== "justTimer" && !item) {
      setItem(pickRandomItem(breakType));
    }
  }, [breakType, item]);

  // Handler for "Next" to fetch another random message
  const handleNext = () => {
    if (breakType && breakType !== "justTimer") {
      setItem(pickRandomItem(breakType));
    }
  };

  // If no break type is chosen, show the selection menu
  if (!breakType) {
    return (
      <div className="text-center">
        <div className="text-xl font-semibold mb-4">
          What kind of break would you like?
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setBreakType("miniGame")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Mini Game
          </button>
          <button
            onClick={() => setBreakType("wellness")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Wellness Challenge
          </button>
          <button
            onClick={() => setBreakType("fact")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Fun Fact
          </button>
          <button
            onClick={() => setBreakType("quote")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Quote
          </button>
          <button
            onClick={() => setBreakType("justTimer")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Just Timer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-xl font-semibold mb-4">
        Tomoto says it's break time 🧘‍♀️
      </div>
      {/* Only show the activity message if break type isn't "justTimer" */}
      {breakType !== "justTimer" && (
        <div className="bg-white shadow p-4 rounded max-w-md mx-auto mb-4">
          {item}
        </div>
      )}
      <div className="mb-4">
        <span className="text-sm text-gray-500">
          Break ends in: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="flex justify-center gap-4">
        {breakType !== "justTimer" && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Next
          </button>
        )}
        <button
          onClick={onDone}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          I'm Ready
        </button>
      </div>
    </div>
  );
}