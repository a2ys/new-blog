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

    const canvasSize = 1024;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const cacheSize = 24;
    const frameCache: ImageData[] = [];

    for (let f = 0; f < cacheSize; f++) {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      const buffer = new Uint32Array(data.buffer);
      const alphaValue = patternAlpha & 0xff;

      for (let i = 0; i < buffer.length; i++) {
        const value = (Math.random() * 255) | 0;
        buffer[i] = (alphaValue << 24) | (value << 16) | (value << 8) | value;
      }
      frameCache.push(imageData);
    }

    let frameCount = 0;
    let animationId: number;

    const loop = () => {
      if (frameCount % patternRefreshInterval === 0) {
        const randomCacheIndex = Math.floor(Math.random() * cacheSize);
        ctx.putImageData(frameCache[randomCacheIndex], 0, 0);
      }
      frameCount++;
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="noise-overlay"
      ref={grainRef}
      style={{
        imageRendering: "pixelated",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default Noise;
