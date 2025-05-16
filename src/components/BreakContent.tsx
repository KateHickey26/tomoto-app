import React, { useEffect, useState } from "react";
import { miniGames } from "../data/miniGames.ts";
import { wellnessMessages } from "../data/wellnessMessages.ts";
import { facts } from "../data/facts.ts";
import { quotes } from "../data/quotes.ts";

interface BreakContentProps {
  onDone: () => void;
  soundEnabled: boolean;
}

type BreakType = "miniGame" | "wellness" | "fact" | "quote" | "justTimer" | null;

export default function BreakContent({ onDone, soundEnabled }: BreakContentProps) {
  const breakDuration = 5 * 2; // 5 minutes in seconds
  // const breakDuration = 5 ; // 5 seconds for testing
  const [timeLeft, setTimeLeft] = useState(breakDuration);
  const [breakType, setBreakType] = useState<BreakType>(null);
  const [item, setItem] = useState("");
  const [selectedMiniGame, setSelectedMiniGame] = useState<React.FC | null>(null);


  // Play reminder sound every 20 seconds if no break type is selected
  useEffect(() => {
    if (!breakType && soundEnabled) {
      const reminderInterval = setInterval(() => {
        const reminderAudio = new Audio("/sounds/message.mp3");
        reminderAudio.play();
      }, 20000); // 20 seconds
      return () => clearInterval(reminderInterval);
    }
  }, [breakType, soundEnabled]);

   // Start the countdown when a break type is chosen
   useEffect(() => {
    if (breakType) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [breakType]);

    // When time reaches 0, play the break end sound (if enabled) and trigger onDone
    useEffect(() => {
      if (breakType && timeLeft === 0) {
        if (soundEnabled) {
          const audioEnd = new Audio("/sounds/message.mp3");
          audioEnd.play();
        }
        // Delay calling onDone until after the render
        setTimeout(() => {
          onDone();
        }, 0);
      }
    }, [timeLeft, breakType, onDone, soundEnabled]);


    // For non-minigame types, pick a random message
    const pickRandomItem = (type: BreakType) => {
      if (type === "wellness") {
        return wellnessMessages[Math.floor(Math.random() * wellnessMessages.length)];
      } else if (type === "fact") {
        return facts[Math.floor(Math.random() * facts.length)];
      } else if (type === "quote") {
        return quotes[Math.floor(Math.random() * quotes.length)];
      } else if (type === "miniGame") {
        // In pickRandomItem or a separate effect:
        const randomIndex = Math.floor(Math.random() * miniGames.length);
        setSelectedMiniGame(() => miniGames[randomIndex].component);
      } else if (type === "justTimer") {
        return "";
      }
      return "";
    };

      // Handler for "Next" to fetch another random message
    const handleNext = () => {
      if (breakType && breakType !== "justTimer") {
        setItem(pickRandomItem(breakType));
      }
    };

  // Initialize the break content when a type is selected
  useEffect(() => {
    if (breakType && breakType !== "justTimer" && !item) {
      setItem(pickRandomItem(breakType));
    }
  }, [breakType, item]);


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
      {breakType === "miniGame" && selectedMiniGame ? (
        <div className="mb-4">
          {React.createElement(selectedMiniGame)}
        </div>
      ) : (
        breakType !== "justTimer" && (
          <div className="bg-white shadow p-4 rounded max-w-md mx-auto mb-4">
            {item}
          </div>
        )
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