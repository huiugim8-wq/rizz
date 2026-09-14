import { Shell } from '@/shared/components/layout/site-shell';
import { CopyButton } from '@/shared/components/ui/copy-button';
import { ContactForm } from './contact-form';
import { PageTitle } from '@/shared/components/layout/page-title';
import styles from './contact.module.css';

export function ContactPage() {
  const contacts = [
    ['아티스트 지원', 'artist@glowuprizz.com'],
    ['브랜드/광고 파트너십', 'partner@glowuprizz.com'],
    ['투자 파트너십', 'contact@glowuprizz.com'],
    ['언론보도', 'contact@glowuprizz.com'],
  ];
  return (
    <Shell className={styles.page}>
      <PageTitle title="CONTACT US" />
      <section className={styles.wrap}>
        <aside>
          <a href="#email">E-Mail</a>
          <a href="#homepage">Homepage</a>
        </aside>
        <div>
          <section id="email">
            <h2>E-Mail CONTACT</h2>
            <div className={styles.emailGrid}>
              {contacts.map(([label, email]) => (
                <article key={label}>
                  <div>
                    <span>{label}</span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                  <CopyButton value={email} />
                </article>
              ))}
            </div>
          </section>
          <section id="homepage" className={styles.homepage}>
            <h2>HOMEPAGE CONTACT</h2>
            <ContactForm />
          </section>
        </div>
      </section>
    </Shell>
  );
}
