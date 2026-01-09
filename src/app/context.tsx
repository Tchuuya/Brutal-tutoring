"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ToolType = {
  tool: string;
  setTool: (tool: string) => void;
  color: string;
  setColor: (color: string) => void;
};

const ToolContext = createContext<ToolType | undefined>(undefined);

export function ToolProvider({ children }: { children: ReactNode }) {
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("black");

  return (
    <ToolContext.Provider value={{ tool, setTool, color, setColor }}>
      {children}
    </ToolContext.Provider>
  );
}

export function useTool() {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useTool must be used within ToolProvider");
  }
  return context;
}
