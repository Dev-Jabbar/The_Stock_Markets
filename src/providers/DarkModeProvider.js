"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

const DarkmodeProvider = ({ children }) => {
  return (
    <div>
      <ThemeProvider enableSystem={false} attribute="class">
        {children}
      </ThemeProvider>
    </div>
  );
};

export default DarkmodeProvider;
