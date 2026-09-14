import styles from './site-footer.module.css';
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>
        글로우업리즈 주식회사
        <br />
        서울시 성동구 연무장19길 6<br />
        개인정보보호 책임자 : 윤승준
        <br />
        <a href="mailto:contact@glowuprizz.com">contact@glowuprizz.com</a>
      </p>
      <p className={styles.copyright}>© 2025 by GLOW UP RIZZ INC.</p>
    </footer>
  );
}
