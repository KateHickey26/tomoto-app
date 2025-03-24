import React, { useEffect, useState } from "react";
import { breakItems } from "../data/breakItems.ts";

interface BreakContentProps {
  onDone: () => void;
}

export default function BreakContent({ onDone }: BreakContentProps) {
  const [item, setItem] = useState("");

  useEffect(() => {
    const random = breakItems[Math.floor(Math.random() * breakItems.length)];
    setItem(random);
    const timer = setTimeout(onDone, 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="text-center">
      <div className="text-xl font-semibold mb-4">Tomoto says it's break time 🧘‍♀️</div>
      <div className="bg-white shadow p-4 rounded max-w-md mx-auto">{item}</div>
      <p className="mt-4 text-sm text-gray-500">Back to work in 5 minutes!</p>
    </div>
  );
}