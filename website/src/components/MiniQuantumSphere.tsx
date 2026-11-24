"use client";

import React, { useEffect, useRef } from "react";

export default function MiniQuantumSphere({ size = 160 }: { size?: number }) {
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

    const center = size / 2;
    const radius = size * 0.32;
    let time = 0;

    function project(x: number, y: number, z: number, rotY: number, rotX: number) {
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      const fov = 350 / (350 + z2);
      return { x: center + x2 * fov, y: center + y1 * fov, z: z2, scale: fov };
    }

    // Nodes on sphere
    const nodes = Array.from({ length: 28 }).map((_, i) => ({
      theta: Math.acos(2 * (i / 28) - 1),
      phi: i * 2.399,
    }));

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, size, size);

      const rotY = time * 0.6;
      const rotX = -0.3;

      // Glow behind sphere
      const bg = ctx.createRadialGradient(center, center, 0, center, center, radius * 1.5);
      bg.addColorStop(0, "rgba(56, 189, 248, 0.3)");
      bg.addColorStop(0.5, "rgba(139, 92, 246, 0.2)");
      bg.addColorStop(1, "rgba(6, 12, 27, 0)");
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(center, center, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Sphere base circle
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Orbital Ring 1
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.1) {
        const px = radius * 1.4 * Math.cos(a);
        const py = radius * 1.4 * Math.sin(a) * Math.sin(0.7);
        const pz = radius * 1.4 * Math.sin(a) * Math.cos(0.7);
        const p = project(px, py, pz, -time * 0.8, rotX);
        if (a === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Orbiting Qubit on Ring 1
      const qx = radius * 1.4 * Math.cos(time * 1.2);
      const qy = radius * 1.4 * Math.sin(time * 1.2) * Math.sin(0.7);
      const qz = radius * 1.4 * Math.sin(time * 1.2) * Math.cos(0.7);
      const qp = project(qx, qy, qz, -time * 0.8, rotX);
      ctx.beginPath();
      ctx.arc(qp.x, qp.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Projected nodes and connecting links
      const projNodes = nodes.map((n) => {
        const nx = radius * Math.sin(n.theta) * Math.cos(n.phi);
        const ny = radius * Math.cos(n.theta);
        const nz = radius * Math.sin(n.theta) * Math.sin(n.phi);
        return project(nx, ny, nz, rotY, rotX);
      });

      for (let i = 0; i < projNodes.length; i++) {
        for (let j = i + 1; j < projNodes.length; j++) {
          const n1 = projNodes[i];
          const n2 = projNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 26 && n1.z > -10 && n2.z > -10) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 * (1 - dist / 26)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      projNodes.forEach((n) => {
        if (n.z > -radius * 0.5) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2 * n.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.fill();
        }
      });

      // Core flare
      ctx.beginPath();
      ctx.arc(center, center, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

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
