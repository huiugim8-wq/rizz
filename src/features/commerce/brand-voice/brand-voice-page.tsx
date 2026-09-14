import { Shell } from '@/shared/components/layout/site-shell';
import { CommerceSectionLayout } from '@/features/commerce/commerce-section-layout';
import { brandVoices } from './voice-content';
import voiceStyles from '../voices.module.css';
import styles from './brand-voice.module.css';

export function VoiceBrandPage() {
  return (
    <Shell className={`${voiceStyles.voicePage} ${styles.voicePage} ${styles.brandVoice}`}>
      <CommerceSectionLayout active="Voice" className={styles.brandVoiceHeading}>
        <section
          className={`${voiceStyles.voiceIntro} ${styles.voiceIntro}`}
          aria-labelledby="brand-voice-title"
        >
          <h1 id="brand-voice-title">Voice of Brand</h1>
          <p>RIZZ의 콘텐츠 커머스와 함께한 브랜드 파트너의 이야기입니다.</p>
          <nav className={styles.brandVoiceLinks} aria-label="브랜드 인터뷰 바로가기">
            {brandVoices.map((v, i) => (
              <a href={`/voice-brand#brand-voice-${i + 1}`} key={v.name}>
                {v.name}
                <span aria-hidden="true">↘</span>
              </a>
            ))}
          </nav>
        </section>
      </CommerceSectionLayout>
      {brandVoices.map((v, i) => (
        <section
          className={`${voiceStyles.voiceStory} ${styles.voiceStory} ${i % 2 ? voiceStyles.reverse : ''}`}
          id={`brand-voice-${i + 1}`}
          key={v.name}
          aria-label={v.name}
        >
          <img
            src={
              v.story.startsWith('/')
                ? v.story
                : `https://static.wixstatic.com/media/${v.story}/v1/fill/w_1280,h_1510,al_c,q_85,enc_avif,quality_auto/brand-story.jpg`
            }
            alt={v.name}
          />
          <div>
            <small>VOICE OF BRAND · {v.name}</small>
            <h2>{v.title}</h2>
            <p>{v.copy}</p>
            <div className={`${voiceStyles.voiceStats} ${styles.voiceStats} ${voiceStyles.four}`}>
              {v.stats.map((s) => (
                <b key={s}>{s}</b>
              ))}
            </div>
          </div>
        </section>
      ))}
    </Shell>
  );
}
