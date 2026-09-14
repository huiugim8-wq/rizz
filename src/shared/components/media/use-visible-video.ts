'use client';

import { useCallback, useEffect, useState, type RefObject } from 'react';

/** Suspend offscreen playback and expose a user gesture when autoplay is refused. */
export function useVisibleVideo(ref: RefObject<HTMLVideoElement | null>) {
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const play = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    void video
      .play()
      .then(() => setPlaybackBlocked(false))
      .catch((error: DOMException) => {
        if (error.name === 'NotAllowedError') setPlaybackBlocked(true);
      });
  }, [ref]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const update = () => {
      if (visible && !document.hidden) play();
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [ref, play]);
  return { playbackBlocked, play };
}
