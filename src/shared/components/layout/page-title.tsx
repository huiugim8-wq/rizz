import styles from './page-title.module.css';
export function PageTitle({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`${styles.root} ${className ?? ''}`}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
