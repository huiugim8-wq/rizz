'use client';

import Image from 'next/image';
import { useRef } from 'react';
import styles from './property.module.css';

export function PropertyProjectShowcase() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className={styles.projects} aria-labelledby="projects-title">
      <header className={styles.projectsHeader}>
        <h2 id="projects-title">SPACE BRANDING</h2>
        <span>1건</span>
      </header>

      <button
        className={styles.projectTile}
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <span className={styles.tileImage}>
          <Image src="/property/after.jpg" alt="" fill sizes="(max-width: 700px) 100vw, 390px" />
          <span className={styles.tileNumber}>01</span>
        </span>
        <span className={styles.tileCopy}>
          <span>오피스</span>
          <strong>글로우업리즈 성수 사옥</strong>
          <span className={styles.tileResult}>매입 137억 → 현재 탁상감정 240억</span>
          <small>서울 성동구</small>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.projectDialog}
        aria-labelledby="project-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className={styles.dialogPanel}>
          <button
            className={styles.dialogClose}
            type="button"
            aria-label="상세 정보 닫기"
            onClick={() => dialogRef.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className={styles.dialogImage}>
            <Image
              src="/property/after.jpg"
              alt="글로우업리즈 성수 사옥 전경"
              fill
              sizes="(max-width: 760px) 100vw, 58vw"
            />
            <span className={styles.imageCount}>01 / 01</span>
          </div>

          <div className={styles.dialogDetails}>
            <p>오피스</p>
            <h2 id="project-dialog-title">글로우업리즈 성수 사옥</h2>

            <div className={styles.resultLine} aria-label="개발 결과">
              <span>137억</span>
              <b>+</b>
              <span>20억</span>
              <b>→</b>
              <strong>240억</strong>
            </div>

            <dl className={styles.projectFacts}>
              <div>
                <dt>위치</dt>
                <dd>서울 성동구 연무장19길 6</dd>
              </div>
              <div>
                <dt>매입</dt>
                <dd>137억원</dd>
              </div>
              <div>
                <dt>리모델링</dt>
                <dd>20억원</dd>
              </div>
              <div>
                <dt>현재 탁상감정</dt>
                <dd>240억원</dd>
              </div>
            </dl>

            <a
              className={styles.dialogMap}
              href="https://map.kakao.com/link/search/서울 성동구 연무장19길 6"
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.dialogMapImage}>
                <Image
                  src="/property/location-map.svg"
                  alt="서울 성동구 연무장19길 6 위치 약도"
                  fill
                  sizes="260px"
                />
              </span>
              <span>
                지도에서 보기 <b aria-hidden="true">↗</b>
              </span>
            </a>
          </div>
        </div>
      </dialog>
    </section>
  );
}
