import { useState, useEffect } from 'react';
import HeaderNew from './components/HeaderNew';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import LeadModal from './components/LeadModal';
import HomeNew from './pages/HomeNew';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { updatePageMeta, pageMeta } from './utils/seo';

type Page = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [modalOpen, setModalOpen] = useState(false);

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
      <HeaderNew
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenModal={() => setModalOpen(true)}
      />

      <main className="pt-20">
        {currentPage === 'home' && (
          <HomeNew onNavigate={handleNavigate} onOpenModal={() => setModalOpen(true)} />
        )}
        {currentPage === 'about' && <About onNavigate={handleNavigate} />}
        {currentPage === 'services' && <Services onNavigate={handleNavigate} />}
        {currentPage === 'portfolio' && <Portfolio onNavigate={handleNavigate} />}
        {currentPage === 'blog' && <Blog onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton />
      <Chatbot />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
