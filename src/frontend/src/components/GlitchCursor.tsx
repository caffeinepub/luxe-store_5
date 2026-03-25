import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 12;

export default function GlitchCursor() {
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPos = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })),
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const mouse = mousePos.current;
      const pts = trailPos.current;

      pts[0].x = lerp(pts[0].x, mouse.x, 0.35);
      pts[0].y = lerp(pts[0].y, mouse.y, 0.35);

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const factor = 0.28 - i * 0.01;
        pts[i].x = lerp(pts[i].x, pts[i - 1].x, Math.max(factor, 0.08));
        pts[i].y = lerp(pts[i].y, pts[i - 1].y, Math.max(factor, 0.08));
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouse.x}px`;
        cursorRef.current.style.top = `${mouse.y}px`;
      }

      const overlay = overlayRef.current;
      if (overlay) {
        while (overlay.children.length < TRAIL_LENGTH) {
          const orb = document.createElement("div");
          orb.style.cssText =
            "position:fixed;pointer-events:none;border-radius:50%;mix-blend-mode:screen;transform:translate(-50%,-50%);will-change:transform,left,top";
          overlay.appendChild(orb);
        }

        for (let i = 0; i < TRAIL_LENGTH; i++) {
          const orb = overlay.children[i] as HTMLElement;
          const ratio = 1 - i / TRAIL_LENGTH;
          const pt = pts[i];

          // Short and thin: max 6px at head, 1px at tail
          const size = 1 + 5 * ratio;

          // Color: cyan → magenta → purple
          let color: string;
          if (ratio > 0.6) {
            const t = (ratio - 0.6) / 0.4;
            const r = Math.round(lerp(255, 0, t));
            const g = Math.round(lerp(0, 255, t));
            color = `rgb(${r},${g},255)`;
          } else if (ratio > 0.25) {
            const t = (ratio - 0.25) / 0.35;
            const r = Math.round(lerp(168, 255, t));
            const g = Math.round(lerp(85, 0, t));
            const b = Math.round(lerp(247, 255, t));
            color = `rgb(${r},${g},${b})`;
          } else {
            color = "#a855f7";
          }

          const opacity = ratio * 0.6;
          // Minimal glow — very tight, no large bloom
          const glowSize = size * 0.8;

          orb.style.left = `${pt.x}px`;
          orb.style.top = `${pt.y}px`;
          orb.style.width = `${size}px`;
          orb.style.height = `${size}px`;
          orb.style.opacity = `${opacity}`;
          orb.style.background = color;
          orb.style.boxShadow = `0 0 ${glowSize}px ${glowSize * 0.3}px ${color}`;
          orb.style.filter = `blur(${(1 - ratio) * 0.8}px)`;
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

      {/* Standard OS-style arrow cursor with minimal glow */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 10000,
          top: -200,
          left: -200,
        }}
      >
        <svg
          role="img"
          aria-label="cursor"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            // 10% glow only — very subtle
            filter: "drop-shadow(0 0 1.5px rgba(0,255,255,0.4))",
          }}
        >
          {/* Standard pointer arrow, tip at (2,2) */}
          <path
            d="M2 2 L2 18 L6.5 13.5 L10 20 L12.5 19 L9 12.5 L16 12.5 Z"
            fill="white"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="0.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
