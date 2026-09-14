import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
