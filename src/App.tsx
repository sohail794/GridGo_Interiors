import { useState, useEffect, Suspense, lazy } from 'react';
import HeaderNew from './components/HeaderNew';
import MobileMenuOverlay from './components/MobileMenuOverlay';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LeadModal from './components/LeadModal';
import PageLoader from './components/PageLoader';
import { updatePageMeta, pageMeta } from './utils/seo';

// Lazy load pages for code splitting and performance
const HomeNew = lazy(() => import('./pages/HomeNew'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

type Page = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const meta = pageMeta[currentPage];
    if (meta) {
      updatePageMeta(meta.title, meta.description);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#0a0e27] overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-[rgb(0,255,136)] focus:text-[#0a0e27] focus:font-semibold"
      >
        Skip to main content
      </a>

      <HeaderNew
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenModal={() => setModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuChange={setMobileMenuOpen}
      />

      <MobileMenuOverlay
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenModal={() => setModalOpen(true)}
      />

      <main id="main-content" className="pt-20" role="main">
        <Suspense fallback={<PageLoader />}>
          {currentPage === 'home' && (
            <HomeNew onNavigate={handleNavigate} onOpenModal={() => setModalOpen(true)} />
          )}
          {currentPage === 'about' && <About onNavigate={handleNavigate} />}
          {currentPage === 'services' && <Services onNavigate={handleNavigate} />}
          {currentPage === 'portfolio' && <Portfolio onNavigate={handleNavigate} />}
          {currentPage === 'blog' && <Blog onNavigate={handleNavigate} />}
          {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton menuOpen={mobileMenuOpen} />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
