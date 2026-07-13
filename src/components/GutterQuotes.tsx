"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { pastel } from "@/content/palette";
import { quotesForPath } from "@/content/quotes";

/**
 * Gutter quote engine: short founder/CTO-mindset one-liners rendered as particle
 * text in the empty side space, one word-field per gutter. Each line's letters are
 * sampled from an offscreen canvas into a point cloud that scatters → assembles →
 * holds (with a gentle drift) → dissolves, then cycles to the next line. Lines are
 * chosen per route via `usePathname`, and the two gutters run offset sequences so
 * they never show the same word at once.
 *
 * A single full-viewport canvas with a pixel-space orthographic camera drives both
 * fields (built once; the route only swaps the word list via a ref, so navigation
 * never rebuilds the WebGL context). It runs only where real gutters exist (≥ ~lg);
 * on narrow screens the column fills the viewport so the canvas hides and the loop
 * stops. Same envelope as the rest of the site (dynamic import, visibility pause,
 * reduced-motion static, full cleanup); colour deepens on light theme via a uniform.
 */

const COLUMN = 672; // max-w-2xl, matches Frame.tsx
const MAX = 900; // particles per gutter field

const vertexShader = /* glsl */ `
  attribute vec3 a_color;
  attribute float a_alpha;
  uniform float u_size;
  varying vec3 v_color;
  varying float v_alpha;
  void main() {
    v_color = a_color;
    v_alpha = a_alpha;
    gl_PointSize = u_size;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float u_shade;
  varying vec3 v_color;
  varying float v_alpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.05, d);
    gl_FragColor = vec4(v_color * u_shade, a * v_alpha);
  }
`;

type FieldsApi = { setWords: (words: string[]) => void };

export function GutterQuotes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const shadeRef = useRef(1);
  const wordsRef = useRef<string[]>(quotesForPath(pathname));
  const apiRef = useRef<FieldsApi | null>(null);

  useEffect(() => {
    shadeRef.current = resolvedTheme === "dark" ? 1 : 0.7;
  }, [resolvedTheme]);

  // Route change → swap the word list in place (no WebGL rebuild).
  useEffect(() => {
    wordsRef.current = quotesForPath(pathname);
    apiRef.current?.setWords(wordsRef.current);
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const dpr = Math.min(window.devicePixelRatio, 2);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
      camera.position.z = 10;

      const uniforms = {
        u_size: { value: 3.4 * dpr },
        u_shade: { value: shadeRef.current },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      // Sample a phrase into centered [x, y] point targets (world y up). Each
      // word goes on its own line so glyphs stay large and legible in the narrow
      // gutter, sized to fit both the gutter width and the available height.
      const sampleText = (
        text: string,
        maxW: number,
        maxH: number,
      ): number[][] => {
        const lines = text.split(" ").filter(Boolean);
        const base = 120;
        const tc = document.createElement("canvas");
        const tx = tc.getContext("2d")!;
        const font = (px: number) =>
          `700 ${px}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        tx.font = font(base);
        let widest = 1;
        for (const l of lines) widest = Math.max(widest, tx.measureText(l).width);
        const lineFactor = 1.25;
        const scale = Math.min(
          maxW / widest,
          maxH / (lines.length * base * lineFactor),
          1.5,
        );
        const fontPx = Math.max(30, base * scale);
        tx.font = font(fontPx);
        const lineH = fontPx * lineFactor;
        let cw = 1;
        for (const l of lines) cw = Math.max(cw, tx.measureText(l).width);
        cw = Math.ceil(cw) + 10;
        const ch = Math.ceil(lines.length * lineH) + 8;
        tc.width = cw;
        tc.height = ch;
        tx.font = font(fontPx);
        tx.fillStyle = "#fff";
        tx.textBaseline = "middle";
        tx.textAlign = "center";
        lines.forEach((l, li) => tx.fillText(l, cw / 2, (li + 0.5) * lineH + 4));
        const d = tx.getImageData(0, 0, cw, ch).data;
        const gap = Math.max(4, Math.round(fontPx / 16));
        const pts: number[][] = [];
        for (let y = 0; y < ch; y += gap) {
          for (let x = 0; x < cw; x += gap) {
            if (d[(y * cw + x) * 4 + 3] > 128) pts.push([x - cw / 2, ch / 2 - y]);
          }
        }
        return pts;
      };

      type Field = {
        setCenter: (cx: number, cy: number, maxW: number, spanH: number) => void;
        setWords: (words: string[]) => void;
        update: (dt: number, now: number) => void;
        dispose: () => void;
      };

      const makeField = (colorOffset: number, startFrac: number): Field => {
        const positions = new Float32Array(MAX * 3);
        const colors = new Float32Array(MAX * 3);
        const alphas = new Float32Array(MAX);
        const targets = new Float32Array(MAX * 3);
        const scatter = new Float32Array(MAX * 3);
        const alphaTargets = new Float32Array(MAX);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("a_color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("a_alpha", new THREE.BufferAttribute(alphas, 1));
        const points = new THREE.Points(geometry, material);
        points.frustumCulled = false;
        scene.add(points);

        const col = new THREE.Color();
        let words = wordsRef.current;
        let cx = 0;
        let cy = 0;
        let maxW = 200;
        let spanH = 400;
        let idx = Math.floor(words.length * startFrac) % words.length;
        let mode: "in" | "hold" | "out" = "in";
        let timer = 0;
        let activeCount = 0;

        for (let i = 0; i < MAX; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 200;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
        }

        const seedScatter = () => {
          for (let i = 0; i < MAX; i++) {
            scatter[i * 3] = cx + (Math.random() - 0.5) * (maxW + 60);
            scatter[i * 3 + 1] = cy + (Math.random() - 0.5) * spanH;
            scatter[i * 3 + 2] = 0;
          }
        };

        const setWord = (text: string) => {
          let pts = sampleText(text, maxW, spanH * 0.95);
          if (pts.length > MAX) {
            const stride = pts.length / MAX;
            const sub: number[][] = [];
            for (let i = 0; i < MAX; i++) sub.push(pts[Math.floor(i * stride)]);
            pts = sub;
          }
          activeCount = pts.length;
          col.set(pastel[(colorOffset + idx) % pastel.length]);
          for (let i = 0; i < MAX; i++) {
            if (i < activeCount) {
              targets[i * 3] = cx + pts[i][0];
              targets[i * 3 + 1] = cy + pts[i][1];
              alphaTargets[i] = 1;
            } else {
              targets[i * 3] = scatter[i * 3];
              targets[i * 3 + 1] = scatter[i * 3 + 1];
              alphaTargets[i] = 0;
            }
            const j = 0.85 + Math.random() * 0.15;
            colors[i * 3] = col.r * j;
            colors[i * 3 + 1] = col.g * j;
            colors[i * 3 + 2] = col.b * j;
          }
          geometry.attributes.a_color.needsUpdate = true;
          mode = "in";
          timer = 0;
        };

        return {
          setCenter: (nx, ny, nMaxW, nSpanH) => {
            cx = nx;
            cy = ny;
            maxW = nMaxW;
            spanH = nSpanH;
            seedScatter();
            setWord(words[idx]);
          },
          setWords: (next) => {
            words = next;
            idx = Math.floor(words.length * startFrac) % words.length;
            setWord(words[idx]);
          },
          update: (dt, now) => {
            const drift = mode === "hold";
            for (let i = 0; i < MAX; i++) {
              const scattered = mode === "out" || i >= activeCount;
              let gx = scattered ? scatter[i * 3] : targets[i * 3];
              let gy = scattered ? scatter[i * 3 + 1] : targets[i * 3 + 1];
              if (drift && !scattered) {
                gx += Math.sin(now * 0.0018 + i * 0.7) * 1.6;
                gy += Math.cos(now * 0.0016 + i * 0.5) * 1.6;
              }
              const ease = scattered ? 0.06 : 0.11;
              positions[i * 3] += (gx - positions[i * 3]) * ease;
              positions[i * 3 + 1] += (gy - positions[i * 3 + 1]) * ease;
              const aTarget = mode === "out" ? 0 : alphaTargets[i];
              alphas[i] += (aTarget - alphas[i]) * 0.1;
            }
            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.a_alpha.needsUpdate = true;

            timer += dt;
            if (mode === "in" && timer > 1.4) {
              mode = "hold";
              timer = 0;
            } else if (mode === "hold" && timer > 2.6) {
              mode = "out";
              timer = 0;
            } else if (mode === "out" && timer > 1.2) {
              idx = (idx + 1) % words.length;
              setWord(words[idx]);
            }
          },
          dispose: () => {
            scene.remove(points);
            geometry.dispose();
          },
        };
      };

      const left = makeField(0, 0);
      const right = makeField(3, 0.5);
      apiRef.current = {
        setWords: (w) => {
          left.setWords(w);
          right.setWords(w);
        },
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let raf = 0;
      let running = false;
      let active = false;
      let last = performance.now();

      const loop = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        uniforms.u_shade.value = shadeRef.current;
        left.update(dt, now);
        right.update(dt, now);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running || !active) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      const resize = () => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const gutterW = (W - COLUMN) / 2;
        active = gutterW >= 90;
        canvas.style.display = active ? "block" : "none";
        if (!active) {
          stop();
          return;
        }
        renderer.setSize(W, H, false);
        camera.left = -W / 2;
        camera.right = W / 2;
        camera.top = H / 2;
        camera.bottom = -H / 2;
        camera.updateProjectionMatrix();
        const span = Math.min(H * 0.5, 420);
        left.setCenter(gutterW / 2 - W / 2, 0, gutterW * 0.78, span);
        right.setCenter(W - gutterW / 2 - W / 2, 0, gutterW * 0.78, span);
        if (!reduceMotion) start();
      };

      const onVisibility = () => {
        if (document.hidden) stop();
        else if (!reduceMotion) start();
      };

      resize();
      window.addEventListener("resize", resize);

      if (reduceMotion) {
        for (let k = 0; k < 40; k++) {
          left.update(0.05, 0);
          right.update(0.05, 0);
        }
        if (active) renderer.render(scene, camera);
      } else {
        document.addEventListener("visibilitychange", onVisibility);
      }

      cleanup = () => {
        stop();
        apiRef.current = null;
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        left.dispose();
        right.dispose();
        material.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
