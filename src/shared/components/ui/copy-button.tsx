'use client';

import { useState } from 'react';
import styles from './copy-button.module.css';

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={styles.button}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
    >
      <span>▣</span>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
