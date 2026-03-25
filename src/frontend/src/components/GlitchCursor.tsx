import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 14;
// Skip the first N orbs so no light appears directly under the arrow tip
const TRAIL_START = 3;

export default function GlitchCursor() {
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPos = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })),
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Glitch state: which orb indices are currently glitching
  const glitchState = useRef<
    Map<
      number,
      {
        offsetX: number;
        color: string;
        opacity: number;
        scaleX: number;
        until: number;
      }
    >
  >(new Map());
  const nextGlitchTime = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = (now: number) => {
      const mouse = mousePos.current;
      const pts = trailPos.current;

      // Faster lerp so trail closely follows the cursor
      pts[0].x = lerp(pts[0].x, mouse.x, 0.45);
      pts[0].y = lerp(pts[0].y, mouse.y, 0.45);

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const factor = 0.42 - i * 0.02;
        pts[i].x = lerp(pts[i].x, pts[i - 1].x, Math.max(factor, 0.15));
        pts[i].y = lerp(pts[i].y, pts[i - 1].y, Math.max(factor, 0.15));
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouse.x}px`;
        cursorRef.current.style.top = `${mouse.y}px`;
      }

      // --- Glitch scheduler ---
      if (now >= nextGlitchTime.current) {
        nextGlitchTime.current = now + 150 + Math.random() * 150;

        const count = 2 + Math.floor(Math.random() * 2);
        const duration = 60 + Math.random() * 40;
        const until = now + duration;
        const used = new Set<number>();

        for (let g = 0; g < count; g++) {
          let idx =
            TRAIL_START +
            Math.floor(Math.random() * (TRAIL_LENGTH - TRAIL_START));
          while (used.has(idx))
            idx =
              TRAIL_START +
              ((idx - TRAIL_START + 1) % (TRAIL_LENGTH - TRAIL_START));
          used.add(idx);

          const isScanline = g === 0 && Math.random() > 0.5;
          if (isScanline) {
            const midIdx = TRAIL_START + 2 + Math.floor(Math.random() * 4);
            glitchState.current.set(midIdx, {
              offsetX: (Math.random() - 0.5) * 8,
              color: "#00ffff",
              opacity: 0.35,
              scaleX: 2.5,
              until,
            });
          } else {
            const flashColor = Math.random() > 0.5 ? "#ff00ff" : "#00ffff";
            glitchState.current.set(idx, {
              offsetX: (Math.random() - 0.5) * 8,
              color: flashColor,
              opacity: 0.9,
              scaleX: 1,
              until,
            });
          }
        }
      }

      // Clear expired glitch entries
      for (const [key, val] of glitchState.current) {
        if (now >= val.until) glitchState.current.delete(key);
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

          // Hide orbs close to the arrow tip
          if (i < TRAIL_START) {
            orb.style.opacity = "0";
            continue;
          }

          const ratio = 1 - i / TRAIL_LENGTH;
          const pt = pts[i];

          const size = 1 + 5 * ratio;

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

          let opacity = ratio * 0.6;
          const glowSize = size * 0.8;
          let transformExtra = "";

          const gs = glitchState.current.get(i);
          if (gs) {
            color = gs.color;
            opacity = gs.opacity;
            const tx = -50 + gs.offsetX;
            transformExtra = `translate(${tx}%, -50%) scaleX(${gs.scaleX})`;
          }

          orb.style.left = `${pt.x}px`;
          orb.style.top = `${pt.y}px`;
          orb.style.width = `${size}px`;
          orb.style.height = `${size}px`;
          orb.style.opacity = `${opacity}`;
          orb.style.background = color;
          orb.style.boxShadow = `0 0 ${glowSize}px ${glowSize * 0.3}px ${color}`;
          orb.style.filter = `blur(${(1 - ratio) * 0.8}px)`;
          orb.style.transform = transformExtra || "translate(-50%,-50%)";
          orb.style.borderRadius = gs?.scaleX && gs.scaleX > 1 ? "2px" : "50%";
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

      {/* Standard OS-style arrow cursor — no glow on the arrow itself */}
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
          style={{ display: "block" }}
        >
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
