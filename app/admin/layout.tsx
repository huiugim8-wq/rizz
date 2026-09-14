import './admin.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'RIZZ · 홈페이지 관리',
  robots: { index: false, follow: false },
};
export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="adminRoot">{children}</div>;
}
