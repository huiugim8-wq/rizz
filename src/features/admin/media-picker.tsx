'use client';
import { useState } from 'react';
import { mediaList, deleteMedia } from './actions';
import { Button, Dialog } from './ui';
export function MediaPicker({
  image,
  onChange,
  onBusyChange,
  disabled = false,
}: {
  image: string;
  onBusyChange?: (busy: boolean) => void;
  onChange: (image: string, id: string) => void;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState(''),
    [open, setOpen] = useState(false),
    [items, setItems] = useState<{ id: string; url: string }[]>([]);
  async function upload(file?: File) {
    if (!file || disabled) return;
    setBusy(true);
    onBusyChange?.(true);
    setMessage('');
    try {
      const body = new FormData();
      body.set('file', file);
      const res = await fetch('/api/media', { method: 'POST', body });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      onChange(result.url, result.id);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : '사진을 올리지 못했습니다.');
    } finally {
      setBusy(false);
      onBusyChange?.(false);
    }
  }
  return (
    <div
      className="adminDrop adminStack"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (!busy && !disabled) void upload(e.dataTransfer.files[0]);
      }}
    >
      {image && <img src={image} alt="선택한 사진" />}
      <label>
        사진 올리기
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          disabled={busy || disabled}
          onChange={(e) => void upload(e.target.files?.[0])}
        />
      </label>
      <small>10MB 이하의 사진을 선택하거나 이곳에 끌어 놓으세요.</small>
      <Button
        type="button"
        disabled={busy || disabled}
        onClick={async () => {
          setItems(await mediaList());
          setOpen(true);
        }}
      >
        기존 사진 선택
      </Button>
      {busy && <p role="status">사진을 처리하고 있습니다…</p>}
      {message && (
        <p className="adminMessage" data-error role="status">
          {message}
        </p>
      )}
      <Dialog open={open} onOpenChange={setOpen} title="사진 보관함">
        <p>사진을 선택하면 편집 중인 항목에 적용됩니다.</p>
        {items.length === 0 && <p>업로드한 사진이 없습니다.</p>}
        <div className="adminMediaGrid">
          {items.map((item) => (
            <div key={item.id}>
              <button
                type="button"
                aria-label="이 사진 선택"
                onClick={() => {
                  onChange(item.url, item.id);
                  setOpen(false);
                }}
              >
                <img src={item.url} alt="보관함 사진" />
              </button>
              <button
                className="adminDelete"
                type="button"
                disabled={disabled}
                onClick={async () => {
                  if (!confirm('사용하지 않는 사진을 삭제할까요?')) return;
                  const result = await deleteMedia(item.id);
                  setMessage(result.message);
                  if (result.ok) setItems(await mediaList());
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        {message && <p role="status">{message}</p>}
      </Dialog>
    </div>
  );
}
