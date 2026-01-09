"use client";

import { useState } from "react";
import "./css/tools.css";
import { useTool } from "./context";
import {
  MousePointer2,
  Eraser,
  Type,
  Square,
  Circle,
  Minus,
  Pen,
  Shapes,
  Triangle,
  Star,
  Pentagon,
  Hexagon,
} from "lucide-react";

const tools = [
  { id: "select", icon: MousePointer2, name: "เลือก" },
  { id: "pen", icon: Pen, name: "ปากกา" },
  { id: "eraser", icon: Eraser, name: "ยางลบ" },
  { id: "text", icon: Type, name: "ข้อความ" },
  {
    id: "shapes",
    icon: Shapes,
    name: "รูปทรง",
    sub: [
      { id: "rect", icon: Square, name: "สี่เหลี่ยม" },
      { id: "circle", icon: Circle, name: "วงกลม" },
      { id: "triangle", icon: Triangle, name: "สามเหลี่ยม" },
      { id: "star", icon: Star, name: "ดาว" },
      { id: "pentagon", icon: Pentagon, name: "ห้าเหลี่ยม" },
      { id: "hexagon", icon: Hexagon, name: "หกเหลี่ยม" },
      { id: "line", icon: Minus, name: "เส้นตรง" },
    ],
  },
];

export default function Toolbar() {
  const { tool, setTool, color, setColor } = useTool();
  const [showShapes, setShowShapes] = useState(false);

  const change = (id: string) => {
    setTool(id);
    setShowShapes(false);
  };

  const toggleShapes = () => {
    setShowShapes(!showShapes);
  };

  return (
    <div className="toolbar-container">
      {tools.map((t) => {
        const Icon = t.icon;
        const active = tool === t.id;
        const hasSub = t.sub && t.sub.length > 0;

        if (hasSub) {
          return (
            <div key={t.id} className="shape-wrapper">
              <button
                onClick={toggleShapes}
                className={active ? "tool-item active" : "tool-item"}
                title={t.name}
              >
                <Icon size={20} />
              </button>

              {showShapes && (
                <div className="shape-popup">
                  {t.sub?.map((s) => {
                    const SubIcon = s.icon;
                    const subActive = tool === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => change(s.id)}
                        className={subActive ? "tool-item active" : "tool-item"}
                        title={s.name}
                      >
                        <SubIcon size={18} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        return (
          <button
            key={t.id}
            onClick={() => change(t.id)}
            className={active ? "tool-item active" : "tool-item"}
            title={t.name}
          >
            <Icon size={20} />
          </button>
        );
      })}

      <div className="line-divider"></div>
      <input
        type="color"
        className="color-box"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}
