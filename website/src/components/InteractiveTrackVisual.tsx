"use client";

import React, { useEffect, useRef } from "react";

// ============================================================================
// 1. QUANTUM ALGORITHMS & COMPLEXITY: Dots connect when hovered!
// ============================================================================
export function AlgorithmLatticeVisual({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 120;
    const h = 120;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Hypercube / 3D lattice vertices
    const rawNodes = [
      { x: 35, y: 35, z: -20 },
      { x: 85, y: 35, z: -20 },
      { x: 85, y: 85, z: -20 },
      { x: 35, y: 85, z: -20 },
      { x: 22, y: 22, z: 20 },
      { x: 98, y: 22, z: 20 },
      { x: 98, y: 98, z: 20 },
      { x: 22, y: 98, z: 20 },
      { x: 60, y: 60, z: 0 }, // Central oracle node
    ];

    // Edges defining the quantum hypercube
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // inner
      [4, 5], [5, 6], [6, 7], [7, 4], // outer
      [0, 4], [1, 5], [2, 6], [3, 7], // connectors
      [8, 0], [8, 1], [8, 2], [8, 3], // oracle connections
    ];

    let connectProgress = 0; // 0 = unconnected, 1 = fully connected
    let time = 0;

    const render = () => {
      time += 0.03;
      // Smoothly animate connection progress based on hover
      const targetProgress = isHovered ? 1 : 0.08;
      connectProgress += (targetProgress - connectProgress) * 0.12;

      ctx.clearRect(0, 0, w, h);

      // Rotate nodes subtly in 3D
      const rotY = time * 0.4;
      const rotX = Math.sin(time * 0.3) * 0.2;

      const projected = rawNodes.map((n) => {
        const dx = n.x - 60;
        const dy = n.y - 60;
        const dz = n.z;

        // Rotate Y
        const x1 = dx * Math.cos(rotY) + dz * Math.sin(rotY);
        const z1 = -dx * Math.sin(rotY) + dz * Math.cos(rotY);

        // Rotate X
        const y2 = dy * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = dy * Math.sin(rotX) + z1 * Math.cos(rotX);

        const fov = 160 / (160 + z2);
        return {
          x: 60 + x1 * fov,
          y: 60 + y2 * fov,
          z: z2,
          scale: fov,
        };
      });

      // 1. Draw Connecting Laser Lines (progressively drawn when hovered!)
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];

        if (connectProgress > 0.05) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          // Interpolate line end by connectProgress
          const curX = p1.x + (p2.x - p1.x) * connectProgress;
          const curY = p1.y + (p2.y - p1.y) * connectProgress;
          ctx.lineTo(curX, curY);

          ctx.strokeStyle = isHovered
            ? `rgba(56, 189, 248, ${0.4 + connectProgress * 0.55})`
            : "rgba(56, 189, 248, 0.12)";
          ctx.lineWidth = isHovered ? 1.8 : 0.8;
          if (isHovered) {
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 8;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Pulse signal traveling along edges when hovered
        if (isHovered && connectProgress > 0.8) {
          const pulseT = (time * 1.5 + (i + j) * 0.2) % 1;
          const px = p1.x + (p2.x - p1.x) * pulseT;
          const py = p1.y + (p2.y - p1.y) * pulseT;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 2. Draw Dots / Vertices
      projected.forEach((p, idx) => {
        const isCenter = idx === 8;
        const radius = (isCenter ? 4 : 3) * p.scale * (isHovered ? 1.25 : 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        if (isHovered) {
          ctx.fillStyle = isCenter ? "#ffffff" : "#38bdf8";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = isCenter ? "#38bdf8" : "#818cf8";
          ctx.shadowColor = "#818cf8";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ring aura around vertices on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: 120, height: 120 }} className="block" />
    </div>
  );
}

// ============================================================================
// 2. QUANTUM HARDWARE: Chip comes OUT in 3D when hovered!
// ============================================================================
export function HardwareChipVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center perspective-[600px] select-none">
      {/* Base Substrate / Socket (Stays at base) */}
      <div
        className={`absolute w-20 h-20 rounded-2xl border transition-all duration-500 flex items-center justify-center ${
          isHovered
            ? "border-cyan-400/80 bg-cyan-950/40 shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            : "border-purple-500/30 bg-[#0a152d]/60"
        }`}
      >
        {/* Radiating Substrate Circuit Pins */}
        <div className="absolute -top-2 left-3 right-3 flex justify-between">
          <span className={`w-1 h-2 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-1 h-2 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-1 h-2 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
        </div>
        <div className="absolute -bottom-2 left-3 right-3 flex justify-between">
          <span className={`w-1 h-2 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-1 h-2 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-1 h-2 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
        </div>
        <div className="absolute -left-2 top-3 bottom-3 flex flex-col justify-between">
          <span className={`w-2 h-1 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-2 h-1 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-2 h-1 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
        </div>
        <div className="absolute -right-2 top-3 bottom-3 flex flex-col justify-between">
          <span className={`w-2 h-1 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-2 h-1 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
          <span className={`w-2 h-1 rounded-full transition-colors ${isHovered ? "bg-cyan-300 shadow-[0_0_6px_#38bdf8]" : "bg-purple-500/50"}`} />
        </div>
      </div>

      {/* The Quantum Chip [Q] that COMES OUT in 3D! */}
      <div
        className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 transform-gpu ${
          isHovered
            ? "-translate-y-3.5 translate-z-10 scale-125 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] border-2 border-cyan-300 shadow-[0_15px_35px_rgba(56,189,248,0.6),0_0_20px_#8b5cf6]"
            : "translate-y-0 scale-100 bg-[#0e172e] border border-purple-400/50 shadow-md"
        }`}
      >
        {/* Holographic light beams connecting socket to emerging chip */}
        {isHovered && (
          <div className="absolute -inset-2 rounded-2xl bg-cyan-400/10 blur-sm pointer-events-none animate-pulse" />
        )}

        <span
          className={`font-mono font-black text-2xl transition-all duration-300 ${
            isHovered
              ? "text-white drop-shadow-[0_0_12px_#38bdf8] scale-110"
              : "text-purple-300"
          }`}
        >
          Q
        </span>

        {/* Small corner micro-diodes */}
        <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_#38bdf8]" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_#38bdf8]" />
        <span className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_4px_#c084fc]" />
        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_4px_#c084fc]" />
      </div>

      {/* Optical holographic laser rings projected underneath as chip floats */}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full border border-cyan-400/40 animate-ping opacity-75" />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. QUANTUM APPLICATIONS: Quantums erupt & come OUT of the layers!
// ============================================================================
export function QuantumLayersVisual({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 120;
    const h = 120;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Quantum particles that erupt and float UP from the layers
    const particleCount = 14;
    const particles = Array.from({ length: particleCount }).map((_, i) => ({
      x: 60 + (Math.random() - 0.5) * 45,
      y: 75 + Math.random() * 20,
      baseY: 75 + Math.random() * 20,
      speedY: 0.6 + Math.random() * 0.9,
      size: 1.8 + Math.random() * 2.2,
      alpha: Math.random() * 0.8 + 0.2,
      isCyan: i % 2 === 0,
      floatPhase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, w, h);

      // Layer planes: 3 stacked isometric rhombuses
      const drawLayer = (centerY: number, color: string, stroke: string, glow: boolean) => {
        ctx.beginPath();
        ctx.moveTo(60, centerY - 14); // top
        ctx.lineTo(96, centerY);      // right
        ctx.lineTo(60, centerY + 14); // bottom
        ctx.lineTo(24, centerY);      // left
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();

        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1.6;
        if (glow) {
          ctx.shadowColor = stroke;
          ctx.shadowBlur = 10;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      };

      // Draw 3 layers from bottom to top
      // Bottom layer (layer 3)
      drawLayer(90, "rgba(139, 92, 246, 0.25)", "#c084fc", isHovered);
      // Middle layer (layer 2)
      drawLayer(75, "rgba(99, 102, 241, 0.35)", "#818cf8", isHovered);
      // Top layer (layer 1)
      drawLayer(60, "rgba(56, 189, 248, 0.45)", "#38bdf8", isHovered);

      // Particles (Quantums) coming OUT of the layer!
      for (const p of particles) {
        if (isHovered) {
          // Floating UPWARDS out of the crystal layers
          p.y -= p.speedY;
          p.x += Math.sin(time * 2 + p.floatPhase) * 0.5;

          // If reached top, reset to layer surface
          if (p.y < 15) {
            p.y = p.baseY;
            p.x = 60 + (Math.random() - 0.5) * 45;
          }
        } else {
          // Stay anchored on the layer surfaces
          p.y += (p.baseY - p.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isCyan ? "#38bdf8" : "#e879f9";
        if (isHovered) {
          ctx.shadowColor = p.isCyan ? "#38bdf8" : "#c084fc";
          ctx.shadowBlur = 12;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: 120, height: 120 }} className="block" />
    </div>
  );
}

// ============================================================================
// 4. QUANTUM MACHINE LEARNING: Neural Network comes OUT & pulses!
// ============================================================================
export function NeuralNetworkVisual({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 120;
    const h = 120;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Brain/Neural network synaptic nodes
    const baseNodes = [
      { x: 38, y: 40 },
      { x: 60, y: 32 },
      { x: 82, y: 40 },
      { x: 26, y: 60 },
      { x: 48, y: 56 },
      { x: 72, y: 56 },
      { x: 94, y: 60 },
      { x: 42, y: 78 },
      { x: 60, y: 88 },
      { x: 78, y: 78 },
      // Emergent nodes that project OUTWARD on hover
      { x: 14, y: 42, emerge: true },
      { x: 106, y: 42, emerge: true },
      { x: 60, y: 14, emerge: true },
      { x: 24, y: 94, emerge: true },
      { x: 96, y: 94, emerge: true },
    ];

    const connections = [
      [0, 1], [1, 2], [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
      [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [7, 8], [8, 9],
      // Emerging axon bridges on hover
      [0, 10], [2, 11], [1, 12], [7, 13], [9, 14],
    ];

    let expansion = 0;
    let time = 0;

    const render = () => {
      time += 0.04;
      const targetExp = isHovered ? 1 : 0;
      expansion += (targetExp - expansion) * 0.12;

      ctx.clearRect(0, 0, w, h);

      // Compute expanded positions
      const currentNodes = baseNodes.map((n) => {
        const dx = n.x - 60;
        const dy = n.y - 60;
        const mul = n.emerge ? 0.3 + expansion * 0.7 : 1 + expansion * 0.15;
        return {
          x: 60 + dx * mul,
          y: 60 + dy * mul,
          emerge: n.emerge,
        };
      });

      // 1. Draw Synaptic Axon Connections
      for (const [i, j] of connections) {
        const n1 = currentNodes[i];
        const n2 = currentNodes[j];
        const isEmergent = n1.emerge || n2.emerge;

        if (!isEmergent || expansion > 0.1) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          const alpha = isEmergent ? expansion * 0.7 : (isHovered ? 0.6 : 0.25);
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = isHovered ? 1.5 : 0.9;
          if (isHovered) {
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 6;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Action potential firing pulses
          if (isHovered) {
            const pulseT = (time * 1.8 + (i * 3 + j) * 0.3) % 1;
            const px = n1.x + (n2.x - n1.x) * pulseT;
            const py = n1.y + (n2.y - n1.y) * pulseT;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 2. Draw Synaptic Nodes
      currentNodes.forEach((n, idx) => {
        if (!n.emerge || expansion > 0.1) {
          const r = (n.emerge ? 2.5 : 3.5) * (isHovered ? 1.3 : 1);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? "#38bdf8" : "#c084fc";
          if (isHovered) {
            ctx.shadowColor = idx % 2 === 0 ? "#38bdf8" : "#a855f7";
            ctx.shadowBlur = 10;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: 120, height: 120 }} className="block" />
    </div>
  );
}

// ============================================================================
// 5. QUANTUM COMMUNICATION: Entangled Qubits vibrate with quantum bridge!
// ============================================================================
export function EntangledQubitsVisual({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 120;
    const h = 120;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    let time = 0;

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, w, h);

      const q1X = 34;
      const q2X = 86;
      const centerY = 60;

      // 1. Entanglement Wave Bridge between Q1 and Q2
      ctx.beginPath();
      const waveFreq = isHovered ? 8 : 4;
      const waveAmp = isHovered ? 7 : 3;
      for (let x = q1X; x <= q2X; x++) {
        const tVal = (x - q1X) / (q2X - q1X);
        const y = centerY + Math.sin(tVal * Math.PI * waveFreq + (isHovered ? time * 8 : time * 3)) * waveAmp * Math.sin(tVal * Math.PI);
        if (x === q1X) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = isHovered ? 2.5 : 1.5;
      if (isHovered) {
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 12;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 2. Draw Qubit 1 (Left: Cyan)
      ctx.beginPath();
      ctx.arc(q1X, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      if (isHovered) {
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 16;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Core 1
      ctx.beginPath();
      ctx.arc(q1X, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // 3. Draw Qubit 2 (Right: Purple)
      ctx.beginPath();
      ctx.arc(q2X, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(192, 132, 252, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "#c084fc";
      ctx.lineWidth = 2;
      if (isHovered) {
        ctx.shadowColor = "#c084fc";
        ctx.shadowBlur = 16;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Core 2
      ctx.beginPath();
      ctx.arc(q2X, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // 4. Orbiting Spin Particles around each qubit (counter-rotating entangled spins)
      const spinAngle1 = time * (isHovered ? 6 : 2.5);
      const spinAngle2 = -time * (isHovered ? 6 : 2.5); // Opposite spin!

      // Spin 1
      const s1x = q1X + Math.cos(spinAngle1) * 20;
      const s1y = centerY + Math.sin(spinAngle1) * 10;
      ctx.beginPath();
      ctx.arc(s1x, s1y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Spin 2
      const s2x = q2X + Math.cos(spinAngle2) * 20;
      const s2y = centerY + Math.sin(spinAngle2) * 10;
      ctx.beginPath();
      ctx.arc(s2x, s2y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#c084fc";
      ctx.shadowColor = "#c084fc";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Photon packet flying across bridge on hover
      if (isHovered) {
        const photonT = (time * 3) % 1;
        const px = q1X + (q2X - q1X) * photonT;
        const py = centerY;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: 120, height: 120 }} className="block" />
    </div>
  );
}
