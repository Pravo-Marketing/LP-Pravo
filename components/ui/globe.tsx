"use client";

// Adapted from Magic UI's Globe component (MIT), powered by COBE.
import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.24,
  dark: 0,
  diffuse: 0.55,
  mapSamples: 16000,
  mapBrightness: 1.35,
  baseColor: [0.96, 0.96, 0.97],
  markerColor: [0.08, 0.08, 0.09],
  glowColor: [1, 1, 1],
  markers: [
    { location: [-23.5505, -46.6333], size: 0.11 },
    { location: [19.4326, -99.1332], size: 0.08 },
    { location: [4.711, -74.0721], size: 0.07 },
    { location: [-34.6037, -58.3816], size: 0.07 },
    { location: [-12.0464, -77.0428], size: 0.05 },
    { location: [40.7128, -74.006], size: 0.07 },
    { location: [40.4168, -3.7038], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rotation.set(rotation.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (pointerInteracting.current === null) phiRef.current += 0.0045;
        state.phi = phiRef.current + smoothRotation.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, smoothRotation]);

  return (
    <div className={`magic-globe${className ? ` ${className}` : ""}`}>
      <canvas
        ref={canvasRef}
        aria-label="Globo interativo representando atuação internacional"
        onPointerDown={(event) => updatePointerInteraction(event.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(event) => updateMovement(event.clientX)}
        onTouchMove={(event) => event.touches[0] && updateMovement(event.touches[0].clientX)}
      />
    </div>
  );
}
