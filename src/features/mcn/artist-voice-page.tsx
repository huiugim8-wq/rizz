import { Shell } from '@/shared/components/layout/site-shell';
import { SideRail } from '@/shared/components/layout/side-rail';
import { mcnRail } from '@/shared/config/navigation';
import { artistVoices } from './artist-voice-content';
import styles from '@/features/commerce/voices.module.css';
import layoutStyles from '@/features/commerce/business.module.css';

export function VoiceArtistPage() {
  return (
    <Shell className={`${styles.voicePage} ${styles.artistVoice}`}>
      <SideRail
        items={mcnRail}
        active="Voice"
        className={`${styles.sideRail} ${layoutStyles.sideRail}`}
      />
      <section className={styles.voiceIntro}>
        <h1>Voice of Artist</h1>
        <p>RIZZ와 함께 성장한 아티스트의 이야기를 소개합니다.</p>
        <div>
          {artistVoices.map((v) => (
            <a href={`#${v.name}`} key={v.name}>
              <img
                src={`https://static.wixstatic.com/media/${v.portrait}/v1/fill/w_512,h_684,al_c,q_85,enc_avif,quality_auto/voice.jpg`}
                alt={v.name}
              />
              <b>{v.name}</b>
            </a>
          ))}
        </div>
      </section>
      {artistVoices.map((v, i) => (
        <section
          className={`${styles.voiceStory} ${i % 2 ? styles.reverse : ''}`}
          id={v.name}
          key={v.name}
        >
          <img
            src={`https://static.wixstatic.com/media/${v.image}/v1/fill/w_1280,h_1114,al_c,q_85,enc_avif,quality_auto/story.jpg`}
            alt={v.name}
          />
          <div>
            <small>VOICE OF ARTIST</small>
            <h2>{v.title}</h2>
            <p>{v.copy}</p>
            <div className={styles.voiceStats}>
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
