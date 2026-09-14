import { Shell } from '@/shared/components/layout/site-shell';
import { referenceCases, referenceCategories, type ReferenceCase } from './reference-cases';
import { CommerceSectionLayout } from './commerce-section-layout';
import layoutStyles from './business.module.css';
import styles from './voices.module.css';

export function ReferencePage() {
  return (
    <Shell className={styles.commerceSubpage}>
      <CommerceSectionLayout active="Reference" className={layoutStyles.commerceReferenceLayout}>
        <section className={`${styles.referenceContent} ${layoutStyles.referenceContent}`}>
          {referenceCategories.map((label) => (
            <div className={styles.referenceGroup} key={label}>
              <h2>{label}</h2>
              <div className={`${styles.referenceCases} ${layoutStyles.referenceCases}`}>
                {referenceCases
                  .filter((item) => item.category === label)
                  .map((item) => (
                    <CaseCard item={item} key={item.title} />
                  ))}
              </div>
            </div>
          ))}
        </section>
      </CommerceSectionLayout>
    </Shell>
  );
}

function CaseCard({ item }: { item: ReferenceCase }) {
  return (
    <article>
      <img src={item.image} alt="" />
      <h3>{item.title}</h3>
      <div>
        <span>
          판매 수량 <b>{item.sales}</b>
        </span>
        <span>
          거래액 <b>{item.volume}</b>
        </span>
      </div>
    </article>
  );
}
