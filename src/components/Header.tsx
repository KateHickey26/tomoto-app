import React, { useState } from "react";
import logo from "../assets/tomoto-logo-transparent.png";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

interface HeaderProps {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ soundEnabled, setSoundEnabled }: HeaderProps) {

  const toggleSound = () => {
    setSoundEnabled((prev: boolean) => !prev);
    // Could also store this in localStorage or pass it to other components as needed.
    // TODO: add option to immnediately kill all sound when clicked off
  };

  return (
    <header className="w-full px-4 py-2 bg-white shadow-md flex flex-col items-center justify-center">
      <button
        onClick={toggleSound}
        className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 flex items-center gap-1"
      >
        {soundEnabled ? (
          <>
            <IoMdVolumeHigh size={24} />
            <span className="text-sm">Disable Sounds</span>
          </>
        ) : (
          <>
            <IoMdVolumeOff size={24} />
            <span className="text-sm">Enable Sounds</span>
          </>
        )}
      </button>
      <img
        src={logo}
        alt="Tomoto Logo"
        className="w-36 h-36"
      />
      <h1 className="mt-3 text-6xl font-extrabold text-gray-800">Tomoto</h1>
      <h2 className="mt-1 font-extrabold text-center text-gray-800">
        Your Pomodoro pal! <br />
        
      </h2>
      <h3 className="mt-4 text-center text-gray-800">
        Let Tomoto time your work stints, and he'll let you  <br />
        know when it's time to take a break.
      </h3>
    </header>
  );
}