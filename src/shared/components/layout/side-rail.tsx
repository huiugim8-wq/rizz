import Link from 'next/link';
import type { RailItem } from '@/shared/config/navigation';
import styles from './side-rail.module.css';

export const SideRail = ({
  items,
  active,
  className = '',
  activeClassName = styles.active,
}: {
  items: RailItem[];
  active: string;
  className?: string;
  activeClassName?: string;
}) => (
  <aside className={`${styles.rail} side-rail ${className}`.trim()}>
    {items.map(([label, href]) => (
      <Link
        className={label === active ? activeClassName : ''}
        href={href}
        prefetch={false}
        key={href}
      >
        {label}
      </Link>
    ))}
  </aside>
);
