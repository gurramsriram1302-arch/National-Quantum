"use client";

import React, { useEffect, useRef, useState } from "react";

interface BlochSphere3DProps {
  interactive?: boolean;
  size?: number;
  className?: string;
  showLabels?: boolean;
  variant?: "bloch" | "quantum-cluster";
}

export default function BlochSphere3D({
  interactive = true,
  size = 480,
  className = "",
  showLabels = true,
  variant = "bloch",
}: BlochSphere3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotX = -0.32;
    let rotY = 0.55;
    let targetRotX = rotX;
    let targetRotY = rotY;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let time = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const radius = size * 0.32;
    const center = size / 2;

    // Mouse drag handlers
    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 3D Point projection helper
    function project(x: number, y: number, z: number) {
      // Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      // Perspective projection
      const cameraDist = 800;
      const fov = cameraDist / (cameraDist + z2);
      return {
        x: center + x2 * fov,
        y: center + y1 * fov,
        z: z2,
        scale: fov,
      };
    }

    const ringSteps = 64;

    const render = () => {
      time += 0.018;

      if (!isDragging) {
        targetRotY += 0.007; // Smooth continuous rotation of the globe!
      }
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      ctx.clearRect(0, 0, size, size);

      // Radial background glow behind the sphere
      const bgGlow = ctx.createRadialGradient(center, center, 10, center, center, radius * 1.45);
      bgGlow.addColorStop(0, "rgba(56, 189, 248, 0.25)");
      bgGlow.addColorStop(0.35, "rgba(139, 92, 246, 0.2)");
      bgGlow.addColorStop(0.8, "rgba(10, 20, 45, 0.05)");
      bgGlow.addColorStop(1, "rgba(6, 12, 27, 0)");
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(center, center, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // ----------------------------------------------------
      // 0. Floor Base Plate (Concentric glowing radar rings under the globe from Image 2!)
      // ----------------------------------------------------
      const floorY = radius * 1.35;
      const drawFloorRing = (fRadius: number, color: string, isDashed = false) => {
        ctx.beginPath();
        if (isDashed) ctx.setLineDash([4, 6]);
        else ctx.setLineDash([]);
        let first = true;
        for (let i = 0; i <= ringSteps; i++) {
          const a = (i / ringSteps) * Math.PI * 2;
          const px = fRadius * Math.cos(a);
          const pz = fRadius * Math.sin(a);
          const p = project(px, floorY, pz);
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.setLineDash([]);
      };

      drawFloorRing(radius * 1.2, "rgba(56, 189, 248, 0.4)");
      drawFloorRing(radius * 0.8, "rgba(139, 92, 246, 0.35)", true);
      drawFloorRing(radius * 0.4, "rgba(56, 189, 248, 0.3)");

      // Radial ticks on floor ring
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + rotY * 0.5;
        const p1 = project(radius * 1.05 * Math.cos(a), floorY, radius * 1.05 * Math.sin(a));
        const p2 = project(radius * 1.25 * Math.cos(a), floorY, radius * 1.25 * Math.sin(a));
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ----------------------------------------------------
      // 1. Globe Wireframe: Equator and Latitude Rings
      // ----------------------------------------------------
      const drawRing = (yPos: number, rVal: number, strokeColor: string, isDashed = false) => {
        ctx.beginPath();
        if (isDashed) ctx.setLineDash([4, 6]);
        else ctx.setLineDash([]);
        let first = true;
        for (let i = 0; i <= ringSteps; i++) {
          const angle = (i / ringSteps) * Math.PI * 2;
          const px = rVal * Math.cos(angle);
          const pz = rVal * Math.sin(angle);
          const p = project(px, yPos, pz);
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.setLineDash([]);
      };

      // Equator
      drawRing(0, radius, "rgba(56, 189, 248, 0.5)");
      // Upper / Lower Latitudes
      drawRing(-radius * 0.5, radius * Math.cos(Math.asin(0.5)), "rgba(139, 92, 246, 0.3)");
      drawRing(radius * 0.5, radius * Math.cos(Math.asin(0.5)), "rgba(139, 92, 246, 0.3)");

      // Longitudinal Circles (Meridians)
      const drawMeridian = (rotAngle: number, color: string) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= ringSteps; i++) {
          const angle = (i / ringSteps) * Math.PI * 2;
          const py = radius * Math.sin(angle);
          const rLocal = radius * Math.cos(angle);
          const px = rLocal * Math.cos(rotAngle);
          const pz = rLocal * Math.sin(rotAngle);
          const p = project(px, py, pz);
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      drawMeridian(0, "rgba(56, 189, 248, 0.35)");
      drawMeridian(Math.PI / 2, "rgba(139, 92, 246, 0.35)");
      drawMeridian(Math.PI / 4, "rgba(168, 85, 247, 0.25)");
      drawMeridian(-Math.PI / 4, "rgba(56, 189, 248, 0.25)");

      // ----------------------------------------------------
      // 2. Coordinate Axes (Z-axis is vertical: |0> at top, |1> at bottom)
      // ----------------------------------------------------
      const zTop = project(0, -radius * 1.3, 0);
      const zBottom = project(0, radius * 1.3, 0);
      const xLeft = project(-radius * 1.15, 0, 0);
      const xRight = project(radius * 1.15, 0, 0);
      const yBack = project(0, 0, -radius * 1.15);
      const yFront = project(0, 0, radius * 1.15);

      // Z axis
      ctx.beginPath();
      ctx.moveTo(zBottom.x, zBottom.y);
      ctx.lineTo(zTop.x, zTop.y);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // X and Y axes (subtle dashed)
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(xLeft.x, xLeft.y);
      ctx.lineTo(xRight.x, xRight.y);
      ctx.moveTo(yBack.x, yBack.y);
      ctx.lineTo(yFront.x, yFront.y);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // ----------------------------------------------------
      // 3. Animated State Vector |ψ⟩ = α|0⟩ + β|1⟩ (pointing in superposition)
      // ----------------------------------------------------
      const stateTheta = Math.PI * 0.33 + Math.sin(time * 0.8) * 0.06;
      const statePhi = Math.PI * 0.28 + Math.cos(time * 0.6) * 0.08;

      const sx = radius * Math.sin(stateTheta) * Math.cos(statePhi);
      const sy = -radius * Math.cos(stateTheta); // Negative Y is up towards |0>
      const sz = radius * Math.sin(stateTheta) * Math.sin(statePhi);

      const stateProj = project(sx, sy, sz);
      const centerProj = project(0, 0, 0);

      // State vector line with bright cyan/magenta gradient glow
      ctx.beginPath();
      ctx.moveTo(centerProj.x, centerProj.y);
      ctx.lineTo(stateProj.x, stateProj.y);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3.2;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // State arrow head / vector tip
      ctx.beginPath();
      ctx.arc(stateProj.x, stateProj.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;

      // ----------------------------------------------------
      // 4. Outer Orbital Ring with Qubit Particles
      // ----------------------------------------------------
      const drawOrbitalRing = (tiltX: number, orbitRadius: number, ringColor: string, particleSpeed: number) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= ringSteps; i++) {
          const a = (i / ringSteps) * Math.PI * 2;
          const ox = orbitRadius * Math.cos(a);
          const oy = orbitRadius * Math.sin(a) * Math.sin(tiltX);
          const oz = orbitRadius * Math.sin(a) * Math.cos(tiltX);
          const p = project(ox, oy, oz);
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Orbiting qubit particle
        const orbAngle = time * particleSpeed;
        const px = orbitRadius * Math.cos(orbAngle);
        const py = orbitRadius * Math.sin(orbAngle) * Math.sin(tiltX);
        const pz = orbitRadius * Math.sin(orbAngle) * Math.cos(tiltX);
        const particleProj = project(px, py, pz);

        ctx.beginPath();
        ctx.arc(particleProj.x, particleProj.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      drawOrbitalRing(0.65, radius * 1.35, "rgba(139, 92, 246, 0.45)", 0.9);
      drawOrbitalRing(-0.55, radius * 1.45, "rgba(56, 189, 248, 0.4)", -0.7);

      // Central Quantum Energy Core
      const core = project(0, 0, 0);
      const coreGradient = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 28);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      coreGradient.addColorStop(0.3, "rgba(56, 189, 248, 0.8)");
      coreGradient.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
      coreGradient.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 28, 0, Math.PI * 2);
      ctx.fill();

      // ----------------------------------------------------
      // 5. Labels |0⟩ and |1⟩ on the poles
      // ----------------------------------------------------
      if (showLabels) {
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Pole |0>
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.fillText("|0⟩", zTop.x, zTop.y - 14);

        // Pole |1>
        ctx.fillStyle = "#c084fc";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 10;
        ctx.fillText("|1⟩", zBottom.x, zBottom.y + 14);
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvasEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [size, interactive, showLabels, variant]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="block"
      />
      {interactive && isHovered && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] font-mono tracking-wider text-cyan-300 bg-[#0a152d]/80 border border-cyan-500/30 rounded-full backdrop-blur pointer-events-none transition-opacity duration-200">
          DRAG TO ROTATE BLOCH SPHERE
        </div>
      )}
    </div>
  );
}
