'use client';
import { useEffect } from 'react';
export function useUnsavedChanges(dirty: boolean) {
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    const leave = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.('a[href]');
      if (
        dirty &&
        link &&
        !link.hasAttribute('target') &&
        !confirm('저장하지 않은 변경을 버리고 이동할까요?')
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener('beforeunload', warn);
    document.addEventListener('click', leave, true);
    return () => {
      window.removeEventListener('beforeunload', warn);
      document.removeEventListener('click', leave, true);
    };
  }, [dirty]);
}
