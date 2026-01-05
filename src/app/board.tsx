"use client";

import "./style.css";
import { useEffect, useState, useRef } from "react";

export default function Board() {
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)));
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const zoomIn = () => {
    setZoom((prev) => Math.min(3, prev + 0.1));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(0.5, prev - 0.1));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <>
      <div className="title-bubble">กระดานติว</div>

      <div className="zoom-bubble">
        <button onClick={zoomOut}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn}>+</button>
        <button onClick={resetZoom}>Reset</button>
      </div>

      <div className="canvas-container" ref={containerRef}>
        <div className="canvas-zoom" style={{ transform: `scale(${zoom})` }}>
          <canvas ref={canvasRef} id="whiteboard" width="1600" height="900" />
        </div>
      </div>
    </>
  );
}
