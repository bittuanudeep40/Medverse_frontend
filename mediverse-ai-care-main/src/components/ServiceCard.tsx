import { motion } from 'framer-motion';
import { ExternalLink, LucideIcon, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  colorClass: 'blue' | 'purple' | 'green' | 'red';
  delay?: number;
}

const colorClasses = {
  blue: {
    icon: 'icon-medical-blue',
    text: 'text-medical-blue',
    button: 'btn-medical-blue',
  },
  purple: {
    icon: 'icon-medical-purple', 
    text: 'text-medical-purple',
    button: 'btn-medical-purple',
  },
  green: {
    icon: 'icon-medical-green',
    text: 'text-medical-green', 
    button: 'btn-medical-green',
  },
  red: {
    icon: 'icon-medical-red',
    text: 'text-medical-red',
    button: 'btn-medical-red',
  },
};

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  onClick,
  colorClass,
  delay = 0,
}: ServiceCardProps) {
  const colors = colorClasses[colorClass];
  
  const CardContent = () => (
    <motion.div
      className="service-card group cursor-pointer h-full relative"
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {/* Enhanced Icon with Effects */}
      <motion.div
        className={`${colors.icon} w-fit mx-auto mb-6 relative overflow-hidden`}
        whileHover={{ 
          rotate: [0, -10, 10, 0],
          scale: 1.1,
          transition: { duration: 0.5 }
        }}
      >
        <Icon className="w-12 h-12 relative z-10" />
        
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-current opacity-20 rounded-full blur-md"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1.5, 
            opacity: 0.3,
            transition: { duration: 0.4 }
          }}
        />
        
        {/* Sparkle Effect */}
        <motion.div
          className="absolute top-0 right-0"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ 
            scale: 1, 
            rotate: 180,
            transition: { duration: 0.6, ease: 'easeOut' }
          }}
        >
          <Sparkles className="w-4 h-4 text-current opacity-60" />
        </motion.div>
      </motion.div>

      {/* Enhanced Content */}
      <div className="space-y-4 relative z-10">
        <motion.h3 
          className="text-2xl font-bold text-foreground group-hover:text-gradient-primary transition-all duration-300"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground leading-relaxed text-sm"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>

        {/* Enhanced Action */}
        <motion.div
          className="pt-4"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className={`${colors.text} font-semibold flex items-center justify-center group relative`}
            whileHover={{ scale: 1.05 }}
          >
            Select Service
            <motion.div
              whileHover={{ 
                x: 5,
                rotate: 12,
                transition: { duration: 0.2 }
              }}
            >
              <ExternalLink className="w-4 h-4 ml-2" />
            </motion.div>
          </motion.span>
        </motion.div>
      </div>

      {/* Multi-Layer Glow Effects */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, 
            ${colorClass === 'blue' ? 'rgba(59, 130, 246, 0.1)' : 
              colorClass === 'purple' ? 'rgba(139, 92, 246, 0.1)' : 
              colorClass === 'green' ? 'rgba(16, 185, 129, 0.1)' : 
              'rgba(239, 68, 68, 0.1)'} 0%, 
            transparent 100%)`
        }}
      />
      
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        whileHover={{
          borderColor: colorClass === 'blue' ? 'hsl(var(--primary))' :
                      colorClass === 'purple' ? 'hsl(var(--secondary))' :
                      colorClass === 'green' ? 'hsl(var(--medical-green))' :
                      'hsl(var(--medical-red))',
          boxShadow: `0 0 30px ${
            colorClass === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
            colorClass === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
            colorClass === 'green' ? 'rgba(16, 185, 129, 0.2)' :
            'rgba(239, 68, 68, 0.2)'
          }`,
          transition: { duration: 0.3 }
        }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        <CardContent />
      </a>
    );
  }

  return (
    <div onClick={onClick} className="block h-full">
      <CardContent />
    </div>
  );
}