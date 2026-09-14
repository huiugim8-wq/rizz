'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from 'react';

const SlideNavigation = createContext<((href: string) => void) | null>(null);

export function SlideNavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<{ href: string; resolve: () => void } | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    if (pending.current?.href === pathname) {
      pending.current.resolve();
      pending.current = null;
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return;
      if (
        !document.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        router.push(href);
        return;
      }
      busy.current = true;
      document.documentElement.dataset.slideNavigation = 'forward';
      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            const timeout = window.setTimeout(resolve, 4000);
            pending.current = {
              href,
              resolve: () => {
                window.clearTimeout(timeout);
                resolve();
              },
            };
            router.push(href);
          }),
      );
      void transition.finished
        .catch(() => {})
        .finally(() => {
          delete document.documentElement.dataset.slideNavigation;
          pending.current = null;
          busy.current = false;
        });
    },
    [router],
  );

  return <SlideNavigation.Provider value={navigate}>{children}</SlideNavigation.Provider>;
}

export function SlideLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { href: string }) {
  const navigate = useContext(SlideNavigation);
  const router = useRouter();
  const click = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === '_blank'
    )
      return;
    event.preventDefault();
    if (navigate) navigate(href);
    else router.push(href);
  };
  return <Link {...props} href={href} onClick={click} />;
}
