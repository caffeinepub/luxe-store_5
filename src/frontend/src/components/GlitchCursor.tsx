import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 14;
const TRAIL_START = 3;

export default function GlitchCursor() {
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPos = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })),
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

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

      // --- Glitch scheduler: fire at most every 200ms ---
      if (now >= nextGlitchTime.current) {
        nextGlitchTime.current = now + 200 + Math.random() * 150;

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

      // --- Canvas draw ---
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = TRAIL_START; i < TRAIL_LENGTH; i++) {
            const ratio = 1 - i / TRAIL_LENGTH;
            const pt = pts[i];
            const size = (1 + 5 * ratio) / 2; // radius

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
            let drawX = pt.x;
            const drawY = pt.y;
            let scaleX = 1;
            let isScanline = false;

            const gs = glitchState.current.get(i);
            if (gs) {
              color = gs.color;
              opacity = gs.opacity;
              drawX = pt.x + gs.offsetX;
              scaleX = gs.scaleX;
              isScanline = scaleX > 1;
            }

            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.shadowColor = color;
            ctx.shadowBlur = size * 1.6;
            ctx.fillStyle = color;

            if (isScanline) {
              // Draw a horizontal scanline rectangle
              const w = size * 2 * scaleX;
              const h = Math.max(1, size * 0.5);
              ctx.fillRect(drawX - w / 2, drawY - h / 2, w, h);
            } else {
              ctx.beginPath();
              ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Resize canvas to match window
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
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

      {/* Standard OS-style arrow cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 10000,
          top: -200,
          left: -200,
          willChange: "transform",
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
