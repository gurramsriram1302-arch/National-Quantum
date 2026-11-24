"use client";

import React, { useEffect, useRef } from "react";

interface QuantumParticleCanvasProps {
  className?: string;
}

export default function QuantumParticleCanvas({ className = "" }: QuantumParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Quantum Wave Grid Nodes (recreating the undulating wave landscape from PPT)
    const cols = 55;
    const rows = 14;
    let phase = 0;

    // Ambient floating particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.5 ? "rgba(56, 189, 248, " : "rgba(168, 85, 247, ",
    }));

    const render = () => {
      // Ease mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle floating particles
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color === "rgba(56, 189, 248, " ? "#38bdf8" : "#a855f7";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Undulating Quantum Wave Mesh Grid (Bottom Horizon)
      phase += 0.018;
      const baseY = height * 0.88;
      const xSpacing = width / (cols - 1);
      const zSpacing = 16;

      for (let r = 0; r < rows; r++) {
        const rowDepthFactor = (r + 1) / rows;
        const perspectiveScale = 0.6 + rowDepthFactor * 0.5;

        for (let c = 0; c < cols; c++) {
          const x = c * xSpacing;
          // Dual sine wave for interference pattern
          const wave1 = Math.sin(c * 0.18 + phase + r * 0.3) * 28;
          const wave2 = Math.cos(c * 0.09 - phase * 0.8 + r * 0.2) * 18;
          
          // Mouse interaction ripple
          const dx = x - mouseX;
          const dy = baseY + r * zSpacing - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseLift = dist < 220 ? (1 - dist / 220) * -35 : 0;

          const y = baseY + (r - rows / 2) * zSpacing + wave1 + wave2 + mouseLift;

          // Color gradient between cyan and purple
          const colRatio = (c / cols + r / rows) % 1;
          const isCyan = colRatio < 0.55;
          const alpha = 0.2 + rowDepthFactor * 0.6;

          ctx.beginPath();
          ctx.arc(x, y, 1.4 * perspectiveScale, 0, Math.PI * 2);
          ctx.fillStyle = isCyan
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(168, 85, 247, ${alpha})`;
          ctx.fill();

          // Connect with neighbor node to form fine quantum mesh
          if (c > 0 && r % 2 === 0) {
            const prevX = (c - 1) * xSpacing;
            const prevWave1 = Math.sin((c - 1) * 0.18 + phase + r * 0.3) * 28;
            const prevWave2 = Math.cos((c - 1) * 0.09 - phase * 0.8 + r * 0.2) * 18;
            const prevY = baseY + (r - rows / 2) * zSpacing + prevWave1 + prevWave2;

            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.15})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
