import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile'; // Import the mobile detection hook

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export default function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile(); // Check if the device is mobile

  useEffect(() => {
    const generateParticles = () => {
      // Reduce particle count on mobile for better performance
      const particleCount = isMobile ? 15 : 50;
      const newParticles: Particle[] = [];
      const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981'];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);

    // Only track mouse position on non-mobile devices
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('resize', generateParticles);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return () => {
      window.removeEventListener('resize', generateParticles);
    };
  }, [isMobile]);

  // Don't render anything on very small screens to save resources
  if (isMobile && window.innerWidth < 480) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => {
        const distance = isMobile ? 0 : Math.sqrt(
          Math.pow(mousePosition.x - particle.x, 2) + 
          Math.pow(mousePosition.y - particle.y, 2)
        );
        const influence = isMobile ? 0 : Math.max(0, 150 - distance) / 150;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity + influence * 0.3,
            }}
            animate={isMobile ? { // Simplified animation for mobile
              y: [particle.y, particle.y - 20, particle.y],
              transition: {
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            } : { // Original animation for desktop
              x: particle.x + (mousePosition.x - particle.x) * influence * 0.1,
              y: particle.y + (mousePosition.y - particle.y) * influence * 0.1,
              scale: 1 + influence * 0.5,
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
          />
        );
      })}

      {/* Connection Lines - RENDER ONLY ON DESKTOP */}
      {!isMobile && (
        <svg className="absolute inset-0 w-full h-full">
          {particles.map((particle, i) =>
            particles.slice(i + 1).map((otherParticle, j) => {
              const distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) + 
                Math.pow(particle.y - otherParticle.y, 2)
              );
              
              if (distance < 100) {
                const opacity = (100 - distance) / 100 * 0.2;
                return (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={particle.x}
                    y1={particle.y}
                    x2={otherParticle.x}
                    y2={otherParticle.y}
                    stroke="url(#connectionGradient)"
                    strokeWidth="1"
                    opacity={opacity}
                  />
                );
              }
              return null;
            })
          )}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}
