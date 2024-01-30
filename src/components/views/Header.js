import React from "react";
import ThemeToggleSwitch from "../ui/Switch";

function Header() {
  return (
    <div>
      <span className=" md:absolute  text-white">
        <ThemeToggleSwitch />
      </span>
      <h1 className="font-extrabold md:text-3xl 2xl:text-5xl   text-center mt-3 mb-8 bg-gradient-to-r from-blue-700 to-purple-500 via-red-600 text-transparent bg-clip-text">
        Stock Market Data Visualization
      </h1>
    </div>
  );
}

export default Header;
