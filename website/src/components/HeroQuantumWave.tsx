"use client";

import React, { useEffect, useRef } from "react";

interface HeroQuantumWaveProps {
  className?: string;
  height?: number;
}

export default function HeroQuantumWave({
  className = "",
  height = 260,
}: HeroQuantumWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let phase = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      canvas.width = rect.width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Number of columns and rows for the quantum particle wave mesh
    const cols = 68;
    const rows = 14;

    const render = () => {
      phase += 0.022; // Speed of the traveling wave
      ctx.clearRect(0, 0, width, height);

      const xSpacing = width / (cols - 1);
      const rowSpacing = 9;
      const baseY = height * 0.48;

      // Draw wave grid points and connecting crest lines
      for (let r = 0; r < rows; r++) {
        const depthRatio = (r + 1) / rows; // 0 to 1
        const perspective = 0.65 + depthRatio * 0.45;

        // Path for connecting lines across this wave row
        ctx.beginPath();
        let rowFirst = true;

        for (let c = 0; c < cols; c++) {
          const x = c * xSpacing;

          // Double sinusoidal interference pattern matching PPT wave
          const wave1 = Math.sin(c * 0.14 + phase + r * 0.22) * (26 + r * 1.2);
          const wave2 = Math.cos(c * 0.08 - phase * 0.85 + r * 0.15) * 16;
          const wave3 = Math.sin(c * 0.05 + phase * 0.5) * 12;

          // Mouse interactive wave ripple
          const dx = x - mouseX;
          const dy = (baseY + r * rowSpacing) - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseLift = dist < 180 ? (1 - dist / 180) * -32 : 0;

          const y = baseY + (r - rows / 2) * rowSpacing + wave1 + wave2 + wave3 + mouseLift;

          // Connecting line
          if (rowFirst) {
            ctx.moveTo(x, y);
            rowFirst = false;
          } else {
            ctx.lineTo(x, y);
          }

          // Point Color: smooth gradient from cyan to purple/magenta
          const colRatio = (c / cols + r / rows * 0.4 + Math.sin(phase + c * 0.1) * 0.2 + 1) % 1;
          const isCyan = colRatio < 0.5;
          const alpha = 0.25 + depthRatio * 0.7;

          // Draw the glowing wave particle
          ctx.beginPath();
          const pointRadius = (1.4 + (r % 3 === 0 ? 0.7 : 0)) * perspective;
          ctx.arc(x, y, pointRadius, 0, Math.PI * 2);

          if (isCyan) {
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
            if (r % 4 === 0 && c % 6 === 0) {
              ctx.shadowColor = "#38bdf8";
              ctx.shadowBlur = 8;
            }
          } else {
            ctx.fillStyle = `rgba(192, 132, 252, ${alpha})`;
            if (r % 4 === 0 && c % 6 === 0) {
              ctx.shadowColor = "#c084fc";
              ctx.shadowBlur = 8;
            }
          }

          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Stroke the row mesh line with delicate neon glow
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * depthRatio})`;
        ctx.lineWidth = 0.8 * perspective;
        ctx.stroke();
      }

      // Add a couple of moving luminous quantum spark flares traveling along the crest
      for (let s = 0; s < 3; s++) {
        const sparkT = (phase * 18 + s * (width / 3)) % width;
        const colIdx = Math.floor(sparkT / xSpacing);
        const waveY =
          baseY +
          Math.sin(colIdx * 0.14 + phase) * 26 +
          Math.cos(colIdx * 0.08 - phase * 0.85) * 16 +
          Math.sin(colIdx * 0.05 + phase * 0.5) * 12;

        const sparkGrad = ctx.createRadialGradient(sparkT, waveY, 0, sparkT, waveY, 14);
        sparkGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        sparkGrad.addColorStop(0.3, "rgba(56, 189, 248, 0.7)");
        sparkGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = sparkGrad;
        ctx.beginPath();
        ctx.arc(sparkT, waveY, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [height]);

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: `${height}px` }}
        className="block"
      />
    </div>
  );
}
