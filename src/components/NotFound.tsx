import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import Button from './ui/Button';

interface NotFoundProps {
  onNavigate: (page: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-gold/10 mb-6">
            <AlertTriangle className="w-12 h-12 text-brand-gold" />
          </div>
          <h1 className="text-8xl font-bold text-brand-gold mb-2">404</h1>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-text-secondary text-lg mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => onNavigate('home')}
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => onNavigate('contact')}
          >
            Contact Support
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-text-tertiary text-sm mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('services')}
              className="text-text-secondary hover:text-brand-gold transition-colors"
            >
              Our Services
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-text-secondary hover:text-brand-gold transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="text-text-secondary hover:text-brand-gold transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="text-text-secondary hover:text-brand-gold transition-colors"
            >
              Blog
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
