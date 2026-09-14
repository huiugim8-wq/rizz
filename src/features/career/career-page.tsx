import { Shell } from '@/shared/components/layout/site-shell';
import { PageTitle } from '@/shared/components/layout/page-title';
import styles from './career.module.css';

const careerAssets = [
  ['dc99e3_256a43dd5a8b42eaa8656b40c866e952~mv2.webp', '06.webp', '981'],
  ['dc99e3_bdad84f8347140c4b2a40215550c5a1a~mv2.webp', '08-.webp', '1720'],
  ['dc99e3_8ca00f1c93584fa18677d10720d8b8a8~mv2.webp', '대지_1.webp', '769'],
  ['dc99e3_b5cb159fb4804414bea076ee7a20888c~mv2.webp', '09.webp', '162'],
  ['dc99e3_e29ba50b4a974d358f259ebfdfd3a31f~mv2.webp', '대지_3.webp', '236'],
] as const;

export function CareerPage() {
  return (
    <Shell className={styles.page}>
      <PageTitle title="Career" className={styles.title} />
      <section className={styles.assets}>
        {careerAssets.map(([id, name, height]) => (
          <img
            key={id}
            src={`https://static.wixstatic.com/media/${id}/v1/fill/w_688,h_${height},al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/${encodeURIComponent(name)}`}
            alt="Glow Up Rizz career"
          />
        ))}
      </section>
    </Shell>
  );
}
