import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export default function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Extract numeric value from string
  const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
  const suffix = value.replace(/[\d.]/g, '');
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(numericValue);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, numericValue, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      if (ref.current) {
        const display = numericValue < 10 
          ? latest.toFixed(1) 
          : Math.round(latest);
        ref.current.textContent = `${display}${suffix}`;
      }
    });

    return unsubscribe;
  }, [springValue, suffix, numericValue]);

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 rounded-xl text-center group"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.6, delay: delay * 0.2, ease: 'easeOut' }
      } : {}}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="text-3xl font-bold text-gradient-primary mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: delay * 0.3 }}
      >
        0{suffix}
      </motion.div>
      
      <motion.div
        className="text-sm text-muted-foreground font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay * 0.4 }}
      >
        {label}
      </motion.div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-primary/20"
        initial={{ scale: 1, opacity: 0 }}
        whileHover={{ 
          scale: 1.02, 
          opacity: 1,
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
          transition: { duration: 0.3 }
        }}
      />
    </motion.div>
  );
}