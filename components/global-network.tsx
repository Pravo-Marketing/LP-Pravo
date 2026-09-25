"use client";

import { useEffect, useRef } from "react";

type Point = { lat: number; lon: number };

const hubs: Point[] = [
  { lat: -23.5, lon: -46.6 },
  { lat: 19.4, lon: -99.1 },
  { lat: 4.7, lon: -74.1 },
  { lat: -34.6, lon: -58.4 },
  { lat: 25.8, lon: -80.2 },
  { lat: 40.4, lon: -3.7 },
];

const points: Point[] = Array.from({ length: 210 }, (_, index) => ({
  lat: -72 + ((index * 37) % 145),
  lon: -180 + ((index * 83) % 360),
}));

function project(point: Point, rotation: number, radius: number) {
  const lat = (point.lat * Math.PI) / 180;
  const lon = ((point.lon + rotation) * Math.PI) / 180;
  const x = Math.cos(lat) * Math.sin(lon);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon);
  return { x: x * radius, y: -y * radius, z };
}

export default function GlobalNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation = 0;
    let rotation = 27;
    let lastTime = performance.now();

    const render = (time = performance.now()) => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.39;

      const glow = context.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.35,
        radius * 0.05,
        centerX,
        centerY,
        radius,
      );
      glow.addColorStop(0, "rgba(245,245,247,.18)");
      glow.addColorStop(0.48, "rgba(44,44,46,.76)");
      glow.addColorStop(1, "rgba(5,5,5,.94)");
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fillStyle = glow;
      context.fill();
      context.strokeStyle = "rgba(255,255,255,.15)";
      context.lineWidth = 1;
      context.stroke();

      const source = project(hubs[0], rotation, radius);
      hubs.slice(1).forEach((hub, index) => {
        const target = project(hub, rotation, radius);
        if (source.z < -0.15 || target.z < -0.15) return;
        const sx = centerX + source.x;
        const sy = centerY + source.y;
        const tx = centerX + target.x;
        const ty = centerY + target.y;
        const midpointX = (sx + tx) / 2;
        const midpointY = (sy + ty) / 2 - radius * (0.22 + index * 0.025);
        context.beginPath();
        context.moveTo(sx, sy);
        context.quadraticCurveTo(midpointX, midpointY, tx, ty);
        context.strokeStyle = `rgba(210,210,215,${0.32 + index * 0.06})`;
        context.lineWidth = 1.2;
        context.stroke();
      });

      points.forEach((point, index) => {
        const projected = project(point, rotation, radius);
        if (projected.z < 0) return;
        const alpha = 0.14 + projected.z * 0.65;
        const size = index % 13 === 0 ? 2.2 : 1.1;
        context.beginPath();
        context.arc(centerX + projected.x, centerY + projected.y, size, 0, Math.PI * 2);
        context.fillStyle = `rgba(245,245,247,${alpha})`;
        context.fill();
      });

      hubs.forEach((hub, index) => {
        const projected = project(hub, rotation, radius);
        if (projected.z < 0) return;
        context.beginPath();
        context.arc(centerX + projected.x, centerY + projected.y, index === 0 ? 5 : 3, 0, Math.PI * 2);
        context.fillStyle = "#f5f5f7";
        context.shadowColor = "#d2d2d7";
        context.shadowBlur = 14;
        context.fill();
        context.shadowBlur = 0;
      });

      if (!reduced.matches) {
        rotation += ((time - lastTime) / 1000) * 2.6;
        lastTime = time;
        animation = requestAnimationFrame(render);
      }
    };

    render();
    const refresh = () => {
      cancelAnimationFrame(animation);
      render();
    };
    window.addEventListener("resize", refresh);
    reduced.addEventListener("change", refresh);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", refresh);
      reduced.removeEventListener("change", refresh);
    };
  }, []);

  return (
    <div className="global-network">
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="network-label network-brazil"><i /> Brasil</span>
      <span className="network-label network-latam"><i /> Latam</span>
      <span className="network-label network-global"><i /> Global</span>
      <div className="network-status"><i /> Operação sem fronteiras</div>
    </div>
  );
}
