import { useEffect, useRef } from 'react';

const categories = [
  {
    name: 'Backend', icon: '⚙️',
    techs: [
      { name: 'C#', color: '#9b4f96', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'C++', color: '#00599c', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Python', color: '#3776ab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'ASP.NET Core', color: '#512bd4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
  },
  {
    name: 'Mobile', icon: '📱',
    techs: [
      { name: '.NET MAUI', color: '#512bd4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'Flutter', color: '#54c5f8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    ],
  },
  {
    name: 'Frontend', icon: '🖥️',
    techs: [
      { name: 'React', color: '#61dafb', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Angular', color: '#dd0031', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'JavaScript', color: '#f7df1e', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind', color: '#38bdf8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    name: 'Databases', icon: '🗄️',
    techs: [
      { name: 'PostgreSQL', color: '#336791', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', color: '#4479a1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', color: '#47a248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
  {
    name: 'Cloud & Auth', icon: '☁️',
    techs: [
      { name: 'Azure AD', color: '#0078d4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'Render', color: '#46e3b7', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Vercel', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    ],
  },
  {
    name: 'DevOps & Tools', icon: '🔧',
    techs: [
      { name: 'Docker', color: '#2496ed', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Git', color: '#f05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Postman', color: '#ff6c37', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Figma', color: '#f24e1e', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Jira', color: '#0052cc', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
    ],
  },
];

function TechCard({ tech, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{
      opacity: 0,
      transform: 'translateY(24px) scale(0.95)',
      transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      padding: '22px 16px',
      background: 'rgba(13,20,36,0.8)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      cursor: 'default',
      position: 'relative', overflow: 'hidden',
      backdropFilter: 'blur(8px)',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget;
      el.style.borderColor = tech.color + '55';
      el.style.boxShadow = `0 8px 32px ${tech.color}15, 0 0 0 1px ${tech.color}25, inset 0 1px 0 ${tech.color}20`;
      el.style.transform = 'translateY(-6px) scale(1.03)';
      el.style.background = `rgba(13,20,36,0.95)`;
    }}
    onMouseLeave={e => {
      const el = e.currentTarget;
      el.style.borderColor = 'var(--border)';
      el.style.boxShadow = 'none';
      el.style.transform = 'translateY(0) scale(1)';
      el.style.background = 'rgba(13,20,36,0.8)';
    }}
    >
      {/* Shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(105deg, transparent 40%, ${tech.color}08 50%, transparent 60%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <img
        src={tech.icon} alt={tech.name} width="38" height="38"
        style={{ objectFit: 'contain', position: 'relative', zIndex: 1, transition: 'filter 0.3s' }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        color: 'var(--white-dim)', letterSpacing: '0.04em',
        textAlign: 'center', lineHeight: 1.3,
        position: 'relative', zIndex: 1,
        transition: 'color 0.3s',
      }}>{tech.name}</span>
    </div>
  );
}

export default function TechStack() {
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
    <section id="stack" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div ref={titleRef} className="reveal" style={{ marginBottom: '56px' }}>
          <p className="section-label">02 / Stack</p>
          <h2 className="section-title">Tech I work<span> with</span></h2>
          <p style={{ color: 'var(--white-muted)', fontSize: '15px', maxWidth: '500px', marginTop: '8px' }}>
            Technologies I use to build and ship products.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {categories.map((cat, ci) => (
            <div key={cat.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>{cat.name}</span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--border), transparent)', marginLeft: '8px' }} />
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '12px',
              }}>
                {cat.techs.map((tech, ti) => (
                  <TechCard key={tech.name} tech={tech} delay={(ci * 80) + (ti * 70)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}