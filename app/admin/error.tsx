'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="adminAuth adminStack">
      <h1>관리 화면을 불러오지 못했습니다.</h1>
      <p>저장 여부를 확인한 뒤 다시 시도해 주세요. 문제가 계속되면 담당자에게 문의해 주세요.</p>
      <button className="adminBtn" onClick={reset}>
        다시 시도
      </button>
    </div>
  );
}
