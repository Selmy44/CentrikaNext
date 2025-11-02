"use client";

import { useEffect, useRef } from "react";

// Lightweight raw WebGL shader background (no three.js)
// - Fullscreen canvas fixed behind content
// - Animated noise with subtle color gradients
// - Optional image blend (uses /brand/back2.jpeg if present)
// - Respects prefers-reduced-motion
export default function ShaderBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const canvas = ref.current!;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gl = canvas.getContext("webgl", { antialias: false, depth: false, stencil: false, alpha: true });
    if (!gl) return;

    // Vertex shader (two triangles covering screen)
    const vs = `
    attribute vec2 a_pos;
    void main() {
      gl_Position = vec4(a_pos, 0.0, 1.0);
    }
    `;

    // Fragment shader with simple hash noise + fbm
    const fs = `
    precision highp float;
    uniform vec2 u_res; 
    uniform float u_time; 
    uniform float u_ratio; 
    uniform sampler2D u_img; 
    uniform float u_hasImg; 

    // hash & noise
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.5; 
      for(int i=0;i<5;i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / u_res;
      // Centered coordinate for effects
      vec2 p = (uv - 0.5) * vec2(u_ratio, 1.0);

      // Animated field
      float t = u_time * 0.08;
      float n = fbm(p * 1.6 + t);
      float m = fbm(p * 3.2 - t*0.6);
      float field = smoothstep(0.2, 0.8, n * 0.6 + m * 0.4);

      // Brand-inspired gradient (blue)
      vec3 colA = vec3(0.21, 0.35, 0.90);
      vec3 colB = vec3(0.08, 0.22, 0.70);
      vec3 grad = mix(colB, colA, field);

      // Optional texture blend with subtle displacement
      vec3 imgCol = vec3(0.0);
      if (u_hasImg > 0.5) {
        vec2 duv = uv + 0.02 * vec2(m - 0.5, n - 0.5);
        imgCol = texture2D(u_img, duv).rgb;
      }

      // Combine
      vec3 col = mix(grad, imgCol, 0.25 * u_hasImg);

      // Vignette
      float d = dot(p, p);
      col *= smoothstep(0.95, 0.2, d);
      gl_FragColor = vec4(col, 0.9); // semi-transparent to let page tint through
    }
    `;

    function compile(type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s) || "shader compile error");
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vsh = compile(gl.VERTEX_SHADER, vs);
    const fsh = compile(gl.FRAGMENT_SHADER, fs);
    if (!vsh || !fsh) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vsh); gl.attachShader(prog, fsh); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    // Fullscreen quad
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const verts = new Float32Array([
      -1,-1,  1,-1,  -1, 1,
       1,-1,  1, 1,  -1, 1
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRatio = gl.getUniformLocation(prog, "u_ratio");
    const uImg = gl.getUniformLocation(prog, "u_img");
    const uHasImg = gl.getUniformLocation(prog, "u_hasImg");

    let hasImg = 0;
    // Try to load an image texture to blend
    const tex = gl.createTexture();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/brand/back2.jpeg"; // swap to any brand image present
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      hasImg = 1;
    };

    function resize() {
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize); ro.observe(document.body);

    let t0 = performance.now();
    let raf = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function frame() {
      if (stopRef.current) return;
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = (now - t0) / 1000;
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, prefersReduced ? 0.0 : dt);
      gl.uniform1f(uRatio, canvas.width / canvas.height);
      gl.uniform1f(uHasImg, hasImg);
      if (hasImg) { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(uImg, 0); }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    raf = requestAnimationFrame(frame);

    const vis = () => { if (document.hidden) { cancelAnimationFrame(raf); } else { t0 = performance.now(); raf = requestAnimationFrame(frame); } };
    document.addEventListener("visibilitychange", vis);

    return () => {
      stopRef.current = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", vis);
      ro.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -4,
        pointerEvents: "none",
        filter: "blur(0.2px)",
      }}
    />
  );
}
