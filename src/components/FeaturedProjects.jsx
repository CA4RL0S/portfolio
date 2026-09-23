import { useEffect, useRef, useState } from 'react';
import featuredProjects from '../data/featuredProjects';
import './FeaturedProjects.css';

const imageUrl = image => `${process.env.PUBLIC_URL || ''}${image.src}`;

function ScreenshotViewer({ selection, onClose, onNavigate }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => {
    dialogRef.current.close();
    onClose();
  };

  const { project, index } = selection;
  const image = project.images[index];

  return (
    <dialog
      ref={dialogRef}
      className="project-viewer"
      aria-labelledby="viewer-title"
      onCancel={event => { event.preventDefault(); close(); }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); onNavigate(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); onNavigate(-1); }
      }}
    >
      <div className="project-viewer-header">
        <h3 id="viewer-title">{project.name}</h3>
        <button type="button" className="project-control" onClick={close} autoFocus aria-label="Close screenshot viewer">Close ×</button>
      </div>
      <figure>
        <img src={imageUrl(image)} alt={`${project.name}: ${image.caption}`} width={image.width} height={image.height} />
        <figcaption aria-live="polite">{image.caption}</figcaption>
      </figure>
      <div className="project-viewer-controls">
        <button type="button" className="project-control" onClick={() => onNavigate(-1)} aria-label="Previous screenshot">← Previous</button>
        <span aria-live="polite">{index + 1} / {project.images.length}</span>
        <button type="button" className="project-control" onClick={() => onNavigate(1)} aria-label="Next screenshot">Next →</button>
      </div>
    </dialog>
  );
}

function FeaturedProject({ project, number, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = project.images[activeIndex];

  return (
    <article className="featured-project" style={{ '--project-accent': project.accent }} aria-labelledby={`${project.id}-title`}>
      <div className="featured-project-heading">
        <span className="featured-project-number">{number}</span>
        <p>{project.category}</p>
        <span className="featured-project-type">Web application</span>
      </div>
      <div className="featured-project-content">
        <div className="featured-project-copy">
          <h3 id={`${project.id}-title`}>{project.name}</h3>
          <p className="featured-project-tagline">{project.title}</p>
          <p className="featured-project-description">{project.description}</p>
          <ul className="project-features">
            {project.features.map(feature => (
              <li key={feature.title}><h4>{feature.title}</h4><p>{feature.text}</p></li>
            ))}
          </ul>
        </div>
        <div className="project-gallery">
          <figure>
            <button type="button" className="project-preview" onClick={event => onOpen(project, activeIndex, event.currentTarget)} aria-label={`Enlarge ${project.name}: ${activeImage.caption}`}>
              <div className="project-preview-chrome" aria-hidden="true"><span /><span /><span /><span className="project-preview-name">{project.name}</span></div>
              <img src={imageUrl(activeImage)} alt={`${project.name}: ${activeImage.caption}`} width={activeImage.width} height={activeImage.height} loading="lazy" decoding="async" />
              <span className="project-preview-hint">View full screen ↗</span>
            </button>
            <figcaption aria-live="polite"><span>{activeImage.caption}</span><span>{activeIndex + 1} / {project.images.length}</span></figcaption>
          </figure>
          <div className="project-thumbnails" role="group" aria-label={`${project.name} screenshots`}>
            {project.images.map((image, index) => (
              <button type="button" key={image.src} className="project-thumbnail" aria-label={`Show ${image.caption}`} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)} title={image.caption}>
                <img src={imageUrl(image)} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <button type="button" className="project-gallery-link" onClick={event => onOpen(project, activeIndex, event.currentTarget)}>Explore {project.images.length} screens <span aria-hidden="true">↗</span></button>
        </div>
      </div>
      <div className="project-stack">
        {project.stack.map(group => (
          <div className="project-stack-group" key={group.label}>
            <h4>{group.label}</h4>
            <ul>{group.items.map(tech => <li key={tech}>{tech}</li>)}</ul>
          </div>
        ))}
        {project.stackNote && <p className="project-stack-note">{project.stackNote}</p>}
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const [selection, setSelection] = useState(null);
  const triggerRef = useRef(null);
  const openViewer = (project, index, trigger) => {
    triggerRef.current = trigger;
    setSelection({ project, index });
  };
  const closeViewer = () => {
    setSelection(null);
    triggerRef.current?.focus();
  };
  const navigate = delta => setSelection(current => ({
    ...current,
    index: (current.index + delta + current.project.images.length) % current.project.images.length,
  }));

  return (
    <>
      <div className="featured-projects">
        {featuredProjects.map((project, index) => <FeaturedProject key={project.id} project={project} number={`0${index + 1}`} onOpen={openViewer} />)}
      </div>
      {selection && <ScreenshotViewer selection={selection} onClose={closeViewer} onNavigate={navigate} />}
    </>
  );
}
