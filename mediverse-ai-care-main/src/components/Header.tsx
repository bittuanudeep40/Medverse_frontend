import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import mediverseLogo from '@/assets/mediverse-logo.png';

interface HeaderProps {
  isServiceView: boolean;
  onGetStarted: () => void;
}

export default function Header({ isServiceView, onGetStarted }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card py-3' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={mediverseLogo} alt="Mediverse" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-gradient-medical">MEDIVERSE</h1>
        </motion.a>

        {!isServiceView ? (
          <Button onClick={onGetStarted} className="btn-glass">
            Get Started
          </Button>
        ) : (
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium">Welcome to the Future of Healthcare</span>
            <div className="w-10 h-10 glass-card rounded-full text-primary flex items-center justify-center font-bold">
              U
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}