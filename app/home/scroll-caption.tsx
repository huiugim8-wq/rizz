'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type ScrollCaptionProps = {
  children: ReactNode;
  className?: string;
  mode?: 'hero' | 'enter';
};

export function ScrollCaption({ children, className, mode = 'enter' }: ScrollCaptionProps) {
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const caption = captionRef.current;
    const section = caption?.closest<HTMLElement>('[data-scroll-reveal-root]');

    if (!caption || !section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;

      if (reducedMotion.matches) {
        caption.style.opacity = '1';
        caption.style.transform = 'none';
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = mode === 'hero' ? viewportHeight * 0.08 : viewportHeight * 0.82;
      const distance = mode === 'hero' ? viewportHeight * 0.3 : viewportHeight * 0.38;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));

      caption.style.opacity = progress.toFixed(3);
      caption.style.transform = `translate3d(0, ${(1 - progress) * 40}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
    };
  }, [mode]);

  return (
    <div ref={captionRef} className={className} data-scroll-caption="">
      {children}
    </div>
  );
}
