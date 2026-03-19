import { useRef, useEffect, useState } from 'react';

const projects = [
  {
    name: 'KioskApp',
    desc: 'A C# API with a PostgreSQL database and an administrative panel built in React. Designed for kiosk-style point-of-sale interactions.',
    tech: ['C#', 'ASP.NET Core', 'PostgreSQL', 'React'],
    accent: '#00d4ff',
    icon: '🖥️',
    status: 'Completed',
    number: '01',
  },
  {
    name: 'EvaluatorApp',
    desc: 'Web system for evaluating student projects with role-based access. Includes reviewer dashboards, scoring rubrics, and reporting tools.',
    tech: ['ASP.NET Core', 'PostgreSQL', 'React', 'Docker'],
    accent: '#fb923c',
    icon: '🏆',
    status: 'In Progress',
    number: '02',
  },
  {
    name: 'Cycling App',
    desc: 'Mobile app built in Flutter integrated with smartwatches for real-time heart rate monitoring and GPS tracking during cycling sessions.',
    tech: ['Flutter', 'Bluetooth LE', 'GPS', 'Smartwatch API'],
    accent: '#34d399',
    icon: '🚴',
    status: 'In Progress',
    number: '03',
  },
  {
    name: 'StudentApp',
    desc: 'Mobile application integrating Microsoft Authentication (MSAL / Azure AD) for secure SSO login with role-based access control and token management.',
    tech: ['.NET MAUI', 'MSAL', 'Azure AD'],
    accent: '#a78bfa',
    icon: '🎓',
    status: 'Completed',
    number: '04',
  },
];

function ProjectCard({ project, delay }) {
  const cardRef = useRef(null);
  const wrapRef = useRef(null);
  const spotRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -7;
    const rotateY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    if (spot) {
      spot.style.background = `radial-gradient(200px circle at ${x}px ${y}px, ${project.accent}12, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    setHovered(false);
  };

  return (
    <div ref={wrapRef} style={{
      opacity: 0, transform: 'translateY(32px)',
      transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'linear-gradient(145deg, #0d1424 0%, #0f1826 100%)',
          border: `1px solid ${hovered ? project.accent + '40' : 'rgba(0,212,255,0.08)'}`,
          borderRadius: '18px', padding: '28px',
          transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s',
          boxShadow: hovered
            ? `0 24px 64px ${project.accent}12, 0 0 0 1px ${project.accent}20`
            : '0 4px 24px rgba(0,0,0,0.3)',
          position: 'relative', overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Spotlight */}
        <div ref={spotRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, transition: 'background 0.1s' }} />

        {/* Animated top border line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.accent}${hovered ? 'cc' : '30'}, transparent)`,
          transition: 'background 0.4s',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.accent, opacity: 0.5, letterSpacing: '0.1em' }}>{project.number}</span>
              <span style={{
                fontSize: '28px',
                filter: hovered ? `drop-shadow(0 0 12px ${project.accent}80)` : 'none',
                transition: 'filter 0.3s',
              }}>{project.icon}</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              padding: '4px 10px', borderRadius: '20px',
              color: project.accent, background: project.accent + '12',
              border: `1px solid ${project.accent}25`, letterSpacing: '0.08em',
            }}>{project.status}</span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: '21px', fontWeight: 700,
            color: hovered ? 'var(--white)' : 'var(--white-dim)',
            marginBottom: '10px', transition: 'color 0.3s',
          }}>{project.name}</h3>

          <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--white-muted)', marginBottom: '22px' }}>{project.desc}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                padding: '4px 10px', borderRadius: '4px',
                background: hovered ? `${project.accent}08` : 'rgba(0,0,0,0.3)',
                border: `1px solid ${hovered ? project.accent + '30' : 'var(--border)'}`,
                color: hovered ? project.accent + 'cc' : 'var(--white-muted)',
                letterSpacing: '0.05em', transition: 'all 0.3s',
              }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            {[{ label: 'GitHub', icon: '⬡' }, { label: 'Demo', icon: '↗' }].map(link => (
              <button key={link.label} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: hovered ? project.accent : 'var(--white-muted)',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.3s',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = '10px'; }}
              onMouseLeave={e => { e.currentTarget.style.gap = '6px'; }}
              ><span>{link.icon}</span> {link.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div ref={titleRef} className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">03 / Projects</p>
          <h2 className="section-title">Featured <span>work</span></h2>
          <p style={{ color: 'var(--white-muted)', fontSize: '15px', maxWidth: '500px', marginTop: '8px' }}>
            Things I've built, shipped, and learned from.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '24px' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}