"use client";

import Board from "./board";
import Toolbar from "./tools";
import { ToolProvider } from "./context";

export default function Home() {
  return (
    <ToolProvider>
      <main className="flex flex-col h-screen">
        <Toolbar />
        <div className="flex-1 relative">
          <Board />
        </div>
      </main>
    </ToolProvider>
  );
}
