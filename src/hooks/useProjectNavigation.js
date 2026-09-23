import { useEffect } from 'react';

export default function useProjectNavigation() {
  useEffect(() => {
    let disposed = false;
    let interacted = false;
    const initialHash = window.location.hash;
    const scrollToProject = () => {
      document.querySelectorAll('.project-link-target').forEach(el => el.classList.remove('project-link-target'));
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      const target = document.getElementById(id);
      if (!target?.hasAttribute('data-project')) return;
      target.classList.add('project-link-target');
      // React mounts the target after the browser's initial fragment lookup.
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    const frame = requestAnimationFrame(scrollToProject);
    const noteInteraction = () => { interacted = true; };
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach(event => window.addEventListener(event, noteInteraction, { passive: true }));
    window.addEventListener('hashchange', scrollToProject);
    // Font loading can shift the sections above the destination.
    document.fonts?.ready.then(() => {
      if (!disposed && !interacted && window.location.hash === initialHash) scrollToProject();
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', scrollToProject);
      events.forEach(event => window.removeEventListener(event, noteInteraction));
    };
  }, []);
}
