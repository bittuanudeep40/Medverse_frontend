import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import HeartPredictionModal from '@/components/HeartPredictionModal';
import LoadingScreen from '@/components/LoadingScreen';
import ParticleField from '@/components/ParticleField';

const Index = () => {
  const [showServices, setShowServices] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const handleGetStarted = () => {
    setShowServices(true);
  };

  const handleHeartPredictionClick = () => {
    setShowModal(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      <LoadingScreen
        isVisible={showLoading}
        onComplete={handleLoadingComplete}
      />
      <div className="min-h-screen bg-background overflow-x-hidden relative">
        {/* ParticleField is now rendered only when loading is NOT shown */}
        {!showLoading && <ParticleField />}
        
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Header
            isServiceView={showServices}
            onGetStarted={handleGetStarted}
          />

          <main className="relative">
            <AnimatePresence mode="wait">
              {!showServices ? (
                <motion.div
                  key="hero"
                  initial={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    y: -50,
                    transition: { duration: 0.6, ease: 'easeInOut' }
                  }}
                >
                  <HeroSection onGetStarted={handleGetStarted} />
                </motion.div>
              ) : (
                <motion.div
                  key="services"
                  initial={{
                    opacity: 0,
                    y: 50
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: 'easeOut' }
                  }}
                >
                  <ServicesSection onHeartPredictionClick={handleHeartPredictionClick} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <HeartPredictionModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Index;
