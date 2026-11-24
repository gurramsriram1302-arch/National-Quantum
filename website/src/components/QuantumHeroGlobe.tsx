"use client";

import React, { useEffect, useRef, useState } from "react";

interface QuantumHeroGlobeProps {
  size?: number;
  className?: string;
}

export default function QuantumHeroGlobe({
  size = 520,
  className = "",
}: QuantumHeroGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    const radius = size * 0.32; // Globe sphere radius

    // Rotation states
    // Globe rotates in direction (+Y)
    let globeAngle = 0;
    const globeSpeed = 0.007;

    // Rings rotate in OPPOSITE direction (-Y)
    let ringsAngle = 0;
    const ringsSpeed = -0.011; // Opposite sign!

    // Mouse drag interaction for globe
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let userTiltX = 0.2;
    let userTiltY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      userTiltY += dx * 0.005;
      userTiltX += dy * 0.005;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 3D Projection Helper with camera distance
    function project3D(x: number, y: number, z: number, rotYAngle: number, rotXAngle: number) {
      // 1. Rotate around X (tilt)
      const cosX = Math.cos(rotXAngle);
      const sinX = Math.sin(rotXAngle);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // 2. Rotate around Y (spin)
      const cosY = Math.cos(rotYAngle);
      const sinY = Math.sin(rotYAngle);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      // Perspective projection
      const cameraDist = 750;
      const fov = cameraDist / (cameraDist + z2);
      return {
        x: center + x2 * fov,
        y: center + y1 * fov,
        z: z2,
        scale: fov,
      };
    }

    // Generate fixed spherical constellation nodes for the Globe
    const nodeCount = 52;
    const globeNodes: { theta: number; phi: number; size: number; isCyan: boolean }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      globeNodes.push({
        theta: Math.acos(2 * (i / nodeCount) - 1), // Golden spiral/uniform distribution
        phi: (i * Math.PI * (3 - Math.sqrt(5))) % (Math.PI * 2),
        size: 1.5 + Math.random() * 1.8,
        isCyan: Math.random() > 0.45,
      });
    }

    // Setup 3 Orbital Rings with distinct 3D base tilts
    const rings = [
      {
        baseTiltX: 0.65,
        baseTiltZ: 0.25,
        radiusMul: 1.34,
        color: "rgba(139, 92, 246, ",
        strokeWidth: 1.4,
        qubitCount: 2,
        qubitSpeed: 0.8,
      },
      {
        baseTiltX: -0.52,
        baseTiltZ: -0.4,
        radiusMul: 1.46,
        color: "rgba(56, 189, 248, ",
        strokeWidth: 1.5,
        qubitCount: 2,
        qubitSpeed: -0.65,
      },
      {
        baseTiltX: 0.15,
        baseTiltZ: 0.75,
        radiusMul: 1.25,
        color: "rgba(192, 132, 252, ",
        strokeWidth: 1.2,
        qubitCount: 1,
        qubitSpeed: 0.95,
      },
    ];

    let time = 0;

    const render = () => {
      time += 0.02;

      // Increment rotation angles:
      // Globe rotates positive
      globeAngle += globeSpeed;
      // Rings rotate strictly in OPPOSITE direction (negative)
      ringsAngle += ringsSpeed;

      ctx.clearRect(0, 0, size, size);

      const globeRotY = globeAngle + userTiltY;
      const globeRotX = -0.3 + userTiltX;

      const ringsRotY = ringsAngle + userTiltY;
      const ringsRotX = -0.3 + userTiltX;

      // ----------------------------------------------------
      // 1. Ambient Background Glow
      // ----------------------------------------------------
      const bgGlow = ctx.createRadialGradient(center, center, 20, center, center, radius * 1.5);
      bgGlow.addColorStop(0, "rgba(56, 189, 248, 0.26)");
      bgGlow.addColorStop(0.35, "rgba(139, 92, 246, 0.2)");
      bgGlow.addColorStop(0.7, "rgba(10, 22, 50, 0.06)");
      bgGlow.addColorStop(1, "rgba(6, 12, 27, 0)");
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(center, center, radius * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // ----------------------------------------------------
      // 2. Draw Back-half of Orbital Rings (Rings rotating OPPOSITE)
      // ----------------------------------------------------
      const ringSteps = 72;
      const drawRingSegment = (rIdx: number, isBackHalf: boolean) => {
        const ring = rings[rIdx];
        const rRadius = radius * ring.radiusMul;

        for (let i = 0; i < ringSteps; i++) {
          const a1 = (i / ringSteps) * Math.PI * 2;
          const a2 = ((i + 1) / ringSteps) * Math.PI * 2;

          // Point 1 on ring in local coordinates
          const lx1 = rRadius * Math.cos(a1);
          const ly1 = rRadius * Math.sin(a1) * Math.sin(ring.baseTiltX);
          const lz1 = rRadius * Math.sin(a1) * Math.cos(ring.baseTiltX);

          // Point 2 on ring
          const lx2 = rRadius * Math.cos(a2);
          const ly2 = rRadius * Math.sin(a2) * Math.sin(ring.baseTiltX);
          const lz2 = rRadius * Math.sin(a2) * Math.cos(ring.baseTiltX);

          // Project with RINGS rotation angle (opposite of globe)
          const p1 = project3D(lx1, ly1, lz1, ringsRotY, ringsRotX);
          const p2 = project3D(lx2, ly2, lz2, ringsRotY, ringsRotX);

          const isSegmentBack = (p1.z + p2.z) / 2 < -5;

          if (isSegmentBack === isBackHalf) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = isSegmentBack ? 0.22 : 0.65;
            ctx.strokeStyle = `${ring.color}${alpha})`;
            ctx.lineWidth = ring.strokeWidth * (isSegmentBack ? 0.8 : 1.2);
            ctx.stroke();
          }
        }
      };

      // Draw back half of rings
      for (let i = 0; i < rings.length; i++) {
        drawRingSegment(i, true);
      }

      // ----------------------------------------------------
      // 3. Draw The Central Quantum Globe (Spherical Core)
      // ----------------------------------------------------
      // Glass sphere backdrop fill with luminous 3D shading
      const sphereShade = ctx.createRadialGradient(
        center - radius * 0.35,
        center - radius * 0.35,
        radius * 0.1,
        center,
        center,
        radius
      );
      sphereShade.addColorStop(0, "rgba(20, 45, 95, 0.75)");
      sphereShade.addColorStop(0.7, "rgba(8, 20, 45, 0.85)");
      sphereShade.addColorStop(1, "rgba(56, 189, 248, 0.35)");
      ctx.fillStyle = sphereShade;
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer rim Fresnel glow
      ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Latitude and Longitude Grid Lines rotating WITH GLOBE
      const latSteps = 60;
      const drawGlobeLatRing = (yFraction: number, strokeColor: string) => {
        const yPos = -radius * yFraction;
        const rVal = radius * Math.sqrt(Math.max(0, 1 - yFraction * yFraction));
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= latSteps; i++) {
          const a = (i / latSteps) * Math.PI * 2;
          const px = rVal * Math.cos(a);
          const pz = rVal * Math.sin(a);
          const p = project3D(px, yPos, pz, globeRotY, globeRotX);
          if (p.z > -radius * 0.7) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      };

      drawGlobeLatRing(0, "rgba(56, 189, 248, 0.35)"); // Equator
      drawGlobeLatRing(0.5, "rgba(139, 92, 246, 0.2)");
      drawGlobeLatRing(-0.5, "rgba(139, 92, 246, 0.2)");

      // Longitudinal lines rotating with globe
      const drawGlobeMeridian = (meridianAngle: number, color: string) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= latSteps; i++) {
          const a = (i / latSteps) * Math.PI * 2;
          const py = radius * Math.sin(a);
          const rL = radius * Math.cos(a);
          const px = rL * Math.cos(meridianAngle);
          const pz = rL * Math.sin(meridianAngle);
          const p = project3D(px, py, pz, globeRotY, globeRotX);
          if (p.z > -radius * 0.65) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      };

      drawGlobeMeridian(0, "rgba(56, 189, 248, 0.3)");
      drawGlobeMeridian(Math.PI / 2, "rgba(139, 92, 246, 0.25)");
      drawGlobeMeridian(Math.PI / 4, "rgba(56, 189, 248, 0.2)");
      drawGlobeMeridian(-Math.PI / 4, "rgba(192, 132, 252, 0.2)");

      // Constellation Network of Nodes on Globe
      const projectedGlobeNodes: { x: number; y: number; z: number; scale: number; isCyan: boolean; size: number }[] = [];

      for (const node of globeNodes) {
        const nx = radius * Math.sin(node.theta) * Math.cos(node.phi);
        const ny = radius * Math.cos(node.theta);
        const nz = radius * Math.sin(node.theta) * Math.sin(node.phi);

        // Project rotating WITH GLOBE (+Y)
        const p = project3D(nx, ny, nz, globeRotY, globeRotX);
        projectedGlobeNodes.push({
          ...p,
          isCyan: node.isCyan,
          size: node.size,
        });
      }

      // Connect proximate nodes with laser mesh lines
      for (let i = 0; i < projectedGlobeNodes.length; i++) {
        for (let j = i + 1; j < projectedGlobeNodes.length; j++) {
          const n1 = projectedGlobeNodes[i];
          const n2 = projectedGlobeNodes[j];
          if (n1.z > -radius * 0.5 && n2.z > -radius * 0.5) {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 52) {
              const alpha = (1 - d / 52) * 0.45 * Math.min(n1.scale, n2.scale);
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }
      }

      // Draw globe nodes
      for (const node of projectedGlobeNodes) {
        if (node.z > -radius * 0.6) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * node.scale, 0, Math.PI * 2);
          ctx.fillStyle = node.isCyan ? "#38bdf8" : "#c084fc";
          if (node.z > 0) {
            ctx.shadowColor = node.isCyan ? "#38bdf8" : "#a855f7";
            ctx.shadowBlur = 8;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Central Quantum Energy Core (Bright photon flare matching PPT)
      const core = project3D(0, 0, 0, globeRotY, globeRotX);
      const coreFlare = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 36);
      coreFlare.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      coreFlare.addColorStop(0.25, "rgba(56, 189, 248, 0.85)");
      coreFlare.addColorStop(0.65, "rgba(139, 92, 246, 0.35)");
      coreFlare.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = coreFlare;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 36, 0, Math.PI * 2);
      ctx.fill();

      // ----------------------------------------------------
      // 4. Draw Front-half of Orbital Rings (Rotating in OPPOSITE direction)
      // ----------------------------------------------------
      for (let i = 0; i < rings.length; i++) {
        drawRingSegment(i, false);
      }

      // ----------------------------------------------------
      // 5. Draw Orbiting Electron/Qubit Spheres on the Rings
      // ----------------------------------------------------
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i];
        const rRadius = radius * ring.radiusMul;

        for (let q = 0; q < ring.qubitCount; q++) {
          // Angle of qubit along the ring
          const qubitAngle = time * ring.qubitSpeed + (q * Math.PI * 2) / ring.qubitCount;

          const lx = rRadius * Math.cos(qubitAngle);
          const ly = rRadius * Math.sin(qubitAngle) * Math.sin(ring.baseTiltX);
          const lz = rRadius * Math.sin(qubitAngle) * Math.cos(ring.baseTiltX);

          // Project with RINGS rotation (OPPOSITE of globe)
          const qp = project3D(lx, ly, lz, ringsRotY, ringsRotX);

          // Qubit glowing sphere
          ctx.beginPath();
          const qSize = (4.5 + (qp.z > 0 ? 1.5 : 0)) * qp.scale;
          ctx.arc(qp.x, qp.y, qSize, 0, Math.PI * 2);
          ctx.fillStyle = qp.z > 0 ? "#ffffff" : "#c084fc";
          ctx.shadowColor = i % 2 === 0 ? "#8b5cf6" : "#38bdf8";
          ctx.shadowBlur = 16;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner colored core
          ctx.beginPath();
          ctx.arc(qp.x, qp.y, qSize * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? "#c084fc" : "#38bdf8";
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [size]);

  return (
    <div
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
      {isHovered && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[10px] font-mono tracking-wider text-cyan-300 bg-[#0a152d]/85 border border-cyan-500/30 rounded-full backdrop-blur pointer-events-none transition-opacity duration-200">
          DRAG TO TILT • COUNTER-ROTATING ORBITALS
        </div>
      )}
    </div>
  );
}
