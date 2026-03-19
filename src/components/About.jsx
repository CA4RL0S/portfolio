import { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import useAnimatedCounter from '../hooks/useAnimatedCounter';

function TypedParagraph({ text, delay = 0, speed = 18 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setTimeout(() => setStarted(true), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, started]);

  useEffect(() => {
    if (!started || done) return;
    if (displayed.length >= text.length) { setDone(true); return; }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed, done]);

  return (
    <p ref={ref} style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--white-dim)', minHeight: '3.6em' }}>
      {displayed}
      {started && !done && (
        <span style={{
          display: 'inline-block', width: '2px', height: '1em',
          background: 'var(--cyan)', verticalAlign: 'text-bottom',
          marginLeft: '2px', animation: 'cursorBlink 0.6s step-end infinite',
        }} />
      )}
    </p>
  );
}

function StatRow({ label, value, suffix = '', decimals = 0, isStatic = false }) {
  const [count, ref] = useAnimatedCounter(isStatic ? 0 : value, 1400, decimals);

  return (
    <div ref={ref} style={{
      display: 'flex', justifyContent: 'space-between',
      width: '100%', padding: '10px 0',
      borderBottom: '1px solid rgba(0,212,255,0.07)',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '12px',
        color: 'var(--white-muted)', letterSpacing: '0.1em',
      }}>{label}</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '13px',
        fontWeight: 700, color: 'var(--cyan)',
      }}>
        {isStatic ? value : `${decimals > 0 ? count.toFixed(decimals) : count}${suffix}`}
      </span>
    </div>
  );
}

function Avatar() {
  return (
    <div style={{
      position: 'relative',
      width: '100%', maxWidth: '340px',
      margin: '0 auto',
    }}>
      {/* Decorative grid */}
      <div style={{
        position: 'absolute', inset: '-20px',
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        zIndex: 0, borderRadius: '16px',
      }} />

      {/* Avatar box */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(135deg, #0d1424 0%, #111827 100%)',
        border: '1px solid rgba(0,212,255,0.2)',
        borderRadius: '16px',
        padding: '40px 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        boxShadow: '0 0 60px rgba(0,212,255,0.06)',
      }}>
        {/* Avatar circle */}
        <div style={{
          width: '120px', height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))',
          border: '2px solid rgba(0,212,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '48px',
          boxShadow: '0 0 30px rgba(0,212,255,0.15)',
        }}>
          🧑‍💻
        </div>

        {/* Animated stats */}
        <StatRow label="GPA" value={9.0} suffix="" decimals={1} />
        <StatRow label="Projects" value={4} suffix="+" />
        <StatRow label="Semester" value={5} suffix="th" />
        <StatRow label="University" value="UTM" isStatic />

        <div style={{
          width: '100%', padding: '10px 0',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--white-muted)', letterSpacing: '0.1em' }}>Location</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)' }}>📍 Mérida, MX</span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useScrollReveal();
  const ref2 = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">01 / About</p>
          <h2 className="section-title">Who am I<span>?</span></h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Left: text */}
          <div ref={ref2} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TypedParagraph
              text="Hey, I'm Carlos Rivas — a software development student at Universidad Tecnológica Metropolitana (UTM) in Mérida, México. Currently in my 5th semester of Multiplatform Software Development, specializing in building efficient solutions from prototyping to deployment."
              delay={0}
              speed={16}
            />
            <TypedParagraph
              text="I have a strong background in multiplatform app development and databases, complemented by Google and Cisco certifications. I focus on clean architecture, TDD methodologies, and API testing with Postman."
              delay={100}
              speed={16}
            />
            <TypedParagraph
              text="My core stack includes C#, .NET MAUI, Flutter, and the MERN stack. I also work with Azure AD authentication, PostgreSQL, and deployments on Render and Vercel."
              delay={200}
              speed={16}
            />

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {['TDD', 'API Design', 'Clean Architecture', 'Postman', 'Always Building'].map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  padding: '6px 14px',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  color: 'var(--white-dim)',
                  background: 'var(--cyan-dim)',
                  letterSpacing: '0.05em',
                }}>{tag}</span>
              ))}
            </div>

            {/* Certifications */}
            <div style={{
              marginTop: '8px',
              padding: '20px',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              background: 'rgba(0,212,255,0.02)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: 'var(--cyan)', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginBottom: '14px',
              }}>Certifications</p>
              {[
                { icon: '🎓', text: 'Google Professional Certificate — Mobile App Development' },
                { icon: '🌐', text: 'Cisco Networking Academy — CCNA 1 & 2' },
                { icon: '🎨', text: 'UX Design Fundamentals & Responsive Web Design' },
              ].map(c => (
                <div key={c.text} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  marginBottom: '10px',
                }}>
                  <span style={{ fontSize: '14px', flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ fontSize: '13px', color: 'var(--white-muted)', lineHeight: 1.5 }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: avatar */}
          <Avatar />
        </div>
      </div>
    </section>
  );
}