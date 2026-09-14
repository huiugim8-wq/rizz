import type { ReactNode } from 'react';
import { SideRail } from '@/shared/components/layout/side-rail';
import { commerceRail } from '@/shared/config/navigation';
import styles from './business.module.css';

export function CommerceSectionLayout({
  active,
  children,
  className = '',
}: {
  active: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.commerceSectionLayout} ${className}`.trim()}>
      <SideRail items={commerceRail} active={active} className={styles.sideRail} />
      <div className={styles.commerceSectionContent}>{children}</div>
    </div>
  );
}
