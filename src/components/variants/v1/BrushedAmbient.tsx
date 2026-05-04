"use client";

import { useEffect, useRef } from "react";

/**
 * Variant /1 — Cinematic Vault. Brushed-parchment ambient with subtle Pivot
 * specks that drift with the pointer (±2%). NOT an aurora — closer to the
 * micro-grain of expensive paper under shifting light.
 *
 * Lazy-init via requestIdleCallback. Pauses off-viewport / off-tab.
 * Disabled under prefers-reduced-motion (parent supplies a static fallback).
 */
export function BrushedAmbient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    }) as WebGL2RenderingContext | null;
    if (!gl) return;

    const vert = `#version 300 es
      in vec2 a_pos;
      out vec2 v_uv;
      void main(){ v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }`;

    const frag = `#version 300 es
      precision highp float;
      in vec2 v_uv;
      uniform float u_t;
      uniform vec2 u_res;
      uniform vec2 u_pointer; // -1..1
      out vec4 fragColor;

      // Brand palette
      const vec3 paper      = vec3(0.984, 0.980, 0.969); // #FBFAF7
      const vec3 parchment  = vec3(0.953, 0.941, 0.918); // #F3F0EA
      const vec3 hairline   = vec3(0.894, 0.878, 0.847); // #E4E0D8
      const vec3 pivot      = vec3(0.137, 0.569, 0.627); // #2391A0
      const vec3 deep       = vec3(0.059, 0.388, 0.647); // #0F63A5

      float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        float a = hash21(i);
        float b = hash21(i + vec2(1.0, 0.0));
        float c = hash21(i + vec2(0.0, 1.0));
        float d = hash21(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      void main(){
        vec2 uv = v_uv;
        vec2 p = uv - u_pointer * 0.02;

        // base paper
        vec3 col = mix(paper, parchment, smoothstep(0.0, 1.0, p.y * 0.9 + 0.05));

        // soft horizontal "brushed" striations
        float stripes = sin(p.y * 220.0 + u_t * 0.05) * 0.5 + 0.5;
        col = mix(col, hairline, stripes * 0.04);

        // slow drifting Pivot specks
        float specks = n(p * vec2(40.0, 90.0) + vec2(u_t * 0.02, -u_t * 0.013));
        specks = pow(specks, 6.0);
        col = mix(col, pivot, specks * 0.10);

        // a single deep blue veining lobe near the bottom-end
        float vein = smoothstep(0.85, 0.55, distance(p, vec2(0.78, 0.18) + u_pointer * 0.015));
        col = mix(col, deep, vein * 0.06);

        // micro grain
        float grain = hash21(uv * u_res);
        col += (grain - 0.5) * 0.012;

        fragColor = vec4(col, 1.0);
      }`;

    const compile = (type: number, src: string) => {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      return gl!.getShaderParameter(sh, gl!.COMPILE_STATUS) ? sh : null;
    };
    const v = compile(gl.VERTEX_SHADER, vert);
    const f = compile(gl.FRAGMENT_SHADER, frag);
    if (!v || !f) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, v);
    gl.attachShader(program, f);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    const aPos = gl.getAttribLocation(program, "a_pos");
    const uT = gl.getUniformLocation(program, "u_t");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uPointer = gl.getUniformLocation(program, "u_pointer");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    let running = true;
    let visible = true;
    let inView = true;
    const pointer = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const tick = (now: number) => {
      if (!running) return;
      if (visible && inView) {
        resize();
        gl.uniform1f(uT, now * 0.001);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uPointer, pointer.x, pointer.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (inView = e.isIntersecting)),
      { rootMargin: "100px" },
    );
    io.observe(canvas);

    const start = () => { rafRef.current = requestAnimationFrame(tick); };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (typeof ric === "function") ric(start);
    else window.setTimeout(start, 200);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.deleteShader(v);
      gl.deleteShader(f);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
