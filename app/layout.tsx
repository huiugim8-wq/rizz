import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'GLOW UP RIZZ',
    template: '%s | GLOW UP RIZZ',
  },
  description:
    '크리에이터의 매력을 발견하고 성장시켜 콘텐츠, 커머스, 교육, 브랜드로 연결하는 GLOW UP RIZZ입니다.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
