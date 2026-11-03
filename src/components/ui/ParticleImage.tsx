"use client";

import { useEffect, useRef } from "react";

/**
 * Image → interactive particle field.
 *
 * Re-implementation of the physics yeswearemad.com uses for its hero
 * (react-particle-image, homepage config): every opaque pixel becomes a
 * particle that is spring-attached to its home position, with friction,
 * random "entropy" jitter and a mouse "disturbance" force that blasts
 * nearby particles away. Particles burst out of the centre on load.
 *
 * Tuned to their values: mass 40, friction 0.45, entropy 25, repel 10,
 * 30 fps physics, mouse force lasting 100 ms per move.
 */
type Props = {
  src: string;
  /** Rendered size of the source image inside the canvas (CSS px). */
  imageWidth: number;
  imageHeight: number;
  /** Canvas size (CSS px). Extra room lets particles fly outside the image. */
  width: number;
  height: number;
  maxParticles?: number;
  radius?: number;
  repelForce?: number;
  entropy?: number;
  friction?: number;
  mass?: number;
  className?: string;
};

type Force = { x: number; y: number; until: number };

export default function ParticleImage({
  src,
  imageWidth,
  imageHeight,
  width,
  height,
  maxParticles = 6000,
  radius = 0.8,
  repelForce = 10,
  entropy = 25,
  friction = 0.45,
  mass = 40,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let n = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let hx = new Float32Array(0);
    let hy = new Float32Array(0);
    let colorIdx = new Uint16Array(0);
    let colors: string[] = [];

    const forces: Force[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let born = 0;
    let last = 0;
    let acc = 0;
    const STEP = 1000 / 30;

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    const build = () => {
      const off = document.createElement("canvas");
      // Sample at the rendered size so one pixel ≈ one particle slot.
      off.width = Math.round(imageWidth);
      off.height = Math.round(imageHeight);
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, off.width, off.height);
      const data = octx.getImageData(0, 0, off.width, off.height).data;

      const candidates: number[] = [];
      for (let i = 0; i < off.width * off.height; i++) {
        if (data[i * 4 + 3] > 60) candidates.push(i);
      }
      // Fisher–Yates, then cap
      for (let i = candidates.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }
      n = Math.min(maxParticles, candidates.length);
      px = new Float32Array(n);
      py = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      colorIdx = new Uint16Array(n);

      const colorMap = new Map<string, number>();
      colors = [];
      const q = (v: number) => Math.min(255, Math.round(v / 24) * 24);
      const ox = (width - off.width) / 2;
      const oy = (height - off.height) / 2;

      for (let k = 0; k < n; k++) {
        const i = candidates[k];
        const x = i % off.width;
        const y = (i / off.width) | 0;
        hx[k] = ox + x;
        hy[k] = oy + y;
        // burst from the centre
        px[k] = width / 2 + (Math.random() - 0.5) * 4;
        py[k] = height / 2 + (Math.random() - 0.5) * 4;
        const a = data[i * 4 + 3] / 255;
        const key = `rgba(${q(data[i * 4])},${q(data[i * 4 + 1])},${q(data[i * 4 + 2])},${(Math.round(a * 5) / 5).toFixed(1)})`;
        let ci = colorMap.get(key);
        if (ci === undefined) {
          ci = colors.length;
          colors.push(key);
          colorMap.set(key, ci);
        }
        colorIdx[k] = ci;
      }

      if (reduced) {
        px.set(hx);
        py.set(hy);
      }
      born = performance.now();
      start();
    };

    const physics = (now: number) => {
      const invMass = 1 / mass;
      const active = forces.filter((f) => f.until > now);
      forces.length = 0;
      forces.push(...active);

      for (let k = 0; k < n; k++) {
        // spring towards home ("blackHole" force)
        let ax = hx[k] - px[k];
        let ay = hy[k] - py[k];
        // friction
        ax += -vx[k] * friction * mass;
        ay += -vy[k] * friction * mass;
        // entropy
        ax += (Math.random() - 0.5) * entropy;
        ay += (Math.random() - 0.5) * entropy;
        // mouse disturbance (same falloff as the original, quirks included)
        for (let f = 0; f < active.length; f++) {
          const dx = px[k] - active[f].x;
          const dy = py[k] - active[f].y;
          const mag = Math.sqrt(dx * dx + dy * dy);
          const div = (12 ^ (mag | 0)) / (repelForce + 0.001) + 0.01;
          ax += dx / div;
          ay += dy / div;
        }
        px[k] += vx[k];
        py[k] += vy[k];
        vx[k] += ax * invMass;
        vy[k] += ay * invMass;
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const grow = reduced ? 1 : Math.min(1, (now - born) / 1200);
      const r = radius * (1 - Math.pow(1 - grow, 3));
      const size = r * 2;
      // batch by colour
      const buckets: number[][] = colors.map(() => []);
      for (let k = 0; k < n; k++) buckets[colorIdx[k]].push(k);
      for (let c = 0; c < colors.length; c++) {
        const b = buckets[c];
        if (!b.length) continue;
        ctx.fillStyle = colors[c];
        ctx.beginPath();
        for (let j = 0; j < b.length; j++) {
          const k = b[j];
          ctx.rect(px[k] - r, py[k] - r, size, size);
        }
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      if (!last) last = now;
      acc += Math.min(now - last, 250);
      last = now;
      while (acc >= STEP) {
        physics(now);
        acc -= STEP;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || !visible || n === 0) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * width;
      const y = ((e.clientY - rect.top) / rect.height) * height;
      if (x < -50 || y < -50 || x > width + 50 || y > height + 50) return;
      forces.push({ x, y, until: performance.now() + 100 });
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    if (img.complete && img.naturalWidth) build();
    else img.onload = build;
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [src, imageWidth, imageHeight, width, height, maxParticles, radius, repelForce, entropy, friction, mass]);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ width, height }} />;
}
