import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import mediverseLogo from '@/assets/mediverse-logo.png';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center space-y-8">
            {/* Logo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.img
                src={mediverseLogo}
                alt="Mediverse"
                className="w-32 h-32 mx-auto"
                animate={{
                  scale: [1, 1.1, 1],
                  filter: [
                    'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                    'drop-shadow(0 0 40px rgba(139, 92, 246, 0.8))',
                    'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-gradient-medical mb-2">
                MEDIVERSE
              </h1>
              <p className="text-muted-foreground text-lg">
                Initializing AI Healthcare Platform
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="w-80 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="glass-card p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Loading</span>
                  <span className="text-sm font-mono">{progress}%</span>
                </div>
                
                <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Loading Messages */}
            <motion.div
              className="space-y-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {progress < 30 && <div>Initializing AI Models...</div>}
              {progress >= 30 && progress < 60 && <div>Loading Medical Databases...</div>}
              {progress >= 60 && progress < 90 && <div>Calibrating Diagnostic Systems...</div>}
              {progress >= 90 && <div>Ready for Healthcare Analysis!</div>}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}