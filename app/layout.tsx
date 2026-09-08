import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GLOW UP RIZZ INC.',
  description: 'WE WILL GLOW YOU UP',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
