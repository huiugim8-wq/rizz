'use client';

import { useState, type FormEvent } from 'react';
import styles from './contact-form.module.css';

export function ContactForm() {
  const [opened, setOpened] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`[홈페이지 문의] ${f.get('type')}`);
    const body = encodeURIComponent(
      `이름: ${f.get('name')}\n회사: ${f.get('company')}\n연락처: ${f.get('phone')}\n이메일: ${f.get('email')}\n\n${f.get('message')}`,
    );
    window.location.href = `mailto:contact@glowuprizz.com?subject=${subject}&body=${body}`;
    setOpened(true);
  };
  return (
    <form className={styles.form} onSubmit={submit}>
      <label className={styles.selectField}>
        <span>문의 유형</span>
        <select name="type" required defaultValue="">
          <option value="" disabled>
            선택하기
          </option>
          <option>아티스트 지원</option>
          <option>브랜드/광고 파트너십</option>
          <option>투자 파트너십</option>
          <option>언론보도</option>
        </select>
      </label>
      <div>
        <label>
          <span>이름*</span>
          <input name="name" required maxLength={100} />
        </label>
        <label>
          <span>회사명</span>
          <input name="company" maxLength={100} />
        </label>
      </div>
      <div>
        <label>
          <span>연락처*</span>
          <input name="phone" required maxLength={100} />
        </label>
        <label>
          <span>이메일</span>
          <input name="email" type="email" maxLength={200} />
        </label>
      </div>
      <label>
        <span>내용*</span>
        <textarea name="message" required rows={8} maxLength={3000} />
      </label>
      <button type="submit">메일로 문의하기</button>
      {opened && (
        <p className={styles.success} role="status">
          메일 앱에서 보내기를 눌러 주세요. 메일 앱이 열리지 않으면 contact@glowuprizz.com으로 직접
          보내실 수 있습니다.
        </p>
      )}
    </form>
  );
}
