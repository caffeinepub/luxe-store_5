import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 12;
const COLORS = ["#00ffff", "#ff00ff", "#a855f7"];

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export default function GlitchCursor() {
  const mousePos = useRef({ x: -100, y: -100 });
  const trail = useRef<TrailPoint[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const glitchOffsets = useRef<{ dx: number; dy: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ dx: 0, dy: 0 })),
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };

      const pts = trail.current;
      pts.unshift({ x, y, age: 0 });
      if (pts.length > TRAIL_LENGTH) pts.length = TRAIL_LENGTH;
      for (let i = 0; i < pts.length; i++) pts[i].age = i;
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mousePos.current.x}px`;
        cursorRef.current.style.top = `${mousePos.current.y}px`;
      }

      glitchOffsets.current = glitchOffsets.current.map(() => ({
        dx: (Math.random() - 0.5) * 8,
        dy: (Math.random() - 0.5) * 8,
      }));

      const overlay = overlayRef.current;
      if (overlay) {
        const pts = trail.current;
        while (overlay.children.length < TRAIL_LENGTH) {
          const dot = document.createElement("div");
          dot.style.cssText =
            "position:fixed;pointer-events:none;border-radius:50%;mix-blend-mode:screen;transform:translate(-50%,-50%)";
          overlay.appendChild(dot);
        }

        for (let i = 0; i < TRAIL_LENGTH; i++) {
          const child = overlay.children[i] as HTMLElement;
          if (i >= pts.length) {
            child.style.display = "none";
            continue;
          }
          const pt = pts[i];
          const { dx, dy } = glitchOffsets.current[i];
          const ratio = 1 - pt.age / TRAIL_LENGTH;
          const opacity = ratio * 0.85;
          const size = Math.max(3, 8 * ratio);
          const color = COLORS[i % COLORS.length];

          child.style.display = "block";
          child.style.left = `${pt.x + dx}px`;
          child.style.top = `${pt.y + dy}px`;
          child.style.width = `${size}px`;
          child.style.height = `${size}px`;
          child.style.opacity = `${opacity}`;
          child.style.background = color;
          child.style.boxShadow = `0 0 ${size * 1.5}px ${color}`;
          child.style.filter = `blur(${1 + (1 - ratio)}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Trail overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Custom cursor arrow */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 10000,
          transform: "translate(-50%, -50%)",
          top: -100,
          left: -100,
        }}
      >
        <svg
          role="img"
          aria-label="cursor"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 0 6px #ff00ff) drop-shadow(0 0 2px #00ffff)",
            display: "block",
          }}
        >
          <polygon
            points="4,4 4,20 9,15 13,23 16,22 12,14 19,14"
            fill="#00ffff"
            stroke="#ff00ff"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
