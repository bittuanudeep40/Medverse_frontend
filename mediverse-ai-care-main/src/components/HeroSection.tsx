import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, Activity, Zap } from 'lucide-react';
import videoBg from '@/assets/v1.mp4';
import MagneticButton from './MagneticButton';
import TypewriterText from './TypewriterText';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const typewriterTexts = [
    'Deciphered by AI',
    'Analyzed Instantly',
    'Understood Clearly',
    'Empowered by Tech'
  ];

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      >
        <source src={videoBg} type="video/mp4" />
      </video>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              y: [-20, -100, -20],
              x: [0, 30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeInOut',
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Powered by Advanced AI Technology</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none"
          >
            Your Health,{' '}
            <br className="hidden md:block" />
            <span className="text-gradient-medical">
              <TypewriterText 
                texts={typewriterTexts}
                delay={1500}
                speed={80}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light"
          >
            Beyond the sterile gleam of the hospital corridor and the steady rhythm of the monitor, 
            lies the true heart of medicine: the connection between a doctor and a patient powered by 
            cutting-edge artificial intelligence.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MagneticButton 
              onClick={onGetStarted}
              className="btn-primary text-lg group relative overflow-hidden"
              strength={0.4}
            >
              <span className="relative z-10 flex items-center">
                <Activity className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Begin Your Analysis
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {/* Animated Background Layers */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-glow to-secondary"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: 1, 
                  opacity: 0.2,
                  transition: { duration: 0.4, ease: 'easeOut' }
                }}
              />
              
              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 bg-primary rounded-inherit"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </MagneticButton>
          </motion.div>

          {/* Enhanced Stats */}
          <ScrollReveal delay={0.6} className="pt-12">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <AnimatedCounter value="99.9%" label="Accuracy Rate" delay={0} />
              <AnimatedCounter value="24/7" label="Availability" delay={0.2} />
              <AnimatedCounter value="2s" label="Response Time" delay={0.4} />
            </div>
          </ScrollReveal>

          {/* Floating Action Indicators */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-2 text-muted-foreground"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
                whileHover={{ borderColor: 'hsl(var(--primary))' }}
              >
                <motion.div
                  className="w-1 h-3 bg-primary rounded-full mt-2"
                  animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}