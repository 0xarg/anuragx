"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { useTheme } from "next-themes";
import { pastel } from "@/content/palette";

/**
 * Hero centerpiece: a semi-transparent dotted Earth. Continents are sampled from
 * a public-domain equirectangular Earth texture (land = "not ocean") and drawn as
 * soft round dots in muted pastel bands. Glowing great-circle arcs connect the
 * three places the user has worked — Bengaluru, San Francisco, Johannesburg —
 * each with a travelling pulse and a pulsing marker. Depth-testing is off so the
 * far side shows through, giving the "transparent" globe read.
 *
 * Same WebGL envelope as the rest of the site: three.js is imported dynamically,
 * the loop pauses on a hidden tab, and `prefers-reduced-motion` renders one static
 * frame. Dot brightness adapts to the resolved theme via a live uniform.
 */

const R = 1;
const DEG = Math.PI / 180;

// Places worked (lat, long) + which arcs connect them.
const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "India", lat: 12.97, lon: 77.59 }, // Bengaluru
  { name: "USA", lat: 37.77, lon: -122.42 }, // San Francisco
  { name: "South Africa", lat: -26.2, lon: 28.05 }, // Johannesburg
];
const ARCS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];

const vertexShader = /* glsl */ `
  attribute vec3 a_color;
  uniform float u_size;
  uniform float u_scale;
  varying vec3 v_color;
  void main() {
    v_color = a_color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = u_size * (u_scale / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float u_shade;
  varying vec3 v_color;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.05, d);
    gl_FragColor = vec4(v_color * u_shade, a);
  }
`;

function latLonToVec3(THREE: typeof import("three"), lat: number, lon: number, r: number) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

export function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  // Dark theme → full-bright pastels; light theme → deepen so they read on white.
  const shadeRef = useRef(1);

  useEffect(() => {
    shadeRef.current = resolvedTheme === "dark" ? 1 : 0.72;
  }, [resolvedTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      // — Load the Earth texture and read its pixels for land detection.
      const img = new Image();
      img.src = "/land-map.jpg";
      try {
        await img.decode();
      } catch {
        return;
      }
      if (disposed) return;

      const MW = 1024;
      const MH = 512;
      const mapCanvas = document.createElement("canvas");
      mapCanvas.width = MW;
      mapCanvas.height = MH;
      const mctx = mapCanvas.getContext("2d", { willReadFrequently: true })!;
      mctx.drawImage(img, 0, 0, MW, MH);
      const data = mctx.getImageData(0, 0, MW, MH).data;

      const isLand = (lat: number, lon: number) => {
        const u = Math.min(MW - 1, Math.max(0, Math.floor(((lon + 180) / 360) * MW)));
        const v = Math.min(MH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * MH)));
        const i = (v * MW + u) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Ocean is blue-dominant; land (green/tan) and ice (white) are not.
        return !(b > r + 8 && b > g + 8);
      };

      // — Build the land-dot cloud.
      const positions: number[] = [];
      const colors: number[] = [];
      const col = new THREE.Color();
      for (let lat = -88; lat <= 88; lat += 1.7) {
        // Thin longitudes near the poles so density stays roughly even.
        const lonStep = 1.7 / Math.max(0.2, Math.cos(lat * DEG));
        for (let lon = -180; lon < 180; lon += lonStep) {
          if (!isLand(lat, lon)) continue;
          if (Math.random() > Math.cos(lat * DEG) * 0.9 + 0.1) continue;
          const v = latLonToVec3(THREE, lat, lon, R);
          positions.push(v.x, v.y, v.z);
          // Colour in gentle longitudinal bands for a multicoloured read.
          const band = Math.floor(((lon + 180) / 360) * pastel.length) % pastel.length;
          col.set(pastel[band]);
          const j = 0.82 + Math.random() * 0.18; // subtle per-dot brightness jitter
          colors.push(col.r * j, col.g * j, col.b * j);
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(positions), 3),
      );
      geometry.setAttribute(
        "a_color",
        new THREE.BufferAttribute(new Float32Array(colors), 3),
      );

      const uniforms = {
        u_size: { value: 0.019 },
        u_scale: { value: 300 },
        u_shade: { value: shadeRef.current },
      };
      const dotMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const dots = new THREE.Points(geometry, dotMaterial);

      const globe = new THREE.Group();
      globe.add(dots);

      // — Arcs + markers.
      const cityVecs = CITIES.map((c) => latLonToVec3(THREE, c.lat, c.lon, R));
      const arcColors = [pastel[0], pastel[2], pastel[4]];
      const pulses: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; off: number }[] = [];
      const disposables: { dispose: () => void }[] = [geometry, dotMaterial];

      ARCS.forEach(([a, b], idx) => {
        const start = cityVecs[a];
        const end = cityVecs[b];
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const lift = 1 + 0.15 + start.distanceTo(end) * 0.28;
        mid.normalize().multiplyScalar(R * lift);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

        const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.004, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: arcColors[idx % arcColors.length],
          transparent: true,
          opacity: 0.55,
          depthTest: false,
          depthWrite: false,
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        tube.renderOrder = 2;
        globe.add(tube);
        disposables.push(tubeGeo, tubeMat);

        // Travelling pulse bead.
        const beadGeo = new THREE.SphereGeometry(0.02, 12, 12);
        const beadMat = new THREE.MeshBasicMaterial({
          color: "#ffffff",
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });
        const bead = new THREE.Mesh(beadGeo, beadMat);
        bead.renderOrder = 3;
        globe.add(bead);
        disposables.push(beadGeo, beadMat);
        pulses.push({ mesh: bead, curve, off: idx / ARCS.length });
      });

      // City markers.
      const markers: THREE.Mesh[] = [];
      cityVecs.forEach((v) => {
        const mGeo = new THREE.SphereGeometry(0.022, 14, 14);
        const mMat = new THREE.MeshBasicMaterial({
          color: "#ffffff",
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });
        const marker = new THREE.Mesh(mGeo, mMat);
        marker.position.copy(v);
        marker.renderOrder = 3;
        globe.add(marker);
        markers.push(marker);
        disposables.push(mGeo, mMat);
      });

      const scene = new THREE.Scene();
      globe.rotation.x = 0.28;
      scene.add(globe);

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.z = 3.2;

      const canvas = document.createElement("canvas");
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);

      const resize = () => {
        const s = Math.max(container.clientWidth, 1);
        renderer.setSize(s, s, false);
        uniforms.u_scale.value = s * dpr;
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = container.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      const onLeave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };
      container.addEventListener("pointermove", onPointer);
      container.addEventListener("pointerleave", onLeave);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let px = 0;
      let py = 0;
      const tmp = new THREE.Vector3();
      const frame = (spin: number, t: number) => {
        px += (pointer.x - px) * 0.05;
        py += (pointer.y - py) * 0.05;
        globe.rotation.y = spin + px * 0.5;
        globe.rotation.x = 0.28 + py * 0.35;
        uniforms.u_shade.value = shadeRef.current;

        // Arc pulses travel; markers breathe.
        pulses.forEach((p) => {
          const tt = (t * 0.12 + p.off) % 1;
          p.curve.getPointAt(tt, tmp);
          p.mesh.position.copy(tmp);
          (p.mesh.material as THREE.MeshBasicMaterial).opacity =
            0.5 + 0.5 * Math.sin(tt * Math.PI);
        });
        const pulse = 0.7 + 0.3 * Math.sin(t * 3);
        markers.forEach((m) => m.scale.setScalar(pulse));

        renderer.render(scene, camera);
      };

      let raf = 0;
      let running = false;
      const loop = (ms: number) => {
        frame(ms * 0.00008, ms * 0.001);
        raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };

      if (reduceMotion) {
        frame(0.6, 0);
      } else {
        document.addEventListener("visibilitychange", onVisibility);
        start();
      }

      cleanup = () => {
        stop();
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        container.removeEventListener("pointermove", onPointer);
        container.removeEventListener("pointerleave", onLeave);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="aspect-square w-full select-none overflow-hidden"
    />
  );
}
