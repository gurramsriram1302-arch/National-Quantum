"use client";

import React, { useEffect, useRef } from "react";

export default function PsiProcessorChip({ size = 180 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      // Isometric projection transform
      ctx.save();
      ctx.translate(cx, cy);

      // Subtle floating bob
      const floatY = Math.sin(time * 0.8) * 4;
      ctx.translate(0, floatY);

      // Skew/rotate for isometric 3D chip angle matching Slide 3
      ctx.scale(1, 0.58);
      ctx.rotate(-Math.PI / 4);

      // Chip Base Substrate Shadow & Glow
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 24;
      ctx.fillStyle = "rgba(10, 25, 55, 0.85)";
      ctx.fillRect(-45, -45, 90, 90);
      ctx.shadowBlur = 0;

      // Outer Substrate Border
      ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeRect(-45, -45, 90, 90);

      // Radiating Circuit Traces & Electrical Pulses
      const drawTraces = () => {
        const pinOffsets = [-30, -15, 0, 15, 30];
        pinOffsets.forEach((p, idx) => {
          // North traces
          ctx.beginPath();
          ctx.moveTo(p, -45);
          ctx.lineTo(p, -65);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // South traces
          ctx.beginPath();
          ctx.moveTo(p, 45);
          ctx.lineTo(p, 65);
          ctx.strokeStyle = "rgba(192, 132, 252, 0.4)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // East / West traces
          ctx.beginPath();
          ctx.moveTo(-45, p);
          ctx.lineTo(-65, p);
          ctx.moveTo(45, p);
          ctx.lineTo(65, p);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Current pulse moving along pins
          const pulseT = (time * 1.5 + idx * 0.2) % 1;
          const py = -45 - pulseT * 20;
          ctx.beginPath();
          ctx.arc(p, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      };
      drawTraces();

      // Inner QPU Silicon Die
      ctx.fillStyle = "rgba(18, 32, 68, 0.95)";
      ctx.fillRect(-30, -30, 60, 60);

      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 10;
      ctx.strokeRect(-30, -30, 60, 60);
      ctx.shadowBlur = 0;

      // Inner Concentric Ring
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(192, 132, 252, 0.6)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Draw |Ψ⟩ Symbol (State Vector) on the chip core
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy + floatY);
      ctx.font = "bold 22px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 14;
      ctx.fillText("|Ψ⟩", 0, -2);
      ctx.shadowBlur = 0;
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return (
    <div className="relative pointer-events-none select-none" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} style={{ width: size, height: size }} className="block" />
    </div>
  );
}
