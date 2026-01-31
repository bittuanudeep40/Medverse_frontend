import { motion } from 'framer-motion';
import { FileText, Image, MessageCircle, Heart, Users, Globe, Target, TrendingUp } from 'lucide-react';
import ServiceCard from './ServiceCard';
import ScrollReveal from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

interface ServicesSectionProps {
  onHeartPredictionClick: () => void;
}

const services = [
  {
    title: 'AI Report Analysis',
    description: 'Upload your medical reports to get an easy-to-understand breakdown of the results with AI-powered insights.',
    icon: FileText,
    href: 'https://report-analyser-two.vercel.app/',
    colorClass: 'blue' as const,
  },
  {
    title: 'AI Image Analysis', 
    description: 'Get intelligent insights from your medical images like X-rays, MRIs, and CT scans using advanced computer vision.',
    icon: Image,
    href: 'https://5qx7v5deepo4a4rcnefkdi.streamlit.app/',
    colorClass: 'purple' as const,
  },
  {
    title: 'Medical Chatbot',
    description: 'Ask health-related questions and get instant, reliable information from our AI assistant trained on medical knowledge.',
    icon: MessageCircle,
    href: 'https://image-analysis-new.vercel.app/',
    colorClass: 'green' as const,
  },
  {
    title: 'Heart Attack Prediction',
    description: 'Assess your cardiovascular risk by providing key health metrics to our predictive AI model for personalized insights.',
    icon: Heart,
    href: 'https://cosmic-bi-canvas.lovable.app/',
    colorClass: 'red' as const,
  },
];

export default function ServicesSection({ onHeartPredictionClick }: ServicesSectionProps) {
  return (
    <motion.section
      className="min-h-screen flex flex-col justify-center items-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            <span>AI-Powered Medical Services</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{' '}
            <span className="text-gradient-medical">Healthcare Journey</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Select an advanced AI service below to begin your personalized health analysis. 
            Our platform combines cutting-edge technology with medical expertise for accurate, 
            accessible healthcare insights.
          </p>
        </motion.div>

        {/* Services Grid */}
        <ScrollReveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.25, 0.25, 0.25, 0.75]
                  }
                }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  href={service.href}
                  onClick={service.title === 'Heart Attack Prediction' ? onHeartPredictionClick : undefined}
                  colorClass={service.colorClass}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Enhanced Trust Indicators */}
        <ScrollReveal delay={0.8} className="mt-20">
          <div className="glass-card p-8 rounded-2xl max-w-6xl mx-auto relative overflow-hidden">
            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"
              animate={{
                x: [-100, 100, -100],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-bold text-center mb-8 text-gradient-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Trusted by Healthcare Professionals Worldwide
              </motion.h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Medical Professionals', value: '1000+', icon: Users },
                  { label: 'Analyses Completed', value: '50000+', icon: TrendingUp },
                  { label: 'Countries Served', value: '25+', icon: Globe },
                  { label: 'Accuracy Rate', value: '99.2%', icon: Target },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <motion.div
                      className="mb-4 mx-auto w-fit"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <stat.icon className="w-8 h-8 text-primary mx-auto" />
                    </motion.div>
                    
                    <AnimatedCounter
                      value={stat.value}
                      label={stat.label}
                      delay={0.5 + index * 0.1}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </motion.section>
  );
}
