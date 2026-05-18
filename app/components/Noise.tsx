"use client";

import { useRef, useEffect } from "react";

interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise = ({
  patternRefreshInterval = 2,
  patternAlpha = 15,
}: NoiseProps) => {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const canvasSize = 512;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const cacheSize = 24;
    const frameCache: ImageData[] = [];
    const alphaValue = patternAlpha & 0xff;
    const pixelCount = canvasSize * canvasSize;

    for (let f = 0; f < cacheSize; f++) {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < pixelCount; i++) {
        const value = (Math.random() * 255) | 0;
        buffer[i] = (alphaValue << 24) | (value << 16) | (value << 8) | value;
      }
      frameCache.push(imageData);
    }

    let frameCount = 0;
    let animationId: number;
    let paused = false;

    const onVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) loop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const loop = () => {
      if (paused) return;
      if (frameCount % patternRefreshInterval === 0) {
        const randomCacheIndex = (Math.random() * cacheSize) | 0;
        ctx.putImageData(frameCache[randomCacheIndex], 0, 0);
      }
      frameCount++;
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      aria-hidden="true"
      style={{
        imageRendering: "pixelated",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        willChange: "contents",
      }}
    />
  );
};

export default Noise;
