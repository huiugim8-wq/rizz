import '../globals.css';
import { SlideNavigationProvider } from '@/shared/components/navigation/slide-navigation';
import { PortfolioNotice } from '@/shared/components/portfolio-notice';
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SlideNavigationProvider>
      <PortfolioNotice />
      {children}
    </SlideNavigationProvider>
  );
}
