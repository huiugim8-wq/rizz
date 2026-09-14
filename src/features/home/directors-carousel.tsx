'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './directors.module.css';

import { directors } from './directors-content';

export function DirectorsCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ start: 0, scroll: 0, moved: false, active: false });
  const [position, setPosition] = useState({ start: true, end: false });
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () =>
      setPosition({
        start: element.scrollLeft < 2,
        end: element.scrollLeft >= element.scrollWidth - element.clientWidth - 2,
      });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', update);
    };
  }, []);

  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement;
    const step = card.offsetWidth + parseFloat(getComputedStyle(element).gap);
    element.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };

  return (
    <section className={styles.directors} aria-labelledby="directors-title">
      <header className={styles.directorsHeader}>
        <h2 id="directors-title">CREATIVE DIRECTORS</h2>
        <div className={styles.carouselControls}>
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={position.start}
            aria-label="이전 디렉터"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={position.end}
            aria-label="다음 디렉터"
          >
            →
          </button>
        </div>
      </header>
      <div
        ref={track}
        className={styles.directorTrack}
        tabIndex={0}
        role="region"
        aria-label="디렉터 목록, 좌우 화살표로 탐색"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          drag.current = {
            start: event.clientX,
            scroll: event.currentTarget.scrollLeft,
            moved: false,
            active: true,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current.active) return;
          const distance = event.clientX - drag.current.start;
          if (Math.abs(distance) > 5) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.dataset.dragging = 'true';
            event.currentTarget.scrollLeft = drag.current.scroll - distance;
          }
        }}
        onPointerUp={(event) => {
          drag.current.active = false;
          delete event.currentTarget.dataset.dragging;
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {directors.map((director) => (
          <article className={styles.directorCard} key={director.id}>
            <button
              type="button"
              className={styles.directorPortrait}
              aria-label={`${director.name} 소개`}
              aria-expanded={expanded === director.id}
              aria-controls={`director-${director.id}`}
              onClick={() => setExpanded(expanded === director.id ? null : director.id)}
            >
              <img
                src={`/directors/${director.id}.jpg`}
                alt={director.name}
                loading="lazy"
                draggable={false}
                width={700}
                height={850}
              />
              <span className={styles.directorDetail} id={`director-${director.id}`}>
                <span>{director.detail}</span>
              </span>
              <span className={styles.directorMore} aria-hidden="true">
                {expanded === director.id ? '−' : '+'}
              </span>
            </button>
            <h3>{director.name}</h3>
            <p>{director.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
