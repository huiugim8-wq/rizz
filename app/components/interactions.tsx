'use client';

import { FormEvent, useState } from 'react';

export function Carousel({ images, labels }: { images: string[]; labels?: string[] }) {
  const [current, setCurrent] = useState(0);
  return <div className="carousel">
    <button className="carousel-arrow prev" type="button" aria-label="Previous" onClick={() => setCurrent(v => (v - 1 + images.length) % images.length)}>←</button>
    <div className="carousel-frame"><img src={images[current]} alt={labels?.[current] || `Slide ${current + 1}`} /></div>
    <button className="carousel-arrow next" type="button" aria-label="Next" onClick={() => setCurrent(v => (v + 1) % images.length)}>→</button>
    {labels && <p>{labels[current]}</p>}
    <div className="carousel-dots">{images.map((_, i) => <button type="button" aria-label={`Slide ${i + 1}`} className={i === current ? 'active' : ''} onClick={() => setCurrent(i)} key={i} />)}</div>
  </div>;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return <form onSubmit={submit}>
    <label className="select-field"><span>문의 유형</span><select required defaultValue=""><option value="" disabled>선택하기</option><option>아티스트 지원</option><option>브랜드/광고 파트너십</option><option>투자 파트너십</option><option>언론보도</option></select></label>
    <div><label><span>이름*</span><input required /></label><label><span>회사명</span><input /></label></div>
    <div><label><span>연락처*</span><input required /></label><label><span>이메일</span><input type="email" /></label></div>
    <label><span>내용*</span><textarea required rows={8} /></label>
    <button type="submit">{sent ? '제출 완료' : '제출'}</button>
    {sent && <p className="form-success" role="status">문의가 접수되었습니다.</p>}
  </form>;
}
