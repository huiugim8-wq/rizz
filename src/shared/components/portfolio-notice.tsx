'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import styles from './portfolio-notice.module.css';

const STORAGE_KEY = 'rizz-portfolio-notice-seen';
const subscribe = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function PortfolioNotice() {
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const open = mounted && !dismissed && !sessionStorage.getItem(STORAGE_KEY);

  const close = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [close, open]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={close}>
      <section
        className={styles.notice}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-notice-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <p className={styles.eyebrow}>PORTFOLIO WEBSITE</p>
        <h2 id="portfolio-notice-title">포트폴리오용으로 제작된 데모 사이트입니다.</h2>
        <p>상단 메뉴의 Admin에서 최고 관리자 기능을 직접 체험할 수 있습니다.</p>
        <button type="button" autoFocus onClick={close}>
          사이트 둘러보기
        </button>
      </section>
    </div>
  );
}
