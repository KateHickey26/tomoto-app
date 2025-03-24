import React from "react";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo placeholder — replace with actual logo or SVG if you have one */}
        <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
          🍅
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">Tomoto</h1>
      </div>
    </header>
  );
}