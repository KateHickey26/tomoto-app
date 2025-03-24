import React, { useState } from "react";
import Header from "./components/Header.tsx";
import Timer from "./components/Timer.tsx";
import BreakContent from "./components/BreakContent.tsx";

function App() {
  const [isBreak, setIsBreak] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      <main className="flex flex-col items-center justify-center p-6">
        {isBreak ? (
          <BreakContent onDone={() => setIsBreak(false)} soundEnabled={soundEnabled} />
        ) : (
          <Timer onBreak={() => setIsBreak(true)} soundEnabled={soundEnabled} />
        )}
      </main>
      <button
        onClick={() => {
        const testAudio = new Audio("/sounds/message.mp3");
        testAudio.play().catch((err) => console.error("Audio error:", err));
      }}
      >
      Test Sound
      </button>
    </div>
  );
}

export default App;