'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigation } from '@/shared/config/navigation';
import { SlideLink } from '@/shared/components/navigation/slide-navigation';
import styles from './site-header.module.css';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);
  const active = (href: string) =>
    pathname === href ||
    (href === '/mcn' && ['/management', '/voice-artist'].includes(pathname)) ||
    (href === '/commerce' && ['/partners', '/reference', '/voice-brand'].includes(pathname)) ||
    (href === '/seogyodak-2' && ['/seogyodak', '/sushijun-1', '/ekiudon-1'].includes(pathname)) ||
    (href === '/news' && ['/news-2', '/event-1'].includes(pathname));
  return (
    <header className={`${styles.header} site-header`} data-menu-open={open}>
      <Link className={styles.logo} href="/" prefetch={false} aria-label="Glow Up Rizz home">
        <img
          className={`${styles.mark} rizz-mark`}
          src="/brand/rizz-logo.svg"
          width={72}
          height={51}
          alt=""
        />
      </Link>
      <nav className={`${styles.desktopNav} desktop-nav`} aria-label="Main navigation">
        {navigation.map(([label, href]) =>
          href === '/mcn' && pathname === '/' ? (
            <SlideLink href={href} prefetch={false} key={href}>
              {label}
            </SlideLink>
          ) : (
            <Link
              className={active(href) ? styles.active : ''}
              href={href}
              prefetch={false}
              key={href}
            >
              {label}
            </Link>
          ),
        )}
      </nav>
      <button
        className={`${styles.menuButton} menu-button ${open ? styles.open : ''}`}
        type="button"
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        aria-controls="mobile-navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        id="mobile-navigation"
        inert={!open}
        className={`${styles.mobileMenu} mobile-menu ${open ? styles.open : ''}`}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href]) => (
            <Link
              onClick={() => setOpen(false)}
              className={active(href) ? styles.active : ''}
              href={href}
              prefetch={false}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
