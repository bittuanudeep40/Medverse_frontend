import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeartPredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeartPredictionModal({ isOpen, onClose }: HeartPredictionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="icon-medical-red"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <Heart className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-gradient-primary">
                      Heart Attack Prediction Analysis
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Advanced cardiovascular risk assessment powered by AI
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={onClose}
                  className="btn-glass p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Loading State */}
              <div className="flex-1 p-6 relative">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full mx-auto"
                    />
                    <p className="text-muted-foreground">Loading Heart Prediction Dashboard...</p>
                  </div>
                </motion.div>

                {/* Power BI Embed */}
                <motion.div
                  className="w-full h-[70vh] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <iframe
                    title="Heart Attack Prediction Dashboard"
                    className="w-full h-full border-0"
                    src="https://app.powerbi.com/view?r=eyJrIjoiZjc0NWJiOTktMTIwYS00NGNhLTgzNmEtNDgzNjUzZWU3YTcyIiwidCI6IjQxN2MzYzQxLThiZmItNDY5OS05OTYzLTBiZDFkZjkyZjFmNCJ9"
                    allowFullScreen={true}
                  />
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t border-white/10 bg-black/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Real-time Analytics</span>
                    </div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>Secure & Private</span>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>FDA Compliant</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Powered by Microsoft Power BI
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}