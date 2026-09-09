'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  ['MCN', '/mcn'], ['Commerce', '/commerce'], ['Academy', '/academy'],
  ['Property', '/property'], ['F&B', '/seogyodak-2'],
  ['Community', '/news'], ['Career', '/career'],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const active = (href: string) => pathname === href ||
    (href === '/mcn' && ['/management', '/voice-artist'].includes(pathname)) ||
    (href === '/commerce' && ['/partners', '/reference', '/voice-brand'].includes(pathname)) ||
    (href === '/seogyodak-2' && ['/seogyodak', '/sushijun-1', '/ekiudon-1'].includes(pathname)) ||
    (href === '/news' && ['/news-2', '/event-1'].includes(pathname));
  return (
    <header className="site-header">
      <Link className="site-logo" href="/" aria-label="Glow Up Rizz home"><img src="/rizz-symbol.png" alt="" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(([label, href]) => <Link className={active(href) ? 'active' : ''} href={href} key={href}>{label}</Link>)}
      </nav>
      <Link className="contact-pill desktop-only" href="/contactus"><span>Contact</span><i>↗</i></Link>
      <button className={`menu-button ${open ? 'open' : ''}`} type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href]) => <Link onClick={() => setOpen(false)} className={active(href) ? 'active' : ''} href={href} key={href}>{label}</Link>)}
        </nav>
        <Link onClick={() => setOpen(false)} className="contact-pill" href="/contactus"><span>Contact</span><i>↗</i></Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><p>글로우업리즈 주식회사<br />서울시 성동구 연무장19길 6<br />개인정보보호 책임자 : 윤승준<br /><a href="mailto:contact@glowuprizz.com">contact@glowuprizz.com</a></p><p className="copyright">© 2025 by GLOW UP RIZZ INC.</p></footer>;
}

export function Shell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="copy-button" onClick={async () => { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }}><span>▣</span>{copied ? 'Copied' : 'Copy'}</button>;
}
