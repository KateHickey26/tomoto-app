import React from "react";
import logo from "../assets/tomoto-logo-transparent.png";

export default function Header() {
  return (
    <header className="w-full px-4 py-2 bg-white shadow-md flex flex-col items-center justify-center">
      <img
        src={logo}
        alt="Tomoto Logo"
        className="w-72 h-72"
      />
      <h1 className="mt-1 text-8xl font-extrabold text-gray-800">Tomoto</h1>
    </header>
  );
}