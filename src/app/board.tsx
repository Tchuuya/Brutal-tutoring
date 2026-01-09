"use client";

import "./css/board.css";
import { useEffect, useState, useRef } from "react";
import { RefreshCcw } from "lucide-react";
import { useTool } from "./context";
import {
  Pen,
  Eraser,
  Type,
  Square,
  Circle,
  Triangle,
  Star,
  Pentagon,
  Hexagon,
  Minus,
  Crosshair,
} from "lucide-react";

export default function Board() {
  const [zoom, setZoom] = useState(1);
  const canvas = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { tool } = useTool();

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        const d = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prev) => Math.max(0.5, Math.min(3, prev + d)));
      }
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  const zoomPlus = () => {
    setZoom((prev) => Math.min(3, prev + 0.1));
  };

  const zoomMinus = () => {
    setZoom((prev) => Math.max(0.5, prev - 0.1));
  };

  const reset = () => {
    setZoom(1);
  };

  const getCursor = () => {
    const size = 20;
    switch (tool) {
      case "pen":
        return <Pen size={size} />;
      case "eraser":
        return <Eraser size={size} />;
      case "text":
        return <Type size={size} />;
      case "rect":
        return <Square size={size} />;
      case "circle":
        return <Circle size={size} />;
      case "triangle":
        return <Triangle size={size} />;
      case "star":
        return <Star size={size} />;
      case "pentagon":
        return <Pentagon size={size} />;
      case "hexagon":
        return <Hexagon size={size} />;
      case "line":
        return <Minus size={size} />;
      case "select":
        return <Crosshair size={size} />;
      default:
        return <Crosshair size={size} />;
    }
  };

  return (
    <>
      <div className="title-bubble">กระดานติว</div>

      <div className="zoom-bubble">
        <button onClick={zoomMinus}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={zoomPlus}>+</button>
        <button onClick={reset}>
          <RefreshCcw size={16} />
        </button>
      </div>

      <div className="canvas-container" ref={box}>
        <div className="canvas-zoom" style={{ transform: `scale(${zoom})` }}>
          <canvas
            ref={canvas}
            id="whiteboard"
            width="1600"
            height="900"
            style={{ cursor: tool === "select" ? "default" : "none" }}
          />
        </div>
      </div>

      {tool !== "select" && (
        <div ref={cursorRef} className="custom-cursor">
          {getCursor()}
        </div>
      )}
    </>
  );
}
