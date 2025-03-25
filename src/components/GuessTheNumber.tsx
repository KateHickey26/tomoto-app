import React, { useState } from "react";

const GuessTheNumber: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState(() => generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [flash, setFlash] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber(): number {
    // Adjust range if you like; 1–100 is common
    return Math.floor(Math.random() * 100) + 1;
  }

  const updateMessage = (newMsg: string) => {
    // If the new message is the same as the current one, trigger a flash.
    if (message === newMsg) {
      setFlash(true);
      // Remove the flash flag after a short delay (500ms)
      setTimeout(() => setFlash(false), 500);
    }
    setMessage(newMsg);
  };

  const handleGuess = () => {
    const numericGuess = parseInt(guess, 10);
    if (isNaN(numericGuess)) {
      updateMessage("Please enter a valid number.");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numericGuess < targetNumber) {
      updateMessage("Too low!");
    } else if (numericGuess > targetNumber) {
      updateMessage("Too high!");
    } else {
      updateMessage(`You got it in ${attempts + 1} attempts!`);
    }
  };

  const handleReset = () => {
    setTargetNumber(generateRandomNumber());
    setGuess("");
    setMessage("");
    setFlash(false);
    setAttempts(0);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <p className="text-xl font-bold mb-4">Guess the Number</p>
      <div className="flex gap-2">
        <input
          type="number"
          className="border border-gray-300 rounded px-2 py-1 w-24"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="1-100"
        />
        <button
          onClick={handleGuess}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Guess
        </button>
      </div>
      {/* The message element gets an additional "flash" class when flash is true */}
      <p className={`mt-4 text-lg transition-all duration-300 ${flash ? "flash" : ""}`}>
        {message}
      </p>
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Reset
      </button>
    </div>
  );
};

export default GuessTheNumber;