import { useState, useEffect, useRef } from 'react';

const roles = ['Backend Developer', 'API Builder', 'DSM Student'];

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse throttleado — evita recalcular en cada pixel
    let lastMouse = 0;
    const onMouse = (e) => {
      const now = Date.now();
      if (now - lastMouse < 40) return;
      lastMouse = now;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    // 60 partículas en lugar de 130 — O(n²) se divide por 4.7x
    const N = 60;
    const LINK_DIST = 110;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const MOUSE_DIST_SQ = 9000; // 95px aprox

    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.35 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.x;
      const my = mouse.y;

      // Líneas — solo sqrt cuando distSq ya pasó el check
      ctx.lineWidth = 0.5;
      for (let i = 0; i < N; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < N; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST_SQ) {
            const alpha = 0.22 * (1 - distSq / LINK_DIST_SQ);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${alpha.toFixed(2)})`;
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // Dots — un solo fillStyle para todos (batch)
      ctx.fillStyle = 'rgba(0,212,255,0.55)';
      for (let i = 0; i < N; i++) {
        const p = particles[i];

        // Física
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < MOUSE_DIST_SQ && distSq > 1) {
          const inv = 1 / Math.sqrt(distSq);
          p.vx += dx * inv * 0.05;
          p.vy += dy * inv * 0.05;
        }

        const speed = p.vx * p.vx + p.vy * p.vy;
        if (speed > 1.8) { p.vx *= 0.94; p.vy *= 0.94; }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.7 }} />;
}

function Aurora() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', width: '700px', height: '500px', top: '-100px', left: '20%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)', animation: 'aurora1 12s ease-in-out infinite', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', width: '600px', height: '400px', top: '30%', right: '-100px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 70%)', animation: 'aurora2 16s ease-in-out infinite', filter: 'blur(50px)' }} />
      <div style={{ position: 'absolute', width: '400px', height: '300px', bottom: '10%', left: '10%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)', animation: 'aurora3 10s ease-in-out infinite', filter: 'blur(60px)' }} />
      <style>{`
        @keyframes aurora1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,40px) scale(1.1)}66%{transform:translate(-40px,20px) scale(0.95)}}
        @keyframes aurora2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-80px,60px) scale(1.15)}}
        @keyframes aurora3{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(50px,-30px) scale(1.2)}80%{transform:translate(-20px,40px) scale(0.9)}}
      `}</style>
    </div>
  );
}

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const role = roles[roleIdx];
    let timeout;
    if (!deleting && text.length < role.length) timeout = setTimeout(() => setText(role.slice(0, text.length + 1)), 75);
    else if (!deleting && text.length === role.length) timeout = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && text.length > 0) timeout = setTimeout(() => setText(role.slice(0, text.length - 1)), 40);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
      {text}
      <span style={{
        display: 'inline-block', width: '2px', height: '0.85em',
        background: blink ? 'var(--cyan)' : 'transparent',
        verticalAlign: 'middle', marginLeft: '3px',
        boxShadow: blink ? '0 0 8px var(--cyan)' : 'none',
        transition: 'background 0.08s, box-shadow 0.08s',
      }} />
    </span>
  );
}

export default function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 950),
      setTimeout(() => setPhase(5), 1150),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const reveal = (p) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.98)',
    filter: phase >= p ? 'blur(0px)' : 'blur(6px)',
    transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.9s cubic-bezier(0.16,1,0.3,1)',
  });

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
      background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #0d1729 0%, var(--bg) 60%)',
    }}>
      <ParticleCanvas />
      <Aurora />

      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(10,15,30,0.55) 100%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>

        {/* Badge */}
        <div style={{ ...reveal(1), marginBottom: '28px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'var(--cyan)', letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '7px 18px', border: '1px solid rgba(0,212,255,0.22)',
            borderRadius: '20px', background: 'rgba(0,212,255,0.05)', backdropFilter: 'blur(12px)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--cyan)', display: 'inline-block',
              animation: 'badgePulse 2s ease-in-out infinite',
            }} />
            Available for internships &amp; collabs
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          ...reveal(2),
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(52px, 9vw, 96px)',
          fontWeight: 700, lineHeight: 1, marginBottom: '14px', letterSpacing: '-0.02em',
        }}>
          Carlos
          <span style={{ color: 'var(--cyan)', textShadow: '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.25)' }}>.</span>
        </h1>

        {/* Typewriter */}
        <h2 style={{
          ...reveal(3),
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(18px, 3.5vw, 30px)',
          fontWeight: 400, color: 'var(--white-dim)',
          marginBottom: '28px', minHeight: '44px',
        }}>
          <Typewriter />
        </h2>

        {/* Bio */}
        <p style={{
          ...reveal(4),
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: 'var(--white-muted)', maxWidth: '500px', lineHeight: 1.8, marginBottom: '44px',
        }}>
          Building clean, scalable APIs from Mérida, México.<br />
          5th semester @ UTM · Multiplatform Software Development.
        </p>

        {/* CTAs */}
        <div style={{ ...reveal(5), display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#projects" style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '15px 32px',
            background: 'var(--cyan)', color: '#0a0f1e',
            borderRadius: '8px', fontWeight: 700,
            boxShadow: '0 0 24px rgba(0,212,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 52px rgba(0,212,255,0.7), inset 0 1px 0 rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'none'; }}
          >View Projects ↓</a>

          <a href="#contact" style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '15px 32px',
            background: 'rgba(0,212,255,0.04)', color: 'var(--cyan)',
            border: '1px solid rgba(0,212,255,0.28)',
            borderRadius: '8px', fontWeight: 700, backdropFilter: 'blur(12px)',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.1)'; e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >Contact Me →</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: phase >= 5 ? 0.5 : 0, transition: 'opacity 1s 0.5s ease', zIndex: 3,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', color: 'var(--cyan)' }}>SCROLL</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--cyan), transparent)', animation: 'scrollLine 2.2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes badgePulse{0%,100%{opacity:1;box-shadow:0 0 8px var(--cyan)}50%{opacity:0.5;box-shadow:0 0 18px var(--cyan)}}
        @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top;opacity:0}40%{transform:scaleY(1);transform-origin:top;opacity:1}80%{transform:scaleY(1);transform-origin:bottom;opacity:1}100%{transform:scaleY(0);transform-origin:bottom;opacity:0}}
      `}</style>
    </section>
  );
}