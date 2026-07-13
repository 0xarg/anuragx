"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { useTheme } from "next-themes";
import { pastel, terrain } from "@/content/palette";

/**
 * Hero centerpiece: a semi-transparent dotted Earth. The whole sphere is sampled
 * from a natural-colour equirectangular Earth texture and each dot is coloured by
 * the terrain underneath it — blue ocean, green vegetation, tan desert, white
 * ice-caps, olive mountains — with a glowing core-and-halo dot shape. Glowing
 * great-circle arcs connect the three places the user has worked — Bengaluru,
 * San Francisco, Johannesburg — each with a travelling pulse and a pulsing marker.
 * Depth-testing is off so the far side shows through, giving the "transparent" read.
 *
 * The globe is interactive: drag to orbit freely, scroll-wheel to zoom, and a
 * gentle auto-spin eases back in when idle. Same WebGL envelope as the rest of the
 * site: three.js is imported dynamically, the loop pauses on a hidden tab, and
 * `prefers-reduced-motion` renders one static frame. Dot brightness adapts to the
 * resolved theme via a live uniform.
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
  attribute float a_size;
  uniform float u_size;
  uniform float u_scale;
  varying vec3 v_color;
  void main() {
    v_color = a_color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = u_size * a_size * (u_scale / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

// Bright core + soft outer halo → the dots glow. Kept in the fragment shader
// (rather than additive blending, which is invisible on the light theme's white
// background) so the glow reads in both themes.
const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float u_shade;
  varying vec3 v_color;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.28, 0.0, d);
    float halo = smoothstep(0.5, 0.28, d);
    float a = clamp(core + halo * 0.45, 0.0, 1.0);
    vec3 col = v_color * (1.0 + core * 0.6);
    gl_FragColor = vec4(col * u_shade, a);
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
  // Dark theme → full-bright terrain colours; light theme → deepen hard so the
  // dots read as saturated colour against white rather than washing out.
  const shadeRef = useRef(1);

  useEffect(() => {
    shadeRef.current = resolvedTheme === "dark" ? 1 : 0.45;
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

      // Classify the terrain under a lat/lon from the natural-colour texture.
      type Terrain = keyof typeof terrain;
      const classify = (lat: number, lon: number): Terrain => {
        const u = Math.min(MW - 1, Math.max(0, Math.floor(((lon + 180) / 360) * MW)));
        const v = Math.min(MH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * MH)));
        const i = (v * MW + u) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        if (luma > 200 && max - min < 45) return "iceCap"; // bright + low saturation
        if (b > r && b >= g) return "ocean"; // blue-dominant
        if (g > r && g >= b) return "forest"; // green-dominant vegetation
        if (r > 150 && g > 120 && r - b > 40) return "desert"; // warm, bright sand
        return "land"; // brown mountains / arid ground
      };

      // — Build the dot cloud over the whole sphere.
      const positions: number[] = [];
      const colors: number[] = [];
      const sizes: number[] = [];
      const col = new THREE.Color();
      const STEP = 1.3;
      for (let lat = -88; lat <= 88; lat += STEP) {
        // Thin longitudes near the poles so density stays roughly even.
        const lonStep = STEP / Math.max(0.2, Math.cos(lat * DEG));
        for (let lon = -180; lon < 180; lon += lonStep) {
          if (Math.random() > 0.85) continue; // light organic thinning
          const kind = classify(lat, lon);
          const v = latLonToVec3(THREE, lat, lon, R);
          positions.push(v.x, v.y, v.z);
          col.set(terrain[kind]);
          const j = 0.82 + Math.random() * 0.18; // subtle per-dot brightness jitter
          // Dim + shrink ocean so continents pop against the water field.
          const dim = kind === "ocean" ? 0.82 : 1;
          colors.push(col.r * j * dim, col.g * j * dim, col.b * j * dim);
          sizes.push(kind === "ocean" ? 0.72 : kind === "iceCap" ? 0.9 : 1);
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
      geometry.setAttribute(
        "a_size",
        new THREE.BufferAttribute(new Float32Array(sizes), 1),
      );

      const uniforms = {
        u_size: { value: 0.03 },
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
        const lift = 1 + 0.1 + start.distanceTo(end) * 0.2;
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
      scene.add(globe);

      // Camera pulled back so the full sphere + arcs sit inside the frame with
      // margin. This distance is the default zoom; the wheel clamps around it.
      const BASE_Z = 4.4;
      const MIN_Z = 2.6;
      const MAX_Z = 5.6;
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.z = BASE_Z;

      const canvas = document.createElement("canvas");
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);
      container.style.cursor = "grab";
      container.style.touchAction = "none";

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

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // — Orbit / zoom state. Drag adjusts yaw+pitch (with fling momentum), the
      // wheel adjusts the target camera distance, and the globe otherwise spins
      // continuously in place.
      const clamp = (v: number, lo: number, hi: number) =>
        Math.min(hi, Math.max(lo, v));
      const PITCH_LIMIT = 1.4; // ~±80°
      const AUTO_SPIN = 0.12; // rad/sec

      let yaw = 0;
      let pitch = 0.28;
      let yawVel = 0;
      let pitchVel = 0;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let camZTarget = BASE_Z;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        yawVel = 0;
        pitchVel = 0;
        container.setPointerCapture?.(e.pointerId);
        container.style.cursor = "grabbing";
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const k = 0.005;
        yawVel = (e.clientX - lastX) * k;
        pitchVel = (e.clientY - lastY) * k;
        lastX = e.clientX;
        lastY = e.clientY;
        yaw += yawVel;
        pitch = clamp(pitch + pitchVel, -PITCH_LIMIT, PITCH_LIMIT);
      };
      const onUp = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        container.releasePointerCapture?.(e.pointerId);
        container.style.cursor = "grab";
      };
      const onWheel = (e: WheelEvent) => {
        e.preventDefault(); // zoom over the globe rather than scrolling the page
        camZTarget = clamp(camZTarget + e.deltaY * 0.002, MIN_Z, MAX_Z);
      };
      container.addEventListener("pointerdown", onDown);
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerup", onUp);
      container.addEventListener("pointercancel", onUp);
      container.addEventListener("wheel", onWheel, { passive: false });

      const tmp = new THREE.Vector3();
      let prev = performance.now();
      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - prev) / 1000);
        prev = now;

        if (!dragging) {
          // Fling momentum decays after release.
          yaw += yawVel;
          pitch = clamp(pitch + pitchVel, -PITCH_LIMIT, PITCH_LIMIT);
          yawVel *= 0.92;
          pitchVel *= 0.92;
          if (Math.abs(yawVel) < 1e-4) yawVel = 0;
          if (Math.abs(pitchVel) < 1e-4) pitchVel = 0;
          // Continuous auto-spin — the globe is always revolving in place, on top
          // of any lingering fling momentum, whenever it isn't being dragged.
          if (!reduceMotion) yaw += AUTO_SPIN * dt;
        }

        globe.rotation.y = yaw;
        globe.rotation.x = pitch;
        camera.position.z += (camZTarget - camera.position.z) * 0.12;
        uniforms.u_shade.value = shadeRef.current;

        // Arc pulses travel; markers breathe.
        const t = now * 0.001;
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
        frame(ms);
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
        yaw = 0.6;
        frame(performance.now());
      } else {
        document.addEventListener("visibilitychange", onVisibility);
        start();
      }

      cleanup = () => {
        stop();
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        container.removeEventListener("pointerdown", onDown);
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerup", onUp);
        container.removeEventListener("pointercancel", onUp);
        container.removeEventListener("wheel", onWheel);
        container.style.cursor = "";
        container.style.touchAction = "";
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
