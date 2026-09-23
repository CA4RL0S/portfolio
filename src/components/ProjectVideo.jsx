import { useEffect, useRef } from 'react';

export default function ProjectVideo({ src, poster, title, suspended = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !suspended) {
        // Native controls remain available if the browser blocks autoplay.
        const playback = video.play();
        if (playback) playback.catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
      syncPlayback();
    }, { threshold: [0, 0.3] });
    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [src, suspended]);

  return (
    <video ref={videoRef} className="project-demo-video" src={src} poster={poster}
      aria-label={`${title} app walkthrough`} width="384" height="848"
      muted playsInline loop controls preload="none">
      Your browser does not support this video. <a href={src}>Download the walkthrough</a>.
    </video>
  );
}
