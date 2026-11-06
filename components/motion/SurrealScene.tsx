"use client";
import { useEffect, useRef } from "react";

/*
 * Escena surrealista en WebGL (sin librerías): una plaza de concreto infinita, monolitos
 * que flotan, un pórtico y un sol bajo en el horizonte. Se dibuja a baja resolución,
 * arranca después de cargar la página, se pausa fuera de pantalla y queda quieta con
 * «reducir movimiento». Sin WebGL se ve el degradado de respaldo (.surreal-fallback).
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 uR; uniform float uT; uniform vec2 uM; uniform float uV; uniform float uX;
#define S(a,b,x) smoothstep(a,b,x)
const vec3 CAR=vec3(.055,.055,.063);
const vec3 GRA=vec3(.275,0.,.012);
const vec3 GRV=vec3(.478,.055,.094);
const vec3 MAR=vec3(.91,.886,.816);
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float box(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
vec2 map(vec3 p){
  vec2 r=vec2(p.y,0.);
  vec3 q=p-vec3(uX,2.4,10.);
  float a=max(box(q,vec3(1.7,2.4,.3)),-box(q-vec3(0.,-.35,0.),vec3(1.15,2.1,1.)));
  if(a<r.x)r=vec2(a,1.);
  for(int i=0;i<6;i++){
    float f=float(i);
    float sd=mod(f,2.)<1.?-1.:1.;
    vec3 c=vec3(uX+sd*(2.6+f*.55),3.+mod(f*1.7,2.8)+sin(uT*.35+f*1.3)*.35,5.+f*2.3);
    vec3 pp=p-c; pp.xz*=rot(uT*.06+f*.8); pp.xy*=rot(.25*sin(f*3.1));
    float h=.7+mod(f*.73,1.)*.9;
    float b=box(pp,vec3(.22+.1*mod(f,2.),h,.22))-.02;
    if(b<r.x)r=vec2(b,2.);
  }
  return r;
}
vec3 sunDir(){return normalize(vec3(uX*.045,.14+.05*uV,1.));}
vec3 skyBase(vec3 rd){
  float y=rd.y;
  vec3 hz=mix(GRV,GRA*1.6+vec3(.05,.03,.02),uV);
  vec3 c=mix(hz*1.25,CAR,S(-.02,.5,y));
  return mix(c,MAR*.6,exp(-abs(y)*30.)*.3);
}
vec3 sky(vec3 rd){
  float s=max(dot(rd,sunDir()),0.);
  vec3 c=skyBase(rd);
  c=mix(c,vec3(1.25,1.08,.9),S(.9989,.9993,s));
  c+=vec3(1.,.8,.7)*pow(s,90.)*.4+GRV*pow(s,7.)*.45;
  return c;
}
float trace(vec3 ro,vec3 rd,out float id){
  float t=.01; id=-1.;
  for(int i=0;i<72;i++){vec2 h=map(ro+rd*t); if(h.x<.002*t){id=h.y;return t;} t+=h.x; if(t>60.)break;}
  return -1.;
}
float shadow(vec3 ro,vec3 rd){
  float res=1.,t=.05;
  for(int i=0;i<24;i++){float h=map(ro+rd*t).x;res=min(res,10.*h/t);t+=clamp(h,.05,.7);if(res<.01||t>25.)break;}
  return clamp(res,0.,1.);
}
vec3 nor(vec3 p){vec2 e=vec2(.002,0.);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}
vec3 obj(vec3 p,vec3 rd,float id){
  vec3 n=nor(p),l=sunDir();
  float dif=max(dot(n,l),0.)*shadow(p+n*.01,l);
  vec3 alb=id>1.5?vec3(.62,.61,.58):vec3(.74,.72,.68);
  vec3 c=alb*(dif*MAR*1.2+CAR*2.2+GRV*.35*(.5+.5*n.y));
  c+=GRV*.45*pow(1.-max(dot(n,-rd),0.),3.);
  return c;
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uR)/uR.y;
  vec3 ro=vec3(uX*.35+uM.x*.6,1.5+uM.y*.25+sin(uT*.1)*.05,-7.+sin(uT*.05)*.5);
  vec3 ta=vec3(uX*.6,2.6,10.);
  vec3 f=normalize(ta-ro),r=normalize(cross(vec3(0.,1.,0.),f)),u=cross(f,r);
  vec3 rd=normalize(uv.x*r+uv.y*u+1.6*f);
  float id; float t=trace(ro,rd,id);
  vec3 col=sky(rd);
  if(t>0.){
    vec3 p=ro+rd*t;
    if(id<.5){
      float sh=shadow(p+vec3(0.,.01,0.),sunDir());
      vec3 rr=reflect(rd,vec3(0.,1.,0.));
      rr.x+=.0015*sin(p.z*4.+uT*.5);
      float id2; float t2=trace(p+vec3(0.,.01,0.),rr,id2);
      vec3 rc=t2>0.?obj(p+rr*t2,rr,id2):sky(rr);
      float fr=.25+.55*pow(1.-max(-rd.y,0.),5.);
      vec3 base=vec3(.09,.085,.085)*(.35+.65*sh);
      col=mix(base,rc,fr);
      vec2 g=abs(fract(p.xz*.5)-.5);
      col+=vec3(.04)*S(.47,.5,max(g.x,g.y))*exp(-t*.06);
    } else col=obj(p,rd,id);
    col=mix(col,skyBase(rd)*.9+GRV*.12,1.-exp(-t*.03));
  }
  col*=1.-.4*dot(uv,uv);
  col+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233))+uT)*43758.5453)-.5)*.035;
  gl_FragColor=vec4(col,1.);
}`;

export default function SurrealScene({ variant = 0, className = "" }: { variant?: 0 | 1; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    let cleanup = () => {};
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      const gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!gl) return;
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
      };
      const vs = sh(gl.VERTEX_SHADER, VERT);
      const fs = sh(gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;
      const pr = gl.createProgram()!;
      gl.attachShader(pr, vs);
      gl.attachShader(pr, fs);
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
      gl.useProgram(pr);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const U = (n: string) => gl.getUniformLocation(pr, n);
      const uR = U("uR"), uT = U("uT"), uM = U("uM"), uV = U("uV"), uX = U("uX");
      gl.uniform1f(uV, variant);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const t0 = performance.now();
      let raf = 0;
      let visible = false;
      let mx = 0, my = 0, tx = 0, ty = 0;

      const draw = (now: number) => {
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;
        gl.uniform1f(uT, reduce ? 8 : (now - t0) / 1000);
        gl.uniform2f(uM, mx, my);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        cv.dataset.ready = "1";
      };
      const loop = (now: number) => {
        draw(now);
        raf = visible && !reduce && !document.hidden ? requestAnimationFrame(loop) : 0;
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(loop);
      };
      const resize = () => {
        const w = cv.clientWidth, h = cv.clientHeight;
        const s = (w < 768 ? 0.45 : 0.6) * Math.min(window.devicePixelRatio || 1, 1.5);
        cv.width = Math.max(1, Math.round(w * s));
        cv.height = Math.max(1, Math.round(h * s));
        gl.viewport(0, 0, cv.width, cv.height);
        gl.uniform2f(uR, cv.width, cv.height);
        gl.uniform1f(uX, w / Math.max(h, 1) > 1.2 ? 2.6 : 0);
        kick();
      };
      const onMove = (e: PointerEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ty = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) kick();
      });
      const ro = new ResizeObserver(resize);
      io.observe(cv);
      ro.observe(cv);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("visibilitychange", kick);
      resize();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", kick);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    // Espera a que la página termine de cargar para no competir con el contenido.
    const later = () => setTimeout(start, 250);
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", later);
      cleanup();
    };
  }, [variant]);

  return (
    <div aria-hidden="true" className={`surreal-fallback pointer-events-none ${variant ? "surreal-fallback--b" : ""} ${className}`}>
      <canvas ref={ref} className="h-full w-full opacity-0 transition-opacity duration-[1600ms] data-[ready]:opacity-100" />
    </div>
  );
}
