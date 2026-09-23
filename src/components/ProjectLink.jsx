import { useEffect, useRef, useState } from 'react';

export default function ProjectLink({ id, name }) {
  const [status, setStatus] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);
  useEffect(() => {
    if (manualUrl) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [manualUrl]);

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.hash = id;
    clearTimeout(timerRef.current);
    try {
      await navigator.clipboard.writeText(url.href);
      setManualUrl('');
      setStatus('Link copied');
      timerRef.current = setTimeout(() => setStatus(''), 3000);
    } catch {
      setManualUrl(url.href);
      setStatus('Select and copy this link:');
    }
  };

  return (
    <div className="project-share">
      <div className="project-share-actions">
        <a href={`#${id}`} aria-label={`Direct link to ${name}`}>Direct link ↗</a>
        <button type="button" onClick={copyLink} aria-label={`Copy link to ${name}`}>Copy link</button>
      </div>
      <span className="project-share-status" role="status">{status}</span>
      {manualUrl && <input ref={inputRef} className="project-share-url" aria-label={`Shareable link to ${name}`} readOnly value={manualUrl} onFocus={event => event.target.select()} />}
    </div>
  );
}
