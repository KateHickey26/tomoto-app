import React, { useState } from "react";
import Header from "./components/Header.tsx";
import Timer from "./components/Timer.tsx";
import BreakContent from "./components/BreakContent.tsx";

function App() {
  const [isBreak, setIsBreak] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center p-6">
        {isBreak ? (
          <BreakContent onDone={() => setIsBreak(false)} />
        ) : (
          <Timer onBreak={() => setIsBreak(true)} />
        )}
      </main>
    </div>
  );
}

export default App;